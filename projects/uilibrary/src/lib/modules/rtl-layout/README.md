# RTL Layout

A structural directive for the UI Library that switches a host element and all its descendants between left-to-right and right-to-left layout. Built on the browser's native `dir` attribute and CSS logical properties — no Angular CDK `BidiModule` or document-level changes required.

---

## Contents

- [Setup](#setup)
- [Basic usage — static direction](#basic-usage--static-direction)
- [Basic usage — dynamic direction](#basic-usage--dynamic-direction)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)

---

## Setup

`RtlLayoutModule` is already imported by `UserInterfaceLibraryModule`, so no additional import is needed if you are using the full library bundle.

To use it in isolation, import it directly into your feature module:

```typescript
import { RtlLayoutModule } from 'uilibrary';

@NgModule({
  imports: [RtlLayoutModule],
})
export class MyModule {}
```

No service injection is required — the `uiRtlLayout` directive is applied directly in your template.

---

## Basic usage — static direction

Apply `uiRtlLayout` as a static attribute to wrap a section of your template in a fixed direction:

```html
<div uiRtlLayout="rtl">
  <p>This paragraph and all its descendants render right-to-left.</p>
</div>
```

Any descendant that uses CSS logical properties (`margin-inline-start`, `padding-block-end`, `border-inline-start`, etc.) or Flexbox will adapt automatically — no direction-specific CSS overrides are needed.

> **Note:** The directive sets the `dir` HTML attribute on the host element only. It does not modify `document.dir` or Angular's `LOCALE_ID` — see [Technical decisions](#technical-decisions) for the reasoning.

---

## Basic usage — dynamic direction

Bind `uiRtlLayout` to a component property of type `LayoutDirection` to switch direction at runtime:

```typescript
import { LayoutDirection } from 'uilibrary';

@Component({ ... })
export class MyComponent {
  direction: LayoutDirection = 'ltr';

  toggleDirection(): void {
    this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
  }
}
```

```html
<div [uiRtlLayout]="direction">
  <!-- All descendant layout adapts when direction changes -->
  <button (click)="toggleDirection()">Toggle direction</button>
</div>
```

> **Note:** Binding an empty string (`''`) is treated as `'ltr'`. This is a deliberate safety net — see [Technical decisions](#technical-decisions).

---

## Options reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `uiRtlLayout` | `'rtl' \| 'ltr' \| ''` | `'ltr'` | The layout direction to apply to the host element. An empty string falls back to `'ltr'`. |

---

## API reference

### `RtlLayoutDirective`

Selector: `[uiRtlLayout]`

| Member | Signature / Type | Description |
|--------|-----------------|-------------|
| `direction` | `set direction(value: LayoutDirection \| ''): void` | Sets the layout direction. Aliased to `uiRtlLayout`. An empty string resolves to `'ltr'`. |
| `dir` | `HostBinding('attr.dir')` → `LayoutDirection` | The `dir` HTML attribute written to the host element. |
| `isRtl` | `HostBinding('class.ui-dir-rtl')` → `boolean` | Adds the `ui-dir-rtl` class to the host when direction is `'rtl'`. |
| `isLtr` | `HostBinding('class.ui-dir-ltr')` → `boolean` | Adds the `ui-dir-ltr` class to the host when direction is `'ltr'`. |

---

### `LayoutDirection`

A string union type exported for use in consuming components:

```typescript
export type LayoutDirection = 'rtl' | 'ltr';
```

---

### `RtlLayoutModule`

| Declares | `RtlLayoutDirective` |
|----------|----------------------|
| Exports  | `RtlLayoutDirective` |
| Imports  | `CommonModule`       |

---

## SCSS utility classes

The directive automatically adds one of these classes to the host element depending on the active direction. Consumers can target them in their own stylesheets to apply direction-specific inline style overrides — particularly useful for third-party components that do not respond to the `dir` attribute.

| Class | Applied when | Purpose |
|-------|-------------|---------|
| `ui-dir-rtl` | `direction === 'rtl'` | Hook for RTL-specific style rules on the host or its descendants. |
| `ui-dir-ltr` | `direction === 'ltr'` | Hook for LTR-specific style rules on the host or its descendants. |

```css
/* Example: flip the padding-left of a third-party component that ignores dir */
.ui-dir-rtl .third-party-widget {
  padding-left: 0;
  padding-right: 1rem;
}
```

---

## Technical decisions

### Why a custom directive rather than Angular CDK `BidiModule`?

This module is intentionally lightweight. Angular CDK's `BidiModule` adds a `Directionality` service that listens for `dir` attribute mutations and exposes an Observable — valuable when multiple unrelated components need to read the current direction programmatically. For most layout-flip use cases that is unnecessary: setting the native `dir` attribute is sufficient because browsers propagate direction to all descendants automatically, and all modern Flexbox and CSS logical-property implementations respect it without additional JavaScript.

Avoiding the CDK dependency keeps `RtlLayoutModule` self-contained and avoids version-coupling for consumers who do not otherwise use the Angular CDK.

### Why does the directive not modify `document.dir` or `LOCALE_ID`?

The directive is scoped to the host element's subtree and is designed for partial, in-page RTL scenarios — for example, rendering a single form, panel, or card in the user's preferred script direction while the rest of the page remains LTR. Consumers who need document-wide RTL or full Angular locale integration should set `document.dir` directly and provide the appropriate `LOCALE_ID` token at the root module level. Coupling those concerns to a scoped layout directive would create unintended side effects and exceed the module's single responsibility.

### Why does an empty string fall back to `'ltr'`?

Angular may evaluate a directive input as an empty string when the binding expression is initially undefined or when the attribute is present without an assigned value (e.g. `<div uiRtlLayout>`). The guard `value === 'rtl' ? 'rtl' : 'ltr'` ensures the host always receives a valid `dir` value, preventing the browser from inheriting an ambiguous or undefined direction from an ancestor element.

---
