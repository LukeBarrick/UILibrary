# Icon

A declarative SVG icon component for the UI Library. Built on `angular-svg-icon` — no inline `<img>` tags or sprite sheets required.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — rendering an icon](#basic-usage--rendering-an-icon)
- [Basic usage — custom colour](#basic-usage--custom-colour)
- [Basic usage — standalone app context](#basic-usage--standalone-app-context)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)

---

## How it works

```
App bootstrap (ngOnInit / APP_INITIALIZER)
  │
  ▼
LibIconService.registerIcons()
  │  Iterates IconConstants, calls SvgIconRegistryService.loadSvg()
  │  for each bundled SVG asset at ./assets/images/<name>.svg
  ▼
angular-svg-icon registry (keyed by icon name string)
  │
  ▼
<uilibrary-icon [name]="..." [size]="..." [appearance]="...">
  │  IconComponent resolves pixel dimensions and fill colour
  │  from the size / appearance inputs, then delegates to
  │  <svg-icon [svgStyle]="{ width, height, fill }">
  ▼
Rendered SVG element in the DOM
```

Icons must be registered once, before any `<uilibrary-icon>` renders.

---

## Setup

`IconModule` is already imported by `UserInterfaceLibraryModule`, so no additional module import is required if you are using the full library umbrella module.

If you are importing `IconModule` directly into a feature module:

```typescript
import { IconModule } from 'uilibrary';

@NgModule({
  imports: [IconModule],
})
export class MyFeatureModule {}
```

### Register icons at app bootstrap

Call `LibIconService.registerIcons()` once, early in the application lifecycle. The recommended location is the root component's `ngOnInit`:

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { LibIconService } from 'uilibrary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {
  private libIconService = inject(LibIconService);

  ngOnInit(): void {
    this.libIconService.registerIcons();
  }
}
```

> **Note:** `registerIcons()` is idempotent — calling it more than once is safe but unnecessary. It loads all icons from the library's bundled `assets/images/` folder; you do not need to copy or provide any SVG files yourself.

---

## Basic usage — rendering an icon

Use the `<uilibrary-icon>` selector with a `name` value taken from `IconConstants`:

```typescript
import { IconConstants } from 'uilibrary';

@Component({ ... })
export class MyComponent {
  readonly icons = IconConstants;
}
```

```html
<!-- Fixed name -->
<uilibrary-icon name="icon-search" size="medium" appearance="primary"></uilibrary-icon>

<!-- Bound from component -->
<uilibrary-icon [name]="icons.icon_search" size="large" appearance="secondary"></uilibrary-icon>
```

> **Note:** `size` defaults to `medium` (40 × 40 px) and `appearance` defaults to `secondary` when omitted.

---

## Basic usage — custom colour

Set `appearance="custom"` to have the icon's fill inherit from the `color` CSS property of its container. This lets you control the colour entirely via a wrapper class or inline style:

```html
<span style="color: #e63946;">
  <uilibrary-icon name="icon-exclamation" size="small" appearance="custom"></uilibrary-icon>
</span>
```

```css
.my-wrapper {
  color: var(--brand-highlight);
}
```

```html
<div class="my-wrapper">
  <uilibrary-icon name="icon-alert" appearance="custom"></uilibrary-icon>
</div>
```

> **Note:** `appearance="custom"` sets `fill: currentColor` on the SVG. The icon colour will follow whatever `color` value is in scope on the containing element.

---

## Basic usage — standalone app context

For Angular apps using standalone components and `app.config.ts` instead of an `AppModule`, register the `angular-svg-icon` environment providers via `IconModule.forStandalone()` and then import `IconComponent` directly:

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { IconModule } from 'uilibrary';

export const appConfig: ApplicationConfig = {
  providers: [
    IconModule.forStandalone(),
    // ...other providers
  ],
};
```

```typescript
// my-feature.component.ts
import { Component } from '@angular/core';
import { IconComponent } from 'uilibrary';

@Component({
  standalone: true,
  imports: [IconComponent],
  template: `<uilibrary-icon name="icon-search" size="medium"></uilibrary-icon>`,
})
export class MyFeatureComponent {}
```

> **Note:** Even in standalone mode, `LibIconService.registerIcons()` must still be called before icons render — typically in the root component's `ngOnInit`.

---

## Options reference

All inputs are optional. `size` and `appearance` fall back to `medium` and `secondary` respectively when omitted or unrecognised.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | `string` | — | Icon identifier. Use a value from `IconConstants` or pass the raw string (e.g. `'icon-search'`). |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls rendered pixel dimensions. `small` = 30 × 30, `medium` = 40 × 40, `large` = 80 × 80. |
| `appearance` | `'primary' \| 'secondary' \| 'tertiary' \| 'light-gray' \| 'dark-gray' \| 'custom'` | `'secondary'` | Maps to a CSS design-token fill colour. Use `'custom'` to inherit `currentColor` from the container. |
| `customDimensions` | `[height: number, width: number]` | `[0, 0]` | Overrides `size` with explicit pixel dimensions. Primarily for internal library use; exposed for edge cases where no preset matches. |

---

## API reference

### `IconComponent`

Selector: `uilibrary-icon`

| Member | Type | Description |
|--------|------|-------------|
| `name` | `@Input() string \| undefined` | Icon name to render; must match a registered icon key. |
| `size` | `@Input() string \| undefined` | Size preset: `'small'`, `'medium'`, or `'large'`. |
| `appearance` | `@Input() string \| undefined` | Fill colour preset or `'custom'` for `currentColor`. |
| `customDimensions` | `@Input() [number, number]` | Explicit `[height, width]` in pixels; overrides `size` when both values are non-zero. |

---

### `LibIconService`

Provided in: `root` (singleton)

| Member | Signature | Description |
|--------|-----------|-------------|
| `registerIcons()` | `() => Promise<any>` | Registers all bundled SVG icons with the `angular-svg-icon` registry. Call once at application bootstrap before any icon renders. |

---

### `IconConstants`

A static class exposing the full set of bundled icon name strings as constants.

```typescript
import { IconConstants } from 'uilibrary';

// Example values
IconConstants.icon_search          // 'icon-search'
IconConstants.icon_accommodation   // 'icon-accommodation'
IconConstants.chevron_left         // 'chevron_left'
```

Use these constants rather than raw strings to avoid typos and to benefit from IDE autocompletion.

<details>
<summary>Full icon list (45 icons)</summary>

| Constant | String value |
|---|---|
| `chevron_left` | `chevron_left` |
| `chevron_right` | `chevron_right` |
| `icon_accommodation` | `icon-accommodation` |
| `icon_air` | `icon-air` |
| `icon_cards` | `icon-cards` |
| `icon_rail` | `icon-rail` |
| `icon_transport` | `icon-transport` |
| `icon_card_add` | `icon-card-add` |
| `icon_search` | `icon-search` |
| `icon_cog` | `icon-cog` |
| `icon_communication` | `icon-communication` |
| `icon_pay` | `icon-pay` |
| `icon_card_exchange` | `icon-card-exchange` |
| `icon_folder` | `icon-folder` |
| `icon_cloud_notepad` | `icon-cloud-notepad` |
| `icon_receipt` | `icon-receipt` |
| `icon_document_add` | `icon-document-add` |
| `icon_user_add` | `icon-user-add` |
| `icon_four_dots` | `icon-four-dots` |
| `icon_android` | `icon-android` |
| `icon_pending` | `icon-pending` |
| `icon_api` | `icon-api` |
| `icon_apple` | `icon-apple` |
| `icon_email` | `icon-email` |
| `icon_exclamation` | `icon-exclamation` |
| `icon_fax` | `icon-fax` |
| `icon_secure_email` | `icon-secure-email` |
| `icon_arrows` | `icon-arrows` |
| `icon_user` | `icon-user` |
| `icon_audience` | `icon-audience` |
| `icon_block` | `icon-block` |
| `icon_conferma_payment_pass` | `icon-conferma-payment-pass` |
| `icon_double_tick` | `icon-double-tick` |
| `icon_loadbalance` | `icon-loadbalance` |
| `icon_people` | `icon-people` |
| `icon_plus` | `icon-plus` |
| `icon_redirect` | `icon-redirect` |
| `icon_send` | `icon-send` |
| `icon_shopping_cart` | `icon-shopping-cart` |
| `icon_tag` | `icon-tag` |
| `icon_tick` | `icon-tick` |
| `icon_next` | `icon-next` |
| `icon_previous` | `icon-previous` |
| `icon_document` | `icon-document` |
| `icon_document_unavailable` | `icon-document-unavailable` |
| `icon_document_download` | `icon-document-download` |

</details>

---

### `IconModule`

| Declares | — |
|---|---|
| Imports | `IconComponent`, `AngularSvgIconModule.forRoot()` |
| Exports | `IconComponent` |

| Static method | Signature | Description |
|---|---|---|
| `forStandalone()` | `() => EnvironmentProviders` | Returns the `angular-svg-icon` environment providers for use in `app.config.ts` (standalone app bootstrapping). |

---

## Technical decisions

### Why `angular-svg-icon`?

SVG icons need to be rendered inline so their `fill` colour can be controlled programmatically via Angular bindings. An `<img>` tag cannot have its fill colour changed via CSS, and a sprite-sheet `<use>` approach cannot be styled with a dynamic fill without complex CSS workarounds. `angular-svg-icon` inlines the SVG content and exposes `[svgStyle]` binding, which is exactly the mechanism `IconComponent` uses to apply `width`, `height`, and `fill` at render time.

### Why a separate `registerIcons()` call rather than auto-registration in the module?

Icon registration is an async operation — `SvgIconRegistryService.loadSvg()` issues HTTP requests to fetch each SVG file. Performing this work inside an `NgModule` constructor or `forRoot()` factory would be executed during Angular's module compilation phase before the HTTP client infrastructure is guaranteed to be ready. Deferring the call to `ngOnInit` of the root component ensures the full Angular app (including `HttpClient`) is bootstrapped first.

### Why `IconConstants` instead of a string union type?

`IconConstants` is a concrete class with static readonly members, which means the full icon name set is available as IDE autocompletion without needing to consult documentation. A string union type would provide the same compile-time safety but would need to be kept in sync with the SVG asset list manually — the class is the single source of truth since `registerIcons()` derives its list from `Object.keys(IconConstants)`.

### Why is `customDimensions` a tuple rather than separate `height` and `width` inputs?

`customDimensions` exists to serve internal library components (such as `DatepickerComponent`) where the icon must fit a specific non-standard slot. Grouping both dimensions as a single tuple communicates that width and height are always set together — a partial override (height only, or width only) is not a supported use-case.
