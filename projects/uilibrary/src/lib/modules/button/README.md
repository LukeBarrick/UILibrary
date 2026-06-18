# ButtonModule

A styled, accessible button module for the UI Library. Provides a native push button and a router-aware button link — built on Bootstrap button classes, no custom CSS framework required.

---

## Contents

- [Setup](#setup)
- [Basic usage — push button](#basic-usage--push-button)
- [Basic usage — button link](#basic-usage--button-link)
- [Basic usage — external link](#basic-usage--external-link)
- [Basic usage — buttons with icons](#basic-usage--buttons-with-icons)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)
- [Troubleshooting](#troubleshooting)

---

## Setup

`ButtonModule` is already imported by `UserInterfaceLibraryModule`, so no additional module import is needed if you are using the full library.

If you are cherry-picking modules, import `ButtonModule` directly:

```typescript
import { ButtonModule } from 'uilibrary';

@NgModule({
  imports: [ButtonModule],
})
export class MyModule {}
```

---

## Basic usage — push button

`<uilibrary-button>` renders a native `<button>` element. Label content is projected via `<ng-content>`.

```html
<uilibrary-button appearance="primary" (click)="handleSubmit()">
  Submit
</uilibrary-button>

<uilibrary-button appearance="secondary" (click)="cancel()">
  Cancel
</uilibrary-button>
```

Use `[disabled]` to prevent interaction during loading or validation states:

```html
<uilibrary-button
  appearance="primary"
  [disabled]="isSubmitting"
  type="submit">
  {{ isSubmitting ? 'Submitting…' : 'Submit' }}
</uilibrary-button>
```

> **Note:** `type` defaults to `"button"`. Set `type="submit"` when the button lives inside a `<form>` and should trigger native form submission.

---

## Basic usage — button link

`<uilibrary-button-link>` renders an `<a>` element and integrates with Angular Router. Pass the router path via `[link]` (not `[routerLink]` — see [Technical decisions](#technical-decisions)):

```html
<uilibrary-button-link
  appearance="primary"
  [link]="['/dashboard']">
  Go to Dashboard
</uilibrary-button-link>
```

Use `[linkActiveAppearance]` to apply a different appearance when the bound route is the current active route:

```html
<uilibrary-button-link
  appearance="secondary"
  [link]="['/reports']"
  linkActiveAppearance="primary">
  Reports
</uilibrary-button-link>
```

> **Note:** The active-state match is exact by default. The URL must match `[link]` exactly for `linkActiveAppearance` to apply.

---

## Basic usage — external link

When navigating to an external URL, use `[href]` instead of `[link]`. The component switches to a plain `<a href>` with no router integration:

```html
<uilibrary-button-link
  appearance="primary"
  href="https://example.com"
  target="_blank">
  Open External Site
</uilibrary-button-link>
```

> **Note:** When `[href]` is present it takes priority over `[link]`. `routerLinkActive` styling does not apply in `href` mode.

---

## Basic usage — buttons with icons

Both components accept an `[icon]` input. The icon renders before the label content and is sized automatically to match the button size:

```html
<uilibrary-button appearance="primary" icon="icon-save">
  Save
</uilibrary-button>

<uilibrary-button appearance="secondary" size="small" icon="icon-edit">
  Edit
</uilibrary-button>
```

```html
<uilibrary-button-link
  appearance="primary"
  [link]="['/settings']"
  icon="icon-settings">
  Settings
</uilibrary-button-link>
```

> **Note:** Icon names must match entries registered in `IconModule`. See the Icon component documentation for available names.

---

## Options reference

### `ButtonComponent` inputs

All inputs are optional. `appearance` defaults to `'primary'`; omit `size` for the default (normal) size.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `appearance` | `ButtonAppearance` | `'primary'` | Visual style of the button. See [ButtonAppearance values](#buttonappearance-values). |
| `size` | `'small' \| string` | — | Set to `'small'` for the compact variant; omit for default size. |
| `disabled` | `boolean` | — | Disables the button element when `true`. |
| `type` | `string` | `'button'` | Native HTML button type: `'button'`, `'submit'`, or `'reset'`. |
| `icon` | `string` | — | Icon name passed to `<uilibrary-icon>`. Renders before the projected label. |
| `aria_label` | `string` | — | Sets `aria-label` on the `<button>` element. |

### `ButtonLinkComponent` inputs

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `appearance` | `ButtonAppearance` | `'primary'` | Visual style when the route is not active. |
| `linkActiveAppearance` | `ButtonAppearance` | `'primary'` | Appearance applied via `routerLinkActive` when the route is the current active route. |
| `size` | `'small' \| string` | — | Set to `'small'` for the compact variant. |
| `link` | `string \| any[] \| null` | `null` | Router path — passed to `[routerLink]` on the inner `<a>`. Use this instead of `[routerLink]` on the host. |
| `href` | `string \| any[] \| null` | `null` | External URL. When set, renders a plain anchor and takes priority over `[link]`. |
| `target` | `string \| any[] \| null` | `null` | Native `target` attribute on the anchor (e.g. `'_blank'`). |
| `icon` | `string` | — | Icon name passed to `<uilibrary-icon>`. Renders before the projected label. |
| `aria_label` | `string` | — | Sets `aria-label` on the `<a>` element. |

### `ButtonAppearance` values

| Value | Description |
|-------|-------------|
| `'primary'` | Primary action — solid, high emphasis |
| `'secondary'` | Secondary / alternative action — outlined |
| `'primary-success'` | Primary style in success (green) colour |
| `'secondary-success'` | Secondary style in success (green) colour |
| `'primary-delete'` | Primary style in danger (red) colour |
| `'secondary-delete'` | Secondary style in danger (red) colour |

---

## API reference

### `ButtonComponent`

Selector: `uilibrary-button`

| Member | Type | Description |
|--------|------|-------------|
| `appearance` | `@Input() ButtonAppearance \| undefined` | Visual style of the button. |
| `size` | `@Input() string \| undefined` | `'small'` for compact variant; omit for default. |
| `disabled` | `@Input() boolean \| undefined` | Disables the native `<button>` element. |
| `type` | `@Input() string` | Native button type. Defaults to `'button'`. |
| `icon` | `@Input() string \| undefined` | Icon name rendered before label content. |
| `aria_label` | `@Input() string \| undefined` | Value for the `aria-label` attribute. |

> **Note:** All inputs are fully reactive. Changing `appearance` or `size` after init re-computes the applied CSS classes via `ngOnChanges`.

---

### `ButtonLinkComponent`

Selector: `uilibrary-button-link`

| Member | Type | Description |
|--------|------|-------------|
| `appearance` | `@Input() ButtonAppearance \| undefined` | Default appearance when the route is not active. |
| `linkActiveAppearance` | `@Input() ButtonAppearance \| undefined` | Appearance applied by `routerLinkActive` when the route is active. |
| `size` | `@Input() string \| undefined` | `'small'` for compact variant. |
| `link` | `@Input() string \| any[] \| null` | Router path passed to the inner anchor's `[routerLink]`. |
| `href` | `@Input() string \| any[] \| null` | External URL. Takes priority over `[link]` when set. |
| `target` | `@Input() string \| any[] \| null` | Anchor `target` attribute. |
| `icon` | `@Input() string \| undefined` | Icon name rendered before label content. |
| `aria_label` | `@Input() string \| undefined` | Value for the `aria-label` attribute. |
| `routerLink` | `@Input() (deprecated)` | No-op setter. Do not use — bind `[link]` instead. |

> **Note:** `ButtonLinkComponent` processes inputs in `ngOnInit` only and does not implement `ngOnChanges`. Treat `appearance` and `size` as static after the component initialises.

---

### `ButtonModule`

| | |
|---|---|
| **Declares** | `ButtonComponent`, `ButtonLinkComponent` |
| **Exports** | `ButtonComponent`, `ButtonLinkComponent` |
| **Imports** | `CommonModule`, `IconModule`, `RouterLink`, `RouterLinkActive` |

---

## Technical decisions

### Why `[link]` instead of `[routerLink]` on `ButtonLinkComponent`?

`<uilibrary-button-link>` is a component whose template renders the `<a>` element internally. Angular's `RouterLink` directive targets `<a>` and `<button>` elements. Binding `[routerLink]` on the component host applies routing to the host element itself, not to the inner anchor in the template — so the navigation appears to work but the inner link is left inert, and `routerLinkActive` styling does not apply correctly.

The `[link]` input exists to thread the router path through to the inner anchor where `RouterLink` is declared. A no-op deprecated setter for `routerLink` is included on the host so that consumers who mistakenly use `[routerLink]` receive a clear deprecation notice at compile time rather than silent misbehaviour at runtime.

### Why an abstract `ButtonBase` class?

Both `ButtonComponent` and `ButtonLinkComponent` apply CSS class names derived from the `appearance` and `size` inputs. `ButtonBase` owns the `buildSizeClass()` and `buildAppearanceClass()` methods, making it the single source of truth for the appearance-to-class mapping. Without it, adding a new `ButtonAppearance` variant or changing a class name would require identical edits in two components.

### Why does `ButtonLinkComponent` branch on `[href]`?

External links (absolute URLs) are outside Angular Router's remit — binding an absolute URL to `[routerLink]` causes a router error. When `[href]` is present, the template renders a plain `<a href>` that lets the browser handle navigation directly and supports the `[target]` attribute for `_blank` behaviour. When `[link]` is provided instead, the router-aware branch is used, giving access to `routerLinkActive` and the `linkActiveAppearance` styling.

---

## Troubleshooting

### `linkActiveAppearance` never applies

**Symptom:** The button does not change appearance when navigating to its route.  
**Cause:** `routerLinkActive` is configured with `{ exact: true }`. A query string, fragment, or child route segment in the current URL prevents an exact match.  
**Fix:** Confirm the value bound to `[link]` matches the exact active URL path. If prefix matching is needed, a native `<a [routerLink] [routerLinkActiveOptions]="{ exact: false }">` should be used instead — this option is not currently exposed as an input on `ButtonLinkComponent`.

---

### Button inside a form submits the page unexpectedly

**Symptom:** Clicking a `<uilibrary-button>` inside a `<form>` submits the form even though no submit handler is attached to the button.  
**Cause:** Browsers treat `<button>` elements without an explicit `type` attribute as `type="submit"` by default. `ButtonComponent` avoids this by defaulting `type` to `"button"`.  
**Fix:** This should not occur out of the box. If you observe it, verify that `type` has not been overridden. Set `type="submit"` explicitly only when form submission is the intended action.

---

### `[routerLink]` on host causes unexpected navigation

**Symptom:** Navigation appears to work, but `linkActiveAppearance` styling is absent, or the active class is applied to the wrong element.  
**Cause:** `[routerLink]` was bound directly on `<uilibrary-button-link>` rather than using `[link]`.  
**Fix:** Replace `[routerLink]="path"` with `[link]="path"`.
