# SideNavigationModule

A vertical sidebar navigation component for the UI Library. Built on Angular Router's `routerLink` and `routerLinkActive` — no custom routing logic required.

---

## Table of Contents

- [Setup](#setup)
- [Basic Usage](#basic-usage)
- [Options Reference](#options-reference)
- [API Reference](#api-reference)
- [Technical Decisions](#technical-decisions)

---

## Setup

Import `SideNavigationModule` into your feature or app module:

```ts
import { SideNavigationModule } from 'uilibrary';

@NgModule({
  imports: [SideNavigationModule],
})
export class YourModule {}
```

---

## Basic Usage

Pass an array of `NavigationLink` objects via the `links` input. Each link must include a `label`, a `path`, and a `type`.

```ts
import { NavigationLink, NavigationLinkType } from 'uilibrary';

links: NavigationLink[] = [
  { label: 'Dashboard', path: '/dashboard', type: NavigationLinkType.Route },
  { label: 'Settings',  path: '/settings',  type: NavigationLinkType.Route },
];
```

```html
<ui-side-navigation [links]="links" />
```

> **Note:** Only `NavigationLinkType.Route` is currently wired up. `URL` and `TargetBlankURL` are reserved for a future iteration.

---

## Options Reference

| Option | Type | Default | Description |
|---|---|---|---|
| `links` | `NavigationLink[]` | `[]` | Ordered list of navigation items to render |

---

## API Reference

### `SideNavigationComponent`

| Member | Type | Description |
|---|---|---|
| `links` | `@Input() NavigationLink[]` | Navigation items passed to the component |

### `NavigationLink`

| Member | Type | Description |
|---|---|---|
| `label` | `string` | Display text for the link |
| `path` | `string` | Router path or URL |
| `type` | `NavigationLinkType` | Controls how the link is rendered (see note above) |
| `children?` | `NavigationLink[]` | Nested child links (not yet rendered) |
| `hidenLabelOnNestedChildren?` | `boolean` | Hide the parent label when children are shown |

### `NavigationLinkType`

| Value | Description |
|---|---|
| `Route` | Angular router path — rendered with `routerLink` |
| `URL` | External URL — **not yet implemented** |
| `TargetBlankURL` | External URL opening in a new tab — **not yet implemented** |

---

## Technical Decisions

### Why is the template minimal?

This module is an MVP scaffold. The current implementation renders a plain `<nav>` list with Angular Router bindings. Additional link types, nested children rendering, and active-state styling are deferred to future iterations.

### Why share `NavigationLink` with the top navigation?

The `NavigationLink` interface and `NavigationLinkType` enum live in `core/` and are shared across both the `navigation` and `side-navigation` modules to keep the data model consistent across routing surfaces.
