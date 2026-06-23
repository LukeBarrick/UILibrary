# NavigationModule

A responsive top-navigation bar for the UI Library. Built on ng-bootstrap's `ngbDropdown` for accessible dropdown menus — no custom overlay or focus-management code required.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — simple navigation](#basic-usage--simple-navigation)
- [Basic usage — dropdowns](#basic-usage--dropdowns)
- [Basic usage — right-aligned content](#basic-usage--right-aligned-content)
- [Basic usage — mobile menu with extra content](#basic-usage--mobile-menu-with-extra-content)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)
- [Troubleshooting](#troubleshooting)

---

## How it works

The navigation bar renders two parallel `<section>` elements: one for desktop (`normal-nav-links`) and one for mobile (`small-nav-links`). CSS hides and shows each section at the 1 020 px breakpoint.

On the desktop path, an overflow algorithm recalculates whenever `links` changes or the window is resized:

```
links @Input changes  /  window:resize
             │
             ▼
       adjustNav() — reads navbar and logo widths
             │
             ▼
   Distributes links into this.links (visible)
      and this.overflowLinks (overflow)
             │
             ├─ visible links ──► <uilibrary-navigation-option> (flat links)
             │                    <uilibrary-navigation-dropdown> (links with children)
             │
             └─ overflow links ─► "More" <uilibrary-navigation-dropdown>
```

On mobile, all links — visible and overflow — are combined via `allNavigationLinks` and collapsed into a single "Menu" `<uilibrary-navigation-dropdown>`.

---

## Setup

`NavigationModule` is already imported by `UserInterfaceLibraryModule`, so no additional module import is needed if you are using the full library.

If you are cherry-picking modules, import `NavigationModule` directly:

```typescript
import { NavigationModule } from 'uilibrary';

@NgModule({
  imports: [NavigationModule],
})
export class MyModule {}
```

> **Note:** `NavigationModule` pulls in `RouterModule` and `@ng-bootstrap/ng-bootstrap` as peer dependencies. Both must be available in the consuming app.

### Theming

The navigation bar draws its colours from CSS custom properties defined in the library design token system:

| Property | Where used |
|---|---|
| `--primary` | Navbar background colour |
| `--secondaryFont` | Top-level link and toggle button text colour |
| `--secondary` | Active-route underline and active dropdown text |
| `--lighter-gray` | Dropdown item hover background |

Override these variables in your application's global styles to apply custom branding:

```css
:root {
  --primary: #1a2b3c;
  --secondary: #f0a500;
  --secondaryFont: #ffffff;
  --lighter-gray: #f5f5f5;
}
```

---

## Basic usage — simple navigation

Build a `NavigationLink[]` array and bind it to `[links]`. Project your logo element into the `[logo]` slot.

```typescript
import { NavigationLink, NavigationLinkType } from 'uilibrary';

export class AppComponent {
  links: NavigationLink[] = [
    { label: 'Home',    path: '/',        type: NavigationLinkType.Route },
    { label: 'About',   path: '/about',   type: NavigationLinkType.Route },
    { label: 'Contact', path: '/contact', type: NavigationLinkType.Route },
  ];
}
```

```html
<uilibrary-navigation [links]="links">
  <img logo src="assets/logo.png" style="height: 50px" alt="My App logo">
</uilibrary-navigation>
```

The three `NavigationLinkType` values control how each link is rendered:

| Value | Rendered as |
|---|---|
| `Route` | `<a [routerLink]>` — tracked by Angular Router; gains the `active` CSS class when the route is active |
| `URL` | `<a href>` — external URL, opens in the same tab |
| `TargetBlankURL` | `<a href target="_blank" rel="noopener">` — external URL, opens in a new tab |

---

## Basic usage — dropdowns

Set a `children` array on any `NavigationLink` to turn it into a dropdown. Only one level of children is supported — nested `children` within children are not rendered.

```typescript
import { NavigationLink, NavigationLinkType } from 'uilibrary';

export class AppComponent {
  links: NavigationLink[] = [
    { label: 'Home', path: '/', type: NavigationLinkType.Route },
    {
      label: 'Products',
      path: '',
      type: NavigationLinkType.Route,
      children: [
        { label: 'Web Development', path: '/products/web',    type: NavigationLinkType.Route },
        { label: 'Mobile Apps',     path: '/products/mobile', type: NavigationLinkType.Route },
        { label: 'Consulting',      path: '/products/consulting', type: NavigationLinkType.Route },
      ],
    },
    { label: 'Contact', path: '/contact', type: NavigationLinkType.Route },
  ];
}
```

```html
<uilibrary-navigation [links]="links">
  <img logo src="assets/logo.png" style="height: 50px" alt="My App logo">
</uilibrary-navigation>
```

> **Note:** Set `hidenLabelOnNestedChildren: true` on a parent link to suppress its label header inside the open dropdown panel. Note the intentional typo in the property name — this matches the source definition.

The dropdown toggle automatically receives the `active` CSS class (via `--secondary` colour) when any of its children's routes are currently active.

---

## Basic usage — right-aligned content

Project content into the `[rightAlignedContent]` slot to place elements (e.g. a login button, user avatar, or secondary dropdown) in the far-right zone of the bar.

```html
<uilibrary-navigation [links]="links">
  <img logo src="assets/logo.png" style="height: 50px" alt="My App logo">
  <div rightAlignedContent>
    <uilibrary-button appearance="secondary" (click)="login()">Login</uilibrary-button>
  </div>
</uilibrary-navigation>
```

> **Note:** The right-aligned zone is fixed at 300 px wide on desktop. Set `[showRightAlignedContent]="false"` to remove this reservation and reclaim the space for additional nav links in the overflow algorithm.

Add `[hideRightAllignedContentOnMobile]="true"` to hide the right-aligned area at and below the 1 020 px mobile breakpoint:

```html
<uilibrary-navigation [links]="links" [hideRightAllignedContentOnMobile]="true">
  <img logo src="assets/logo.png" style="height: 50px" alt="My App logo">
  <div rightAlignedContent>...</div>
</uilibrary-navigation>
```

---

## Basic usage — mobile menu with extra content

On mobile, all links collapse into a "Menu" dropdown. Project content into `[extraMobileMenuContent]` to append extra items below the auto-generated link list in that dropdown.

```html
<uilibrary-navigation [links]="links">
  <img logo src="assets/logo.png" style="height: 50px" alt="My App logo">
  <div extraMobileMenuContent>
    <uilibrary-button appearance="primary" (click)="login()">Login</uilibrary-button>
  </div>
</uilibrary-navigation>
```

Set `[showExtraMobileMenuContent]="false"` to hide the projected extra content without removing it from the template.

---

## Options reference

### `uilibrary-navigation`

| Option | Type | Default | Description |
|---|---|---|---|
| `links` | `NavigationLink[]` | `[]` | Top-level navigation links. Items with `children` render as dropdowns; flat items render as plain options. |
| `showRightAlignedContent` | `boolean` | `true` | Reserves and renders the 300 px right-aligned content zone. Set to `false` to reclaim that space for nav links. |
| `hideRightAllignedContentOnMobile` | `boolean` | `false` | Hides the right-aligned zone at and below the 1 020 px breakpoint. |
| `showExtraMobileMenuContent` | `boolean` | `true` | Controls whether the `[extraMobileMenuContent]` projection is rendered inside the mobile "Menu" dropdown. |

### `uilibrary-navigation-dropdown` (standalone use)

| Option | Type | Default | Description |
|---|---|---|---|
| `links` | `NavigationLink[] \| null` | `[]` | Items to render inside the dropdown panel. |
| `label` | `string` | `''` | Text displayed on the dropdown toggle button. |
| `icon` | `string \| undefined` | `undefined` | Icon name passed to `<uilibrary-icon>`. Rendered before the label when set. |

---

## API reference

### `NavigationComponent`

Selector: `uilibrary-navigation`

| Member | Signature / Type | Description |
|---|---|---|
| `links` | `@Input() NavigationLink[]` | Visible top-level links, auto-managed by the overflow algorithm on each resize. |
| `showRightAlignedContent` | `@Input() boolean` | Toggles the 300 px right-aligned content zone and its contribution to the overflow calculation. |
| `showExtraMobileMenuContent` | `@Input() boolean` | Controls whether `[extraMobileMenuContent]` is rendered in the mobile "Menu" dropdown. |
| `hideRightAllignedContentOnMobile` | `@Input() boolean` | Applies `hide-on-mobile` to the right-aligned content zone at the 1 020 px breakpoint. |
| `overflowLinks` | `NavigationLink[]` | Links displaced from the visible bar by the resize algorithm; rendered in the "More" dropdown. |
| `allNavigationLinks` | `NavigationLink[]` (getter) | Union of `links` and `overflowLinks`. Passed to the mobile "Menu" dropdown. |
| `goToUrl(url, target)` | `(url: string, target: string) => void` | Opens a URL via `window.open`. Called from the template for `URL` and `TargetBlankURL` link types. |

---

### `NavigationDropdownComponent`

Selector: `uilibrary-navigation-dropdown`

| Member | Signature / Type | Description |
|---|---|---|
| `links` | `@Input() NavigationLink[] \| null` | Items to render inside the dropdown panel. |
| `label` | `@Input() string` | Text displayed on the dropdown toggle button. |
| `icon` | `@Input() string \| undefined` | Optional icon shown before the label. |
| `isRoutesActive()` | `() => boolean` | Returns `true` if any item's `path` exactly matches the current Angular Router URL. Drives the `active` CSS class on the toggle. |

---

### `NavigationOptionComponent`

Selector: `uilibrary-navigation-option`

| Member | Signature / Type | Description |
|---|---|---|
| `link` | `@Input() NavigationLink \| undefined` | The link to render. Renders nothing when `undefined`. |

---

### `NavigationLink`

```typescript
import { NavigationLink, NavigationLinkType } from 'uilibrary';

interface NavigationLink {
  label: string;
  path: string;
  type: NavigationLinkType;
  children?: NavigationLink[];
  /**
   * When true, hides the parent group label inside a nested dropdown panel.
   * Note: property name contains a typo ("hiden") — match it exactly in your code.
   */
  hidenLabelOnNestedChildren?: boolean;
}
```

---

### `NavigationLinkType`

```typescript
import { NavigationLinkType } from 'uilibrary';

enum NavigationLinkType {
  Route,          // Angular Router link — [routerLink] + routerLinkActive
  URL,            // External href, same tab
  TargetBlankURL  // External href, target="_blank" rel="noopener"
}
```

---

## Technical decisions

### Why ng-bootstrap (`ngbDropdown`) rather than a custom dropdown?

ng-bootstrap's `ngbDropdown` provides keyboard navigation (arrow keys, Escape to close, focus management), ARIA `role="menu"` / `role="menuitem"` semantics, and click-outside dismissal out of the box. Building an equivalent accessible dropdown from scratch would have required a substantial custom directive. The only coupling cost is that consumers must have `@ng-bootstrap/ng-bootstrap` installed, which the wider library already requires.

**Known accessibility gaps:** The `<nav>` element supplies the `navigation` landmark role automatically. No additional ARIA labels are applied to the navbar itself — consumers who need a descriptive `aria-label` attribute on the `<nav>` element should note that it is not currently exposed as an input.

### Why are link widths hard-coded in the overflow algorithm?

`adjustNav()` assumes every top-level link occupies exactly 160 px and reserves 300 px for right-aligned content. This was a practical simplification: measuring actual rendered widths on every resize would have required either `AfterContentChecked` polling or a `ResizeObserver`, both of which add complexity. The constants are a known limitation — they will produce incorrect overflow behaviour when link labels are significantly shorter or longer than the assumed width. The intent is to replace them with dynamic DOM measurement and expose override `@Input` properties in a future update.

### Why is `NavigationDropdownLink` not in `public-api.ts`?

`NavigationDropdownLink` extends `NavigationLink` with an optional `onClick: (event: MouseEvent) => void` callback, used internally by `NavigationDropdownComponent`. It was not exposed publicly at the time the module was written. Consumers who need programmatic click handling (for example, in a right-aligned dropdown) should cast to `any` or use `NavigationLink` as the declared type until `NavigationDropdownLink` is formally added to the public API.

### Why two separate layout sections for desktop and mobile?

Rather than a single template with toggled `@if` blocks, the component renders two `<section>` elements — one for desktop, one for mobile — and switches between them with CSS `display: none` at the 1 020 px breakpoint. This avoids re-running the overflow algorithm on resize (the desktop section remains in the DOM and receives layout updates continuously) and keeps each rendering path simple.

---

## Troubleshooting

### Content projection slot is not rendering

Angular `ng-content` slots are resolved at compile time from bare attribute selectors. Slot attributes must match exactly.

| Symptom | Likely cause | Fix |
|---|---|---|
| Logo area is empty | Wrong attribute syntax on the projected element | Use a bare attribute — `<img logo …>` not `<img [logo]="…">` |
| Right-aligned content not visible | `showRightAlignedContent` bound to `false` | Ensure `[showRightAlignedContent]` is `true` (the default) |
| Extra mobile content not shown | `showExtraMobileMenuContent` bound to `false` | Ensure `[showExtraMobileMenuContent]` is `true` (the default) |
| Conditional content inside a slot doesn't work | `@if` / `*ngIf` on projected content conflicts with static slot resolution | Move the condition outside the `<uilibrary-navigation>` element, or use the component's own `show*` inputs to control visibility |

> **Note:** `rightAlignedContent` and `extraMobileMenuContent` cannot both be projected onto the same element — Angular allows only one projection per slot at a time.

### "More" overflow dropdown appears unexpectedly

The overflow algorithm assumes all links are 160 px wide. If your labels are short, fewer links will be moved to "More" than visually necessary; if they are long, more will overflow. This is a known limitation pending dynamic width measurement.

### Dropdown panel is clipped on mobile

At the 1 020 px breakpoint the SCSS sets `position: inherit` on `.navigation-dropdown-parent-custom`. If the "Menu" dropdown panel is clipped by an `overflow: hidden` ancestor, remove that `overflow` constraint from the ancestor element.
