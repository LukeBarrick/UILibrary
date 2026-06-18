# Context Menu

A right-click context menu for the UI Library. Inspired by the Angular Material `mat-menu` API — places a fixed, pointer-positioned dropdown at the cursor using a trigger directive and projected `<button>` items.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — right-click menu](#basic-usage--right-click-menu)
- [Basic usage — sub-menus](#basic-usage--sub-menus)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [SCSS utility classes](#scss-utility-classes)
- [Technical decisions](#technical-decisions)

---

## How it works

```
User right-clicks trigger area
  │
  ▼  (contextmenu event — consumer must call event.preventDefault())
Component calls menuTrigger.openMenu(event)
  │  MenuTriggerDirective reads clientX/Y from MouseEvent
  ▼
ContextMenuComponent.openMenu() records menuPosition and sets menuVisible = true
  │
  ▼
<ul class="context-menu"> renders at fixed viewport coordinates
  │
  ├─ User clicks any item inside     → ContextMenuComponent.hideMenu()
  ├─ User clicks elsewhere on page   → @HostListener('document:click') → hideMenu()
  └─ User presses Escape             → @HostListener('document:keydown.escape') → hideMenu()
```

The trigger element and the menu component are linked by the `[menuTriggerFor]` attribute directive. The consumer retrieves the directive via `@ViewChild(MenuTrigger)` and calls `openMenu()` inside their `contextmenu` event handler.

---

## Setup

`ContextMenuModule` is included in `UserInterfaceLibraryModule`. If you import the full library nothing extra is required. To use the module on its own:

```typescript
import { ContextMenuModule } from 'uilibrary';

@NgModule({
  imports: [ContextMenuModule],
})
export class MyModule {}
```

---

## Basic usage — right-click menu

### 1. Add the trigger and menu to your template

Attach `[menuTriggerFor]` and a `(contextmenu)` handler to the area that should respond to right-clicks. Declare the menu component with a template reference variable and project plain `<button>` elements as items.

```html
<div
  [menuTriggerFor]="myMenu"
  (contextmenu)="onRightClick($event)"
  style="padding: 24px; border: 2px dashed #ccc; cursor: context-menu;">
  Right-click anywhere in this area
</div>

<uilibrary-context-menu #myMenu>
  <button>Edit</button>
  <button>Duplicate</button>
  <button [disabled]="true">Delete (unavailable)</button>
</uilibrary-context-menu>
```

### 2. Open the menu from your component class

```typescript
import { Component, ViewChild } from '@angular/core';
import { MenuTrigger } from 'uilibrary';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  @ViewChild(MenuTrigger, { static: true }) menuTrigger!: MenuTrigger;

  onRightClick(event: MouseEvent): void {
    event.preventDefault(); // suppress the browser's native context menu
    this.menuTrigger.openMenu(event);
  }
}
```

> **Note:** You must call `event.preventDefault()` in your handler. Without it the browser's native context menu appears on top of the custom menu.

---

## Basic usage — sub-menus

`uilibrary-context-side-menu` adds a flyout panel that opens on hover or keyboard `:focus-within`. Nest it inside `uilibrary-context-menu` alongside regular `<button>` items.

Use the `context-menu-label` attribute to project the visible button text, and place sub-items in the default slot using `<div>` elements:

```html
<uilibrary-context-menu #myMenu>
  <button>Edit</button>

  <uilibrary-context-side-menu>
    <span context-menu-label>More actions</span>
    <div>Archive</div>
    <div>Export</div>
    <div>Share</div>
  </uilibrary-context-side-menu>

  <uilibrary-context-side-menu [disabled]="true">
    <span context-menu-label>Admin only</span>
    <div>Delete all</div>
  </uilibrary-context-side-menu>
</uilibrary-context-menu>
```

> **Note:** Sub-menus open to the inline-end (right in LTR, left in RTL) side of the parent button. Only one level of sub-menu nesting is supported.

---

## Options reference

### `ContextMenuComponent`

`ContextMenuComponent` has no `@Input` properties. Menu items and sub-menus are provided entirely via `<ng-content>`.

### `MenuTriggerDirective`

| Option | Type | Default | Description |
|---|---|---|---|
| `menuTriggerFor` | `ContextMenuComponent \| null` | `null` | Template reference to the `uilibrary-context-menu` instance this trigger controls |

### `ContextSideMenuComponent`

| Option | Type | Default | Description |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Disables the sub-menu button and prevents the flyout from opening |

---

## API reference

### `ContextMenuModule`

Declares and exports `ContextMenuComponent`, `ContextSideMenuComponent`, and `MenuTriggerDirective`.

---

### `ContextMenuComponent`

Selector: `uilibrary-context-menu`

| Member | Signature / Type | Description |
|---|---|---|
| `menuVisible` | `boolean` | Current visibility state of the menu |
| `menuPosition` | `{ x: number; y: number }` | Viewport coordinates (px) at which the menu `<ul>` is rendered |
| `openMenu(event)` | `(event: MouseEvent) => void` | Shows the menu at the pointer's viewport position |
| `closeMenu(event)` | `(event: MouseEvent) => void` | Hides the menu |
| `hideMenu()` | `() => void` | Hides the menu without requiring a `MouseEvent` argument |

---

### `MenuTrigger` / `MenuTriggerDirective`

Directive selector: `[menuTriggerFor]`

`MenuTrigger` is the abstract base class used as the DI token. Use `@ViewChild(MenuTrigger)` in your component class to obtain a reference to the directive without depending on the concrete `MenuTriggerDirective` type.

| Member | Signature / Type | Description |
|---|---|---|
| `menu` | `ContextMenuComponent \| null` | The linked menu component (set via `[menuTriggerFor]`) |
| `openMenu(event)` | `(event: MouseEvent) => void` | Delegates to `ContextMenuComponent.openMenu()` |
| `closeMenu(event)` | `(event: MouseEvent) => void` | Delegates to `ContextMenuComponent.closeMenu()` |

---

### `ContextSideMenuComponent`

Selector: `uilibrary-context-side-menu`

| Member | Signature / Type | Description |
|---|---|---|
| `disabled` | `@Input() boolean` | Disables the sub-menu trigger button. Default `false`. |

**Content slots:**

| Slot | Selector | Description |
|---|---|---|
| Label | `[context-menu-label]` | Element shown as the sub-menu button text |
| Items | _(default)_ | Flyout content — use `<div>` or `<button>` elements |

---

## SCSS utility classes

| Class | Element | Purpose |
|---|---|---|
| `context-sidemenu-item` | Any element inside `uilibrary-context-side-menu` | Applies the same hover and padding styles as an auto-styled `<div>`. Use this class on `<button>` elements when you need button semantics for a sub-menu item. |

---

## Technical decisions

### Why the `[menuTriggerFor]` directive instead of `@ViewChild(ContextMenuComponent)` directly?

The directive pattern (inspired by Angular Material's `matMenuTriggerFor`) decouples the trigger element from the concrete menu type. The trigger holds its link through the `MenuTrigger` abstract class, which also acts as a DI token — allowing the consumer to inject the directive with `@ViewChild(MenuTrigger)` without importing `MenuTriggerDirective` explicitly. Note: a significant portion of this module was AI-assisted and this design was inherited as part of that generation.

### Why must consumers call `event.preventDefault()` themselves?

The `contextmenu` event must be cancelled before any custom UI renders. Only the consuming component can decide whether to suppress the browser's native menu in all circumstances (e.g. it may want to allow native behaviour on certain child elements). Handling `preventDefault()` inside the directive would remove that control.

### Why `ViewEncapsulation.None` on `ContextMenuComponent`?

The menu `<ul>` is rendered with `position: fixed` at viewport coordinates so it escapes `overflow: hidden` ancestors. With the default `ViewEncapsulation.Emulated`, Angular would scope the component's styles with a generated attribute — preventing the shared library stylesheet's `.context-menu` and `.context-menu button` rules from matching the projected `<button>` items. `ViewEncapsulation.None` keeps the global rules applicable to projected content.

### Why does the sub-menu use two `<ng-content>` slots rather than an `@Input() label`?

The `[context-menu-label]` slot allows any HTML element (not just a string) to serve as the sub-menu trigger label — an icon, a badge, or a styled `<span>` can all be projected. A plain `@Input() label: string` would require `[innerHTML]` binding to achieve the same result, introducing unnecessary XSS risk.

### Known limitations

- **No keyboard navigation within menu items** — arrow-key traversal is not implemented. Screen-reader users must Tab through items manually.
- **No focus trapping or focus restoration** — opening the menu does not move focus into it, and closing it does not return focus to the trigger element. This is a known accessibility gap.
- **No viewport-edge repositioning** — the menu renders directly at the pointer's `clientX`/`clientY`. If the menu would overflow the viewport's right or bottom edge it will be clipped; no flip or offset logic is applied.
- **Right-click only** — this component is designed for `contextmenu` events. Using it as a general-purpose dropdown (e.g. triggered by a `...` toolbar button) is not supported.
- **One level of sub-menu nesting** — `uilibrary-context-side-menu` components cannot themselves host further `uilibrary-context-side-menu` children.
- **Fixed menu width** — the `.context-menu` `<ul>` has a hard-coded width of 150 px in the library stylesheet. Overriding it requires a global CSS selector.
