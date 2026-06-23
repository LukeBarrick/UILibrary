# Toggle

A boolean on/off switch for the UI Library. Implements Angular's `ControlValueAccessor` — integrates natively with `ngModel`, Reactive Forms, and one-way `[checked]` binding. No service or injection token required.

---

## Contents

- [Setup](#setup)
- [Basic usage — standalone binding](#basic-usage--standalone-binding)
- [Basic usage — ngModel](#basic-usage--ngmodel)
- [Basic usage — Reactive Forms](#basic-usage--reactive-forms)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)

---

## Setup

`ToggleModule` is already imported and re-exported by `UserInterfaceLibraryModule`, so no additional import is needed when using the full library bundle.

To import the feature module individually:

```typescript
import { ToggleModule } from 'uilibrary';

@NgModule({
  imports: [ToggleModule],
})
export class MyFeatureModule {}
```

No services, injection tokens, or `forRoot()` calls are required.

---

## Basic usage — standalone binding

Use `[checked]` for one-way state binding and `[disabled]` to prevent interaction. Pass the label text as inner content via the default slot.

```html
<!-- Label positioned to the left of the slider (default) -->
<uilibrary-toggle [checked]="isEnabled">
  Enable notifications
</uilibrary-toggle>

<!-- Pre-checked and disabled -->
<uilibrary-toggle [checked]="true" [disabled]="true">
  Always-on feature
</uilibrary-toggle>

<!-- Visually hidden label (text still present for screen readers) -->
<uilibrary-toggle [hideLabel]="true">
  This text describes the toggle for assistive technologies. Do not leave blank.
</uilibrary-toggle>
```

> **Note:** Always supply label content as inner text even when `[hideLabel]="true"`. The label is rendered with Bootstrap's `visually-hidden` utility class — it is never removed from the DOM — so screen readers can still announce the toggle's purpose.

---

## Basic usage — ngModel

`ToggleComponent` works directly with `[(ngModel)]` without any adapter.

```typescript
// In your component
isFeatureEnabled = false;
```

```html
<uilibrary-toggle [(ngModel)]="isFeatureEnabled">
  Enable feature
</uilibrary-toggle>
```

When the toggle is used **outside a `<form>` element**, add `[ngModelOptions]="{ standalone: true }"` to prevent Angular from throwing a "No value accessor" error:

```html
<uilibrary-toggle [(ngModel)]="isFeatureEnabled" [ngModelOptions]="{ standalone: true }">
  Enable feature
</uilibrary-toggle>
```

---

## Basic usage — Reactive Forms

Bind the toggle to a `FormControl` using `formControlName` or `[formControl]`.

```typescript
import { FormBuilder } from '@angular/forms';

this.form = this.fb.group({
  darkMode:      [false],
  notifications: [true],
});
```

```html
<form [formGroup]="form">
  <uilibrary-toggle formControlName="darkMode">
    Dark mode
  </uilibrary-toggle>

  <uilibrary-toggle formControlName="notifications">
    Enable notifications
  </uilibrary-toggle>
</form>
```

> **Note:** `setDisabledState` is fully implemented, so calling `form.get('darkMode')?.disable()` or `.enable()` programmatically will correctly reflect the disabled state on the toggle without any extra bindings.

### Label position and size variants

Both `labelPosition` and `labelSize` work in any binding mode. Import the `LabelPosition` enum from `'uilibrary'` for type-safe position values, then expose it on your component class for use in templates.

```typescript
import { LabelPosition } from 'uilibrary';

// Expose in your component class so the template can reference it
LabelPosition = LabelPosition;
```

```html
<!-- Label to the right of the slider -->
<uilibrary-toggle formControlName="analytics" [labelPosition]="LabelPosition.Right">
  Analytics tracking
</uilibrary-toggle>

<!-- Large label text -->
<uilibrary-toggle formControlName="autoSave" labelSize="large">
  Auto-save documents
</uilibrary-toggle>

<!-- Combined: large, right-positioned, disabled via form state -->
<uilibrary-toggle formControlName="experimentalUI" labelSize="large" [labelPosition]="LabelPosition.Right">
  Experimental UI
</uilibrary-toggle>
```

---

## Options reference

| Option | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Sets the initial or programmatic boolean value. Write-only (setter); use `[(ngModel)]` or a form control for two-way synchronisation. |
| `disabled` | `boolean` | `false` | Prevents user interaction. Also controlled automatically by `ControlValueAccessor.setDisabledState` when a bound form control is disabled. |
| `labelPosition` | `LabelPosition` | `LabelPosition.Left` | Position of the label content relative to the slider. `LabelPosition.Left` places the label before the slider; `LabelPosition.Right` places it after. Import `LabelPosition` from `'uilibrary'`. |
| `labelSize` | `'' \| 'large'` | `''` | Size variant for the label text. Pass `'large'` to apply the large font-size modifier. |
| `hideLabel` | `boolean` | `false` | Visually hides the label using Bootstrap's `visually-hidden` utility while keeping the text accessible to screen readers. |

---

## API reference

### `ToggleModule`

NgModule. Import into your own NgModule to use `ToggleComponent`.

| Member | Type | Description |
|---|---|---|
| — | — | No providers or configuration. Re-exports `ToggleComponent`. |

---

### `ToggleComponent`

Selector: `uilibrary-toggle`  
Implements: `ControlValueAccessor`

| Member | Signature / Type | Description |
|---|---|---|
| `checked` | `@Input() set checked(value: boolean)` | Writes the value to the internal `value` field. Equivalent to `writeValue()`. |
| `disabled` | `@Input() disabled: boolean` | Disables the toggle. Kept in sync with Reactive Forms via `setDisabledState`. Default: `false`. |
| `labelPosition` | `@Input() labelPosition: string` | Accepts `LabelPosition.Left` or `LabelPosition.Right` (import `LabelPosition` from `'uilibrary'`). Controls the flex order of the label slot relative to the slider. Default: `LabelPosition.Left`. |
| `labelSize` | `@Input() labelSize: string` | Accepts `''` or `'large'`. Applies the `.large` CSS modifier to the label. Default: `''`. |
| `hideLabel` | `@Input() hideLabel: boolean` | When `true`, applies `visually-hidden` to the label slot. Default: `false`. |
| `id` | `string` | Auto-generated UUID (`crypto.randomUUID()`). Bound to the hidden `<input id>` so the enclosing `<label>` has an implicit accessible association. |
| `value` | `boolean` | Internal checked state. Mutated by `writeValue`, `handleChange`, and the `checked` setter. |
| `writeValue(value)` | `(value: any): void` | CVA method. Sets `value` directly. Called by Angular's form machinery. |
| `registerOnChange(fn)` | `(fn: any): void` | CVA method. Registers the callback Angular calls when the value changes. |
| `registerOnTouched(fn)` | `(fn: any): void` | CVA method. Registers the callback Angular calls when the control is touched. |
| `setDisabledState(isDisabled)` | `(isDisabled: boolean): void` | CVA method. Propagates form-control disabled state to the `disabled` field. |
| `handleChange()` | `(): void` | Invoked on slider click. Flips `value`, then calls `onChange` and `onTouched`. |

---

## Technical decisions

### Why `ControlValueAccessor` instead of `@Output() change`?

Implementing `ControlValueAccessor` means the toggle behaves identically to a native `<input type="checkbox">` inside Angular forms. Consumers can use `ngModel`, `formControlName`, or `[formControl]` without any adapter or wrapper component. An `@Output() change` event was deliberately omitted — all state flow goes through the CVA contract, which keeps the component predictable and prevents double-firing when both a form and an output listener are present.

The `@Optional() @Self() NgControl` constructor injection is the canonical Angular approach for this pattern: `@Optional()` ensures the toggle does not error when used completely outside a form, and `@Self()` stops Angular from traversing the injector tree and accidentally binding to a parent control.

### Why `ng-content` for the label rather than a string `@Input`?

Slotting the label via `<ng-content>` lets consumers pass formatted markup, bound expressions, or icon components as label content without resorting to `[innerHTML]`. The slot is always rendered inside a `<label>` element that wraps the hidden `<input>`, providing an implicit accessible label–input association (no `for` attribute is needed when the label contains the input).

### Why a `checked` setter rather than exposing `value` as a public `@Input`?

The public-facing input is named `checked` to match the native checkbox API, while the internal state field is named `value` to match the `ControlValueAccessor` contract (`writeValue` / `registerOnChange`). The setter writes through to `value`, keeping the two in sync without exposing `value` as a writable input — which would create ambiguity when a form control and a template binding both attempt to drive the same field.

### Why CSS logical properties for label spacing?

The gap between the slider and the label text uses `margin-inline-start` (`mis-4`) and `margin-inline-end` (`mie-4`) rather than `margin-left` / `margin-right`. Logical properties are direction-aware: in an LTR layout they resolve to the expected left/right margins, and in an RTL layout they automatically mirror without any extra CSS overrides. This means the toggle works correctly inside an RTL context (e.g. wrapped in `dir="rtl"` or alongside the `uilibrary-rtl-layout` directive) with no additional styling required from the consumer.

### Why no `ChangeDetectionStrategy.OnPush`?

The component mutates `value` inside `handleChange()` and `writeValue()`. Without `markForCheck()` calls at those mutation points, `OnPush` would cause the checked state to not update visually after programmatic changes from a form control. The default change detection is used to avoid that class of subtle bug; the component is lightweight enough that the difference in performance is negligible.
