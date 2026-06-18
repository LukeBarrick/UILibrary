# Checkboxes

A custom checkbox component for the UI Library. Built on Angular's `ControlValueAccessor` — works with reactive forms, `ngModel`, and direct `[checked]` binding without additional adapters.

---

## Contents

- [Setup](#setup)
- [Basic usage — variants and sizes](#basic-usage--variants-and-sizes)
- [Basic usage — form integration](#basic-usage--form-integration)
- [Basic usage — label control](#basic-usage--label-control)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)

---

## Setup

`CheckboxesModule` is included in `UserInterfaceLibraryModule`. If you import the full library module nothing extra is required. To use the module on its own:

```typescript
import { CheckboxesModule } from 'uilibrary';

@NgModule({
  imports: [CheckboxesModule],
})
export class MyModule {}
```

No services need to be injected. The component is self-contained.

---

## Basic usage — variants and sizes

Three colour variants are available, each in two sizes.

| Variant | Appearance |
|---|---|
| `branded` | Brand-coloured checkbox (default) |
| `pass` | Green checkbox with a tick icon — indicates approval |
| `fail` | Red checkbox with a cross icon — indicates danger or rejection |

```html
<!-- Default branded, small -->
<uilibrary-checkbox variant="branded">Accept terms</uilibrary-checkbox>

<!-- Approval variant, large -->
<uilibrary-checkbox variant="pass" size="large">Mark as approved</uilibrary-checkbox>

<!-- Danger variant -->
<uilibrary-checkbox variant="fail">Flag as rejected</uilibrary-checkbox>
```

> **Note:** The `pass` and `fail` variants display image icons for the checked state. These images are included in the compiled library output — no manual asset copying is required.

---

## Basic usage — form integration

### 1. Reactive forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-example',
  template: `
    <form [formGroup]="form">
      <uilibrary-checkbox variant="branded" formControlName="accepted">
        I accept the terms and conditions
      </uilibrary-checkbox>
    </form>
    <p>Value: {{ form.value | json }}</p>
  `
})
export class ExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ accepted: [false] });
  }
}
```

### 2. Template-driven (ngModel)

```html
<uilibrary-checkbox variant="branded" [(ngModel)]="isAccepted">
  I accept the terms and conditions
</uilibrary-checkbox>
<p>Accepted: {{ isAccepted }}</p>
```

### 3. Direct binding

Use `[checked]` and `[disabled]` when you control state externally and do not need a form:

```html
<uilibrary-checkbox variant="branded" [checked]="myValue" [disabled]="true">
  Read-only state
</uilibrary-checkbox>
```

> **Note:** `(valueChange)` template event binding is not available on this component. To react to state changes, use reactive forms (`formControlName`) or two-way `[(ngModel)]` binding.

---

## Basic usage — label control

### Label positioning

Labels render to the right of the checkbox by default. Pass `labelPosition="left"` to move the label to the left side.

```html
<!-- Default — label right -->
<uilibrary-checkbox variant="branded">Label on the right</uilibrary-checkbox>

<!-- Label left -->
<uilibrary-checkbox variant="branded" labelPosition="left">Label on the left</uilibrary-checkbox>
```

### Hidden label (accessibility)

Setting `[hideLabel]="true"` applies a `visually-hidden` class to the label element. The text remains in the DOM and is announced by screen readers but is not visible. **Always supply descriptive inner content even when hiding the label.**

```html
<uilibrary-checkbox [hideLabel]="true" variant="branded">
  Select all items in this row
</uilibrary-checkbox>
```

### Rich label content

Because the label is projected via `<ng-content>`, any HTML can be slotted between the component tags:

```html
<uilibrary-checkbox variant="branded">
  <strong>Priority</strong> <span class="badge text-bg-warning">!</span>
</uilibrary-checkbox>
```

---

## Options reference

| Option | Type | Default | Description |
|---|---|---|---|
| `variant` | `string` | `'branded'` | Visual style: `'branded'`, `'pass'` (green, tick icon), or `'fail'` (red, cross icon) |
| `size` | `string` | `'small'` | Checkbox size: `'small'` or `'large'` |
| `labelPosition` | `string` | `'right'` | Label side relative to the checkbox: `'right'` or `'left'` |
| `hideLabel` | `boolean` | `false` | Visually hides the label while keeping it accessible to screen readers |
| `checked` | `boolean` | `false` | Sets the checked state programmatically; delegates to the CVA `writeValue` |
| `disabled` | `boolean` | `false` | Disables the checkbox, preventing user interaction |

---

## API reference

### `CheckboxesModule`

The feature module that declares and exports `CheckboxComponent`. Imports `CommonModule` and `FormsModule` internally.

| Member | Description |
|---|---|
| `declarations` | `CheckboxComponent` |
| `exports` | `CheckboxComponent` |

---

### `CheckboxComponent`

Selector: `uilibrary-checkbox`

Implements `ControlValueAccessor` — compatible with `formControlName`, `ngModel`, and direct `[checked]` binding.

| Member | Signature / Type | Description |
|---|---|---|
| `variant` | `@Input() string` | Visual variant: `'branded'` · `'pass'` · `'fail'`. Default `'branded'`. |
| `size` | `@Input() string` | Checkbox size: `'small'` · `'large'`. Default `'small'`. |
| `labelPosition` | `@Input() string` | Label side: `'right'` · `'left'`. Default `'right'`. |
| `hideLabel` | `@Input() boolean` | When `true`, the label is hidden visually but remains in the DOM. Default `false`. |
| `checked` | `@Input() boolean` | Setter that delegates to `writeValue()`. Sets the checked state on the control. |
| `disabled` | `@Input() boolean` | Setter/getter. Disables the checkbox via `setDisabledState()`. |
| `id` | `string` (readonly) | Auto-generated UUID used to associate the `<label>` with the `<input>` for accessibility. |
| `value` | `boolean` | Current checked state of the control. |

---

## Technical decisions

### Why `ControlValueAccessor` instead of a simple `@Output()`?

Implementing `ControlValueAccessor` allows the component to participate natively in Angular's form system — both reactive (`FormControl` / `FormGroup`) and template-driven (`ngModel`) — without any adapter code from the consumer. A plain `@Output() change` emitter would have required consumers to manually synchronise form control values on every change.

### Why is the label provided via `<ng-content>` instead of an `@Input() label: string`?

Content projection lets consumers compose rich label content — HTML elements, icons, or other components can be slotted directly between the tags. A plain string input would have required `[innerHTML]` binding or wrapper elements to achieve the same flexibility, and would have introduced XSS risk without sanitisation.

### Why does the label remain in the DOM when `hideLabel` is `true`?

`visually-hidden` (Bootstrap's `.visually-hidden` utility) removes the element from the visual render while preserving it in the accessibility tree. If the label were removed from the DOM entirely, screen readers would have no text to announce for the checkbox — violating WCAG 2.1 Success Criterion 4.1.2 (Name, Role, Value).

### Why are `pass` / `fail` variant icons implemented as image assets rather than CSS or inline SVG?

The variants use `background-image` referencing `Tick.png` and `Cross.png` from the library's compiled asset bundle. This keeps the checked-state icon consistent across browsers without requiring base64-encoded SVG in SCSS or dynamic DOM injection. The assets ship with the library and require no setup from consumers.

### Why does the component generate its own UUID for the input `id`?

HTML accessibility requires the `<label>`'s `for` attribute to match the `<input>`'s `id`. Using `UUIDService.generate()` ensures each checkbox instance has a unique ID, preventing duplicate-ID issues when multiple checkboxes appear on the same page.

### Known limitations

- **No indeterminate state** — the component does not support `input.indeterminate`. If you need to represent a partial-selection state (e.g. "some items selected" in a list), you must implement this with a native `<input type="checkbox">` outside this component.
- **Designed for singular, boolean use** — this component represents one independent boolean value. If you need a group where only one option can be selected at a time, use the `radio` module (`uilibrary-radio-group`) instead.
- **No `(valueChange)` output** — `valueChange` is an internal `EventEmitter` and is not decorated with `@Output()`. Observe changes through reactive forms or `[(ngModel)]`.
