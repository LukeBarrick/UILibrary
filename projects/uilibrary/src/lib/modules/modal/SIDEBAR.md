# SidebarModal — Router-Driven Drawer System

A drawer (side-panel) system built on top of Angular's named router outlets and `UiModalService`'s CDK overlay. The sidebar is fully URL-addressable, supports deep-linking, and keeps the router and the visual drawer state bidirectionally in sync.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
  - [1. Import SidebarModalModule](#1-import-sidebarmodalmodule)
  - [2. Declare sidebar routes](#2-declare-sidebar-routes)
  - [3. Update the shell template](#3-update-the-shell-template)
- [Opening a sidebar](#opening-a-sidebar)
- [Closing a sidebar](#closing-a-sidebar)
  - [From inside the content component](#from-inside-the-content-component)
  - [Programmatically from a parent component](#programmatically-from-a-parent-component)
- [Creating a sidebar content component](#creating-a-sidebar-content-component)
- [Deep-linking](#deep-linking)
- [Route guards](#route-guards)
  - [CanActivate — protecting a sidebar route](#canactivate--protecting-a-sidebar-route)
  - [CanDeactivate — preventing unsaved-changes close](#candeactivate--preventing-unsaved-changes-close)
  - [Resolve — pre-fetching data before the drawer opens](#resolve--pre-fetching-data-before-the-drawer-opens)
  - [CanActivateChild — guarding all sidebars in a shell](#canactivatechild--guarding-all-sidebars-in-a-shell)
  - [Guard interaction with SidebarModalOutletComponent](#guard-interaction-with-sidebarmodaloutletcomponent)
- [API reference](#api-reference)
  - [SidebarModalService](#sidebarmodalservice)
  - [SidebarModalOutletComponent](#sidebarmodaloutletcomponent)
  - [SidebarModalModule](#sidebarmodalmodule)
- [Styling](#styling)
- [Architecture notes](#architecture-notes)
- [Troubleshooting](#troubleshooting)

---

## How it works

```
User calls SidebarModalService.open('sidebar-profile', this.route.parent)
  │
  ▼
Router navigates → URL becomes /your-shell/(primary//sidebar:sidebar-profile)
  │
  ▼
NavigationEnd fires
  │
  ▼
SidebarModalOutletComponent._syncWithRouter()
  walks the router snapshot tree, finds the 'sidebar' outlet snapshot
  │
  ▼
UiModalService.open(SidebarProfileComponent, { windowClass: 'ui-sidebar', ... })
  renders the component in a CDK overlay with a right-side slide-in animation
```

When the drawer is closed (backdrop click, Escape key, or `SidebarModalService.close()`):

```
Drawer dismissed
  │
  ▼
UiModalRef.hidden fires
  │
  ▼
SidebarModalOutletComponent._clearSidebarRoute()
  navigates to clear the sidebar outlet → URL returns to /your-shell/primary
```

The `<router-outlet name="sidebar">` exists solely so Angular's router can own the URL state, guard navigation, and support lazy-loading. The component it activates is rendered inside a hidden wrapper — the **only** visual output is the CDK overlay drawer.

---

## Setup

### 1. Import SidebarModalModule

Import `SidebarModalModule` into the feature shell module that owns the layout component containing the sidebar outlet.

```typescript
import { SidebarModalModule } from 'uilibrary';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SidebarModalModule,
    // ...
  ],
})
export class MyShellModule {}
```

`SidebarModalModule` provides `SidebarModalService` at the module level and exports `SidebarModalOutletComponent` (`<ui-sidebar-modal-outlet>`).

---

### 2. Declare sidebar routes

Add sidebar routes as children of the route whose component will contain the `<router-outlet name="sidebar">`. The `outlet: 'sidebar'` property tells the router to activate these components in the named outlet instead of the primary one.

```typescript
const routes: Routes = [
  {
    path: '',
    component: MyShellLayoutComponent,
    children: [
      { path: 'home',            component: HomeComponent },
      { path: 'settings',        component: SettingsComponent },

      // Sidebar routes — same children array, different outlet
      { path: 'user-profile',    outlet: 'sidebar', component: UserProfileSidebarComponent },
      { path: 'notifications',   outlet: 'sidebar', component: NotificationsSidebarComponent },
    ],
  },
];
```

The resulting URLs follow Angular's auxiliary outlet syntax:
- `/app/(home//sidebar:user-profile)`
- `/app/(settings//sidebar:notifications)`

---

### 3. Update the shell template

Place `<ui-sidebar-modal-outlet>` anywhere inside the shell layout component's template. Add the named router outlet inside a **hidden wrapper** — it must exist for the router lifecycle but must not render content visually.

```html
<!-- my-shell-layout.component.html -->

<router-outlet></router-outlet>

<!--
  Hidden wrapper: Angular inserts the activated sidebar component as a sibling
  of <router-outlet> in the DOM, so only hiding the parent suppresses it.
  The visible drawer is rendered by UiModalService's CDK overlay instead.
-->
<div style="display: none" aria-hidden="true">
  <router-outlet name="sidebar"></router-outlet>
</div>

<ui-sidebar-modal-outlet></ui-sidebar-modal-outlet>
```

> **Why the wrapper?**  
> `<router-outlet>` is a marker element. Angular inserts the activated component as a *sibling* of the outlet element (within the same parent). `style="display:none"` on the outlet element itself does **not** hide the rendered component — only hiding the shared parent does.

---

## Opening a sidebar

Inject `SidebarModalService` and `ActivatedRoute` into any component that needs to open a sidebar. Pass `this.route.parent` as the second argument to ensure the router navigates at the correct level of the route tree.

```typescript
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarModalService } from 'uilibrary';

@Component({ ... })
export class MyComponent {
  constructor(
    private readonly sidebarModal: SidebarModalService,
    private readonly route: ActivatedRoute,
  ) {}

  openUserProfile(): void {
    // this.route.parent = the layout component's route, which owns the sidebar outlet
    this.sidebarModal.open('user-profile', this.route.parent!);
  }

  openNotifications(): void {
    this.sidebarModal.open('notifications', this.route.parent!);
  }
}
```

> **Why `this.route.parent`?**  
> `SidebarModalService.open()` calls `router.navigate()` with `relativeTo` to resolve the sidebar outlet at the correct level. Without this, Angular searches from the URL root and throws `NG04002: Cannot match any routes`. `this.route` is the current child route (e.g. `/home`), and `this.route.parent` is the layout component's route — the level where the `<router-outlet name="sidebar">` lives.

---

## Closing a sidebar

### From inside the content component

Inject `SidebarModalService` into the sidebar content component and call `close()`. No `relativeTo` argument is needed — the service caches the route context from the `open()` call (or from `SidebarModalOutletComponent.ngOnInit()` for deep-links).

```typescript
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { SidebarModalService } from 'uilibrary';

@Component({
  template: `
    <div class="ui-modal-header">
      <h5 class="ui-modal-title">User Profile</h5>
    </div>
    <div class="ui-modal-body">
      <!-- content -->
    </div>
    <div class="ui-modal-footer">
      <button (click)="sidebarModal.close()">Close</button>
    </div>
  `,
  standalone: false,
})
export class UserProfileSidebarComponent {
  // Use inject() to avoid DI metadata issues in library compilation
  readonly sidebarModal: SidebarModalService = inject(SidebarModalService);
}
```

> **Use `inject()` not constructor injection** in sidebar content components when building as a library. Angular's partial compilation mode may not emit the required `emitDecoratorMetadata` for constructor parameters, causing a "No suitable injection token" error at runtime.

### Programmatically from a parent component

```typescript
closeSidebar(): void {
  this.sidebarModal.close();
}
```

The backdrop click and Escape key also close the drawer automatically — these are handled by `UiModalService` and synchronized back to the URL by `SidebarModalOutletComponent`.

---

## Creating a sidebar content component

A sidebar content component is a standard Angular component. Structure it with `.ui-modal-header`, `.ui-modal-body`, and `.ui-modal-footer` to integrate with the existing modal shell styles.

```typescript
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { SidebarModalService } from 'uilibrary';

@Component({
  selector: 'my-user-profile-sidebar',
  template: `
    <div class="ui-modal-header">
      <h5 class="ui-modal-title">User Profile</h5>
    </div>
    <div class="ui-modal-body">
      <p><strong>Name:</strong> Jane Smith</p>
      <p><strong>Email:</strong> jane@example.com</p>
    </div>
    <div class="ui-modal-footer">
      <button class="btn btn-secondary" (click)="sidebarModal.close()">Close</button>
    </div>
  `,
  standalone: false,
})
export class UserProfileSidebarComponent {
  readonly sidebarModal: SidebarModalService = inject(SidebarModalService);
}
```

Declare it in the same `NgModule` that declares the sidebar routes — or in an imported module — so Angular can instantiate it as a route component.

---

## Deep-linking

The sidebar URL is fully addressable. Pasting `/app/(home//sidebar:user-profile)` into the browser will:

1. Angular router activates `UserProfileSidebarComponent` in the `sidebar` outlet.
2. `MyShellLayoutComponent` is rendered, placing `<ui-sidebar-modal-outlet>` in the DOM.
3. `SidebarModalOutletComponent.ngOnInit()` calls `registerRoute()` and then `_syncWithRouter()` immediately, finding the active sidebar snapshot and opening the drawer.

No extra configuration is needed for deep-link support.

---

## Route guards

Because sidebar routes are standard Angular router routes, every guard type works exactly as it does with primary outlet routes. Guards are evaluated before `NavigationEnd` fires, so `SidebarModalOutletComponent` only ever opens the drawer after a guard has allowed the navigation.

---

### CanActivate — protecting a sidebar route

Use `canActivate` to block access to a sidebar (e.g. require authentication or a specific role).

```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }
  // Redirect to login and cancel the sidebar navigation
  return router.createUrlTree(['/login']);
};
```

```typescript
// routes
{ path: 'admin-panel', outlet: 'sidebar', component: AdminPanelSidebarComponent, canActivate: [authGuard] },
```

If the guard returns `false` or a `UrlTree`, Angular cancels the navigation. `SidebarModalOutletComponent` receives no `NavigationEnd` and the drawer never opens. The URL stays unchanged.

---

### CanDeactivate — preventing unsaved-changes close

`canDeactivate` fires when the sidebar outlet is about to be cleared (i.e. when the drawer is about to close). Use it to show a confirmation dialog if the user has unsaved changes.

**1. Add an interface to the content component:**

```typescript
// has-unsaved-changes.ts
export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}
```

**2. Implement it in the sidebar content component:**

```typescript
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { SidebarModalService } from 'uilibrary';
import { HasUnsavedChanges } from './has-unsaved-changes';

@Component({ ... , standalone: false })
export class EditProfileSidebarComponent implements HasUnsavedChanges {
  readonly sidebarModal: SidebarModalService = inject(SidebarModalService);
  isDirty = false;

  hasUnsavedChanges(): boolean {
    return this.isDirty;
  }
}
```

**3. Write the guard:**

```typescript
// unsaved-changes.guard.ts
import { CanDeactivateFn } from '@angular/router';
import { HasUnsavedChanges } from './has-unsaved-changes';

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }
  return window.confirm('You have unsaved changes. Close the panel anyway?');
};
```

**4. Register it on the route:**

```typescript
{
  path: 'edit-profile',
  outlet: 'sidebar',
  component: EditProfileSidebarComponent,
  canDeactivate: [unsavedChangesGuard],
}
```

> **Backdrop and Escape key interaction**  
> When the user closes the drawer via backdrop click or Escape, `UiModalService` dismisses the CDK overlay first, then `SidebarModalOutletComponent._clearSidebarRoute()` navigates to clear the URL. The `canDeactivate` guard fires during that navigation. If the guard returns `false`, Angular cancels the navigation — **but the CDK overlay is already closed at this point**.  
>
> To avoid this mismatch, disable `backdrop` and `keyboard` closing on routes where you have a `canDeactivate` guard, and rely solely on the content component's close button (which can check unsaved state before calling `sidebarModal.close()`):
>
> ```typescript
> // Override sidebarOptions in a custom outlet or use a wrapper approach —
> // the simplest pattern is to guard close inside the component itself:
> close(): void {
>   if (this.isDirty && !confirm('Discard changes?')) return;
>   this.sidebarModal.close();
> }
> ```

---

### Resolve — pre-fetching data before the drawer opens

`resolve` runs before `NavigationEnd`, so resolved data is available in the content component's `ActivatedRoute.snapshot.data` by the time the drawer opens.

**1. Write the resolver:**

```typescript
// user-profile.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from './user.service';
import { UserProfile } from './user-profile.model';

export const userProfileResolver: ResolveFn<UserProfile> = (route) => {
  const userId = route.paramMap.get('id') ?? '';
  return inject(UserService).getProfile(userId);
};
```

**2. Register it on the route (with a route parameter):**

```typescript
{
  path: 'user/:id',
  outlet: 'sidebar',
  component: UserProfileSidebarComponent,
  resolve: { profile: userProfileResolver },
}
```

**3. Open with a route parameter:**

```typescript
// Pass multiple segments to navigate to a parameterised route:
this.sidebarModal.open(['user', userId], this.route.parent!);
// URL: /app/(home//sidebar:user/42)
```

**4. Read resolved data inside the content component:**

```typescript
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { SidebarModalService } from 'uilibrary';
import { UserProfile } from './user-profile.model';

@Component({ ... , standalone: false })
export class UserProfileSidebarComponent {
  readonly sidebarModal: SidebarModalService = inject(SidebarModalService);

  // The ActivatedRoute here refers to the sidebar route, NOT the primary outlet.
  // Use inject() to reliably get the correct instance in library compilation.
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  readonly profile: UserProfile = this.route.snapshot.data['profile'];
}
```

> **Note on `ActivatedRoute` inside a CDK overlay**  
> `SidebarModalOutletComponent` opens the content component via `UiModalService`, which creates a child injector. The `ActivatedRoute` provided to that child injector is the **sidebar route's** `ActivatedRoute` — giving access to `data`, `params`, and `paramMap` from the resolver and the route definition.

---

### CanActivateChild — guarding all sidebars in a shell

Apply `canActivateChild` to the shell layout route to protect every sidebar (and primary child) route without repeating the guard on each one.

```typescript
const routes: Routes = [
  {
    path: '',
    component: MyShellLayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: 'home',         component: HomeComponent },
      { path: 'user-profile', outlet: 'sidebar', component: UserProfileSidebarComponent },
      { path: 'admin-panel',  outlet: 'sidebar', component: AdminPanelSidebarComponent },
    ],
  },
];
```

Both primary and sidebar routes will be protected. For finer control (e.g. allow primary routes but guard only sidebars) use `canActivate` on individual sidebar routes instead.

---

### Guard interaction with SidebarModalOutletComponent

| Scenario | Guard result | What happens |
|----------|-------------|--------------|
| `canActivate` returns `true` | Allowed | `NavigationEnd` fires → drawer opens |
| `canActivate` returns `false` / `UrlTree` | Blocked | Navigation cancelled, drawer stays closed |
| `canDeactivate` returns `true` | Allowed | URL cleared → `_syncWithRouter()` dismisses drawer |
| `canDeactivate` returns `false` | Blocked | URL stays as-is → `_syncWithRouter()` sees outlet still active, does nothing |
| `resolve` completes | Data available | `NavigationEnd` fires → drawer opens with resolved data in `ActivatedRoute.snapshot.data` |
| `resolve` throws / returns `EMPTY` | Navigation cancelled | Drawer never opens |

---

## API reference

### SidebarModalService

Provided by `SidebarModalModule` at the importing module's scope.

| Method | Signature | Description |
|--------|-----------|-------------|
| `open` | `open(path: string \| string[], relativeTo?: ActivatedRoute): void` | Activates the `sidebar` named outlet at the given route path(s). Pass `this.route.parent` as `relativeTo` from any child component of the shell layout. |
| `close` | `close(): void` | Clears the `sidebar` outlet, causing the drawer to dismiss. Uses the cached route context from the last `open()` or `registerRoute()` call. |
| `registerRoute` | `registerRoute(route: ActivatedRoute): void` | Called automatically by `SidebarModalOutletComponent` on init. Ensures `close()` works correctly for deep-linked URLs where `open()` was never called. |

---

### SidebarModalOutletComponent

Selector: `<ui-sidebar-modal-outlet>`

A headless (empty template) component. Place it in the shell layout's template alongside the hidden `<router-outlet name="sidebar">`. It:

- Subscribes to `NavigationEnd` events and walks the router snapshot to find an active `sidebar` outlet.
- Opens a `UiModalService` CDK overlay with `windowClass: 'ui-sidebar'` when the outlet becomes active.
- Dismisses the overlay when the outlet is cleared by navigation.
- Calls `_clearSidebarRoute()` when the overlay is closed by the user (backdrop / Escape), keeping the URL in sync.
- Calls `SidebarModalService.registerRoute()` on init, providing the correct route context for deep-link close support.

No inputs or outputs.

---

### SidebarModalModule

| Declares | `SidebarModalOutletComponent` |
|----------|-------------------------------|
| Provides | `SidebarModalService` |
| Exports  | `SidebarModalOutletComponent` |
| Imports  | `CommonModule`, `RouterModule`, `UiModalModule` |

---

## Styling

The drawer appearance is controlled by the `.ui-sidebar` CSS class applied to the modal host via `windowClass: 'ui-sidebar'` in `_sidebarOptions`.

Key layout behaviour applied by `.ui-sidebar`:

| Property | Value | Effect |
|----------|-------|--------|
| `position` | `fixed` | Anchors to the viewport |
| `top / right / bottom` | `0` | Full-height, flush right |
| `width` | `420px` (max `90vw`) | Fixed drawer width, responsive cap |
| `transform` | `translateX(100%)` → `translateX(0)` | Slide-in from right animation |
| `transition` | `0.3s ease-out` | Smooth open/close |
| `border-left` | `1px solid #dee2e6` | Subtle separation from page content |
| `box-shadow` | `-0.25rem 0 1.5rem rgba(0,0,0,0.12)` | Depth against the backdrop |

To customise the drawer width or appearance, override `.ui-sidebar .ui-modal-dialog` in your application's global styles.

---

## Architecture notes

### Why both a hidden `<router-outlet>` and `<ui-sidebar-modal-outlet>` are required

These two elements serve completely different purposes and neither can replace the other.

---

#### The hidden `<router-outlet name="sidebar">` — router bookkeeping

Angular's router has a hard requirement: **a named outlet can only be activated if a `RouterOutlet` directive with that name is registered in the current component tree**. Without the `<router-outlet name="sidebar">` element in the shell template, any navigation targeting `outlet: 'sidebar'` will throw a `NG04002` error or silently cancel.

Specifically, the outlet registration is what enables:

- **Route matching** — the router checks which named outlets are currently available before committing to a navigation. If `sidebar` is not registered, the route simply cannot activate.
- **Guard evaluation** — `canActivate`, `canDeactivate`, and `resolve` all run as part of the router's navigation pipeline, which requires the outlet to exist.
- **URL serialisation** — the router tracks which outlets are active to correctly write `(primary//sidebar:path)` into the URL and to deserialise them on deep-link load.
- **Lazy-loading** — if a sidebar route has `loadChildren`, the router triggers the chunk download through the outlet registration.
- **Component instantiation** — the router creates the sidebar component via the outlet's `ViewContainerRef`. This is what `SidebarModalOutletComponent` then reads from `router.routerState.snapshot` to know *which* component to open in the overlay.

In short: the hidden outlet exists so that Angular's router machinery can function. It is the source of truth for routing state. Without it, the system has no URL, no guards, and no way to know which component to show.

---

#### Why the outlet must be hidden — and why `display: none` alone on the element is not enough

When the router activates a named outlet, it creates an instance of the target component and inserts its host element into the DOM **as a sibling of `<router-outlet>`** — not as a child of it. The `<router-outlet>` element itself is just a marker; the rendered component appears immediately after it in the same parent container.

This means:

```html
<!-- What you write -->
<router-outlet name="sidebar" style="display: none"></router-outlet>

<!-- What Angular renders in the DOM -->
<router-outlet name="sidebar" style="display: none"></router-outlet>
<ui-sidebar-demo-profile>       ← component inserted here, visible!
  ...
</ui-sidebar-demo-profile>
```

The `style="display:none"` only hides the `<router-outlet>` element itself (a zero-size marker). The activated component is a separate element and is fully visible.

Wrapping both in a parent fixes this:

```html
<div style="display: none" aria-hidden="true">
  <router-outlet name="sidebar"></router-outlet>
  <!-- activated component also ends up inside this div → hidden -->
</div>
```

Now the component is a sibling of `<router-outlet>` but *both* are inside the hidden `<div>`, so neither is visible. `aria-hidden="true"` also removes the hidden content from the accessibility tree.

---

#### `<ui-sidebar-modal-outlet>` — the visual rendering bridge

With the outlet hidden, we have router state (URL, guards, data) but no visible UI. `SidebarModalOutletComponent` is the bridge that converts that router state into a visible CDK overlay drawer.

It works by:

1. **Listening for `NavigationEnd`** — after every successful navigation, it walks `router.routerState.snapshot.root` looking for an active child snapshot whose `outlet === 'sidebar'`.
2. **Opening the CDK overlay** — when a sidebar snapshot is found and no drawer is currently open, it calls `UiModalService.open(component, { windowClass: 'ui-sidebar', ... })`. The component class comes from the snapshot, so the same component that the router instantiated in the hidden outlet is also opened in the overlay. The CDK overlay renders to `document.body` — completely outside the hidden wrapper — so it is always visible and correctly stacked.
3. **Closing from the URL** — when a `NavigationEnd` fires with no active sidebar snapshot (the outlet was cleared), it dismisses the open overlay.
4. **Closing to the URL** — when the overlay is dismissed by the user (backdrop click, Escape key), it calls `router.navigate([{ outlets: { sidebar: null } }])` to clear the URL, keeping router and visual state in sync.

**Why can't the router outlet itself be the visible drawer?**  
The router renders the component as a regular DOM element. It has no backdrop, no focus trap, no keyboard handling, no `z-index` stacking, and no slide-in animation. The CDK overlay (`OverlayModule`) provides all of these, but it renders at the document root — outside the component tree — which means it cannot itself be an Angular router outlet.

**Why a component and not a service or directive?**  
`SidebarModalOutletComponent` is created inside `MyShellLayoutComponent`'s template. Angular's dependency injection therefore resolves its `ActivatedRoute` injection to `MyShellLayoutComponent`'s own route — precisely the route level that owns the `sidebar` outlet. This is how the component can call `router.navigate([{ outlets: { sidebar: null } }], { relativeTo: this._activatedRoute })` correctly, without any caller needing to supply the route context. A service has no injection-context-derived `ActivatedRoute`; a directive would need the same template placement anyway.

---

#### Summary diagram

```
┌─ Shell layout template ──────────────────────────────────────────┐
│                                                                  │
│  <router-outlet>          ← primary outlet (page content)        │
│                                                                  │
│  <div style="display:none" aria-hidden="true">                   │
│    <router-outlet name="sidebar">  ← registers the outlet        │
│    <SidebarComponent>              ← instantiated by router,     │
│  </div>                              hidden from view            │
│                                                                  │
│  <ui-sidebar-modal-outlet>  ← watches NavigationEnd,            │
│                               opens CDK overlay drawer           │
└──────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
                            ┌─ CDK Overlay (document.body) ──────┐
                            │  <SidebarComponent>  (visible)     │
                            │  backdrop / focus-trap / animation  │
                            └────────────────────────────────────┘
```

The hidden outlet gives Angular's router what it needs to own URL state, run guards, and resolve data. The CDK overlay gives users what they need to see and interact with the drawer.

---

### Why named router outlets instead of a pure CDK overlay?

Router integration gives the sidebar URL addressability, browser back/forward navigation, route guards, and lazy-loading for free. A service-only drawer would need to reimplement all of that from scratch.

### Why `inject()` in content components?

Angular's library build (partial Ivy compilation) does not always emit `emitDecoratorMetadata`, so constructor parameter types cannot always be used as injection tokens. `inject()` with an explicit type annotation is reliable across all compilation modes.

---

## Troubleshooting

### `NG04002: Cannot match any routes. URL Segment: 'sidebar-profile'`

You navigated without a `relativeTo` context. The router is looking for the `sidebar` outlet at the root level instead of inside the shell layout.

**Fix:** pass `this.route.parent` as the second argument to `open()`.

```typescript
this.sidebarModal.open('sidebar-profile', this.route.parent!);
```

---

### Sidebar content is visible in the page behind the drawer

The `<router-outlet name="sidebar">` is not wrapped in a hidden container. Angular inserts the activated component as a *sibling* element in the DOM, so `style="display:none"` on the outlet itself is not enough.

**Fix:** wrap the outlet in a parent element with `display: none`.

```html
<div style="display: none" aria-hidden="true">
  <router-outlet name="sidebar"></router-outlet>
</div>
```

---

### Drawer does not open when navigating directly via URL

`SidebarModalOutletComponent` was not present in the template, or the module was not imported. Verify that `SidebarModalModule` is imported in the shell feature module and `<ui-sidebar-modal-outlet>` is in the shell layout template.

---

### Drawer opens but cannot be closed when navigating directly via URL

`SidebarModalService.close()` had no cached `relativeTo` route because `open()` was never called. This is handled automatically by `SidebarModalOutletComponent.ngOnInit()` calling `registerRoute()`. Ensure `<ui-sidebar-modal-outlet>` is present in the template.

---

### Two drawers open at the same time

`SidebarModalOutletComponent._syncWithRouter()` guards against this (`if (sidebarSnap && !this._ref)`), so a second drawer will only open if `_ref` was already cleared. This can happen if `<ui-sidebar-modal-outlet>` is placed in the template more than once. Ensure only one instance exists per shell layout.
