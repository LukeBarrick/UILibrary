# Input Directive

An attribute directive for the UI Library that connects any text-style `<input>` or `<textarea>` to `FormFieldComponent`'s floating-label and validation-state system. Implements Angular's `ControlValueAccessor` — works with both reactive and template-driven forms without additional configuration.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — template-driven binding](#basic-usage--template-driven-binding)
- [Basic usage — reactive form control](#basic-usage--reactive-form-control)
- [Basic usage — textarea](#basic-usage--textarea)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)
- [Troubleshooting](#troubleshooting)

---

## How it works

```
<input ui-input> / <textarea ui-input>
  │  Provides itself as UIFormFieldControl via forwardRef
  │
  ▼
FormFieldComponent locates it via @ContentChild(UIFormFieldControl)
  │
  ├─ Calls setID(uuid) → writes uuid to the element's id attribute
  │    └─ <label [for]="uuid"> is now semantically associated
  │
  └─ Subscribes to stateChanges
       │  (emitted on every input event, focus, blur, and writeValue())
       ▼
     FormFieldComponent.markForCheck()
       │
       ├─ [class.form-field-disabled]    ← control.disabled
       ├─ [class.form-field-label-float] ← control.shouldLabelFloat
       ├─ [class.form-field-errors]      ← control.hasErrors
       ├─ [class.form-field-touched]     ← control.touched
       └─ [class.form-field-dirty]       ← control.dirty
```

The directive is purely behavioural — it adds no shadow DOM or template of its own. All visual rendering (floating label, prefix/suffix slots, footer errors and hints) is handled by the wrapping `FormFieldComponent`.

---

## Setup

`InputModule` is already exported by `UserInterfaceLibraryModule`, so no additional import is required when using the full library.

To import in isolation, bring in both `InputModule` and `FormFieldModule` (they are separate modules and are almost always used together):

```typescript
import { InputModule } from 'uilibrary';
import { FormFieldModule } from 'uilibrary';

@NgModule({
  imports: [
    InputModule,
    FormFieldModule,
  ],
})
export class MyModule {}
```

---

## Basic usage — template-driven binding

Use `[(ngModel)]` for two-way binding. When the input is not inside a `<form>` or a `[formGroup]`, add `[ngModelOptions]="{ standalone: true }"`:

```html
<uilibrary-form-field>
  <label ui-label>Full name</label>
  <input ui-input type="text"
         [(ngModel)]="name"
         [ngModelOptions]="{ standalone: true }"
         placeholder="Enter your name">
</uilibrary-form-field>
```

```typescript
import { FormsModule } from '@angular/forms';

name: string = '';
```

> **Note:** `[ngModelOptions]="{ standalone: true }"` is required whenever the binding lives outside a form group. Omitting it inside a `[formGroup]` will throw a runtime error.

---

## Basic usage — reactive form control

Use `formControlName` inside a `[formGroup]`. The form-field automatically applies `form-field-errors` when the control is invalid. Add `[class.error]` for an alternative consumer-controlled error style:

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
});
```

```html
<form [formGroup]="form">
  <uilibrary-form-field
    [class.error]="form.get('email')?.invalid && form.get('email')?.touched">
    <label ui-label>Email address</label>
    <input ui-input type="email" formControlName="email">
  </uilibrary-form-field>
</form>
```

> **Note:** `form-field-errors` (auto-applied when `hasErrors` is true) and the `error` CSS class (applied manually by the consumer) are two independent mechanisms. Both can coexist — `form-field-errors` drives the library's built-in error styling, while `error` is available for additional consumer overrides.

To disable a control, use the `FormBuilder` disabled state rather than the `[disabled]` input:

```typescript
this.form = this.fb.group({
  reference: [{ value: 'AUTO-001', disabled: true }],
});
```

---

## Basic usage — textarea

`[ui-input]` works on `<textarea>` elements with identical form binding patterns:

```html
<uilibrary-form-field>
  <label ui-label>Comments</label>
  <textarea ui-input
            formControlName="comments"
            rows="4"
            placeholder="Enter your comments...">
  </textarea>
</uilibrary-form-field>
```

---

## Options reference

| Option | Type | Default | Description |
|---|---|---|---|
| `[disabled]` | `boolean` | `false` | Disables the native element via `Renderer2`. Prefer disabling through the reactive form control state where possible; this input is useful for template-driven scenarios. |

---

## API reference

### `InputModule`

NgModule that declares and exports the `InputComponent` directive. Import alongside `FormFieldModule`, or use `UserInterfaceLibraryModule` which re-exports both.

---

### `InputComponent` _(attribute directive — `[ui-input]`)_

Selector: `[ui-input]`  
Implements: `UIFormFieldControl<string>`, `ControlValueAccessor`, `OnDestroy`

> **Note:** The class is named `InputComponent` for historical reasons; it is a `@Directive` and should be treated as one. The public export name (`InputComponent`) matches what `public-api.ts` exposes.

**Consumer-facing members:**

| Member | Signature | Description |
|---|---|---|
| `[disabled]` | `@Input() boolean` | Sets the `disabled` property on the native element. |
| `focus()` | `() => void` | Programmatically focuses the native input element. |
| `setValue(value)` | `(value: string) => void` | Writes a value directly to the native element. Does not emit an Angular form change event. |

**`UIFormFieldControl` contract members (used by `FormFieldComponent`, not by consumers directly):**

| Member | Type | Description |
|---|---|---|
| `id` | `string` | UUID written to the element's `id` attribute by `setID()`. |
| `stateChanges` | `Subject<void>` | Emits on input, focus, blur, and `writeValue()`. Drives form-field re-render. |
| `shouldLabelFloat` | `boolean` | `true` when the control has a value or is focused. |
| `hasErrors` | `boolean` | `true` when the bound `NgControl` is invalid. |
| `hasFocus` | `boolean` | `true` while the native element has focus. |
| `touched` | `boolean` | Mirrors `NgControl.touched`. |
| `dirty` | `boolean` | Mirrors `NgControl.dirty`. |
| `disabled` | `boolean` (getter) | Reads `nativeElement.disabled`. |
| `setID(id)` | `(id: string) => void` | Called by `FormFieldComponent` to write the UUID as the element's `id`. |

---

## Technical decisions

### Why `UIFormFieldControl` instead of a direct `@ContentChild(InputComponent)` reference?

`[ui-input]` provides itself as `UIFormFieldControl` via `forwardRef`. This lets `FormFieldComponent` locate the inner control through `@ContentChild(UIFormFieldControl)` without importing or coupling to any specific control class. Any future custom control — a custom select, a datepicker input, or a third-party wrapper — can integrate with `FormFieldComponent` simply by implementing the abstract class and providing itself as `UIFormFieldControl`. No changes to `FormFieldComponent` are required.

### Why does `[ui-input]` work on both `<input>` and `<textarea>`?

The attribute selector is intentionally broad enough to cover all text-style host elements: `text`, `number`, `email`, `password`, `search`, `url`, `tel`, and `textarea`. Input types with their own discrete state model — `checkbox`, `radio`, `file`, and `range` — are explicitly excluded and are not supported through `[ui-input]`. Those controls have dedicated modules in this library.

### Why is the class named `InputComponent` when it is decorated as `@Directive`?

The name is a historical artifact from an earlier iteration of the module where it was conceived as a component. It functions as an attribute directive. Internally, `input.module.ts` imports it aliased as `InputDirective` to reflect its actual role, but the public export (`InputComponent`) has been kept stable to avoid a breaking change.

### WCAG gaps — known and planned for refactor

The directive currently addresses label-input association (WCAG 1.3.1 — Info and Relationships) through the UUID-based `setID()` call, which writes the input's `id` so the form-field label's `[for]` attribute can reference it. The following items are not yet implemented and are flagged for a future accessibility refactor:

- **`aria-invalid`** — the form-field applies `form-field-errors` via a CSS class, but the native `aria-invalid` attribute is not set on the input when the control is invalid.
- **`aria-describedby`** — hint and error messages rendered in the form-field footer are not linked to the input element.
- **Live region announcements** — validation state changes are not announced to screen readers.

Until these gaps are closed, consumers building WCAG AA-compliant forms should add the following attributes manually:

```html
<input ui-input type="text" formControlName="field"
       [attr.aria-invalid]="form.get('field')?.invalid && form.get('field')?.touched || null"
       [attr.aria-describedby]="form.get('field')?.invalid ? 'field-error' : null">
<!-- Error message element -->
<span id="field-error" *ngIf="form.get('field')?.invalid && form.get('field')?.touched">
  This field is required.
</span>
```

---

## Troubleshooting

### Label does not float / form-field state does not update

**Symptom:** The floating label stays in the placeholder position after the user types, or the form-field never reflects disabled/error state.  
**Cause:** `InputModule` is not imported, or the attribute is misspelled.  
**Fix:** Ensure `InputModule` (or `UserInterfaceLibraryModule`) is in the feature module's `imports` array. The attribute must be spelled `ui-input` (hyphen, not camelCase — `uiInput` will not match).

---

### `ngModel` value does not update

**Symptom:** The component property does not change when the user types.  
**Cause:** The input is inside a `[formGroup]`, but `[ngModelOptions]="{ standalone: true }"` is missing, causing Angular to look for a `formControlName` binding that does not exist.  
**Fix:** Add `[ngModelOptions]="{ standalone: true }"` when using `[(ngModel)]` inside a group, or switch to a `formControlName` reactive binding.

---

### Disabled state not reflected visually

**Symptom:** The `[disabled]="true"` binding has no effect on the rendered element.  
**Cause:** Angular treats `[disabled]` on a non-native element as a custom attribute; the `InputComponent` setter is what handles it.  
**Fix:** Ensure `InputModule` is imported so the directive is active. For reactive forms, prefer disabling through `FormBuilder`: `[{ value: '', disabled: true }]`.
