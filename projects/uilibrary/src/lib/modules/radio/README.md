# Radio Button & Group

A pair of components for single-selection radio button interfaces. Built on Angular's `ControlValueAccessor` for seamless reactive- and template-driven form integration — no native `name`-attribute grouping required.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — standalone buttons](#basic-usage--standalone-buttons)
- [Basic usage — reactive form](#basic-usage--reactive-form)
- [Basic usage — template-driven form](#basic-usage--template-driven-form)
- [Basic usage — dynamic options](#basic-usage--dynamic-options)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)
- [Troubleshooting](#troubleshooting)

---

## How it works

```
User clicks uilibrary-radio-button
  │
  ▼
button.check()
  ├─ sets button.checked = true
  └─ emits checkedChange
        │
        ▼
RadioGroupComponent subscription (per button, managed via $cancelButtonSubs Subject)
  ├─ sets all sibling buttons.checked = false
  ├─ sets clicked button.checked = true
  ├─ calls onChange(value)     ← notifies Angular forms control
  └─ calls onTouched()

Angular forms layer
  │
  ├─ (Reactive)  ngControl.control.valueChanges → syncs checked states to external patch
  └─ (Template)  writeValue() → this.value → updateRadioButtons() → syncs checked states
```

`RadioGroupComponent` discovers its child buttons via `@ContentChildren(RadioButtonComponent)`.
When the `QueryList` changes (dynamic options), all subscriptions are torn down and rebuilt via the `$cancelButtonSubs` Subject.

---

## Setup

`RadioModule` is already included in `UserInterfaceLibraryModule`. If you are importing modules individually:

```typescript
import { RadioModule } from 'uilibrary';

@NgModule({
  imports: [RadioModule],
})
export class MyModule {}
```

No service injection is required — both components are used entirely in templates.

---

## Basic usage — standalone buttons

Use `uilibrary-radio-button` on its own when you need a single toggleable radio input with two-way binding, independent of a group.

```html
<!-- Static checked state -->
<uilibrary-radio-button [value]="1" [checked]="false">Option A</uilibrary-radio-button>
<uilibrary-radio-button [value]="2" [checked]="true">Option B</uilibrary-radio-button>
<uilibrary-radio-button [value]="3" [disabled]="true">Disabled option</uilibrary-radio-button>

<!-- Two-way binding -->
<uilibrary-radio-button [value]="1" [(checked)]="isChecked">My option</uilibrary-radio-button>
```

> **Note:** Standalone buttons do not communicate with each other. If you need mutual exclusion, wrap them in `uilibrary-radio-group`.

---

## Basic usage — reactive form

Wrap `uilibrary-radio-button` elements inside `uilibrary-radio-group` and bind via `formControlName`.

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
})
export class MyFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      colour: ['blue', Validators.required],
    });
  }
}
```

```html
<form [formGroup]="form">
  <uilibrary-radio-group formControlName="colour">
    <uilibrary-radio-button value="red">Red</uilibrary-radio-button>
    <uilibrary-radio-button value="blue">Blue</uilibrary-radio-button>
    <uilibrary-radio-button value="green">Green</uilibrary-radio-button>
  </uilibrary-radio-group>
</form>

<p>Selected: {{ form.get('colour')?.value }}</p>
```

To set the value programmatically:

```typescript
this.form.patchValue({ colour: 'green' });
```

---

## Basic usage — template-driven form

Bind with `ngModel` for simpler template-driven scenarios.

```html
<uilibrary-radio-group [(ngModel)]="selectedOption" [ngModelOptions]="{ standalone: true }">
  <uilibrary-radio-button value="option-a">Option A</uilibrary-radio-button>
  <uilibrary-radio-button value="option-b">Option B</uilibrary-radio-button>
  <uilibrary-radio-button value="option-c">Option C</uilibrary-radio-button>
</uilibrary-radio-group>

<p>Selected: {{ selectedOption }}</p>
```

```typescript
selectedOption: string = 'option-a';
```

---

## Basic usage — dynamic options

Because `RadioGroupComponent` uses `@ContentChildren`, it automatically re-subscribes when the projected `QueryList` changes — `*ngFor` is fully supported.

```html
<uilibrary-radio-group [(ngModel)]="selected" [ngModelOptions]="{ standalone: true }">
  <uilibrary-radio-button
    *ngFor="let opt of options"
    [value]="opt.value"
  >
    {{ opt.label }}
  </uilibrary-radio-button>
</uilibrary-radio-group>
```

```typescript
options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];
selected = 'a';
```

> **Note:** Adding or removing options at runtime causes the group to rebuild all internal subscriptions. The currently selected value is preserved as long as its corresponding button still exists.

---

## Options reference

### RadioButtonComponent

| Option | Type | Default | Description |
|---|---|---|---|
| `value` | `any` | — | The value associated with this button. The group compares this against its own `value` to determine which button is checked. |
| `checked` | `boolean \| undefined` | `undefined` | Whether this button is currently checked. Supports two-way binding via `[(checked)]`. Managed automatically by the parent group. |
| `disabled` | `boolean` | `false` | Prevents the button from being interacted with. The parent group can override this via its own `disabled` input. |
| `labelPosition` | `'left' \| 'right'` | `'left'` | Controls whether the label appears before (`'left'`) or after (`'right'`) the radio input element using CSS flex ordering. |

### RadioGroupComponent

| Option | Type | Default | Description |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Propagates a disabled state to all child `RadioButtonComponent` instances. Also responds to `setDisabledState` from the Angular forms layer. |

---

## API reference

### `RadioModule`

NgModule that declares and exports both `RadioButtonComponent` and `RadioGroupComponent`. Import this (or `UserInterfaceLibraryModule`) in your consuming module.

---

### `RadioButtonComponent`

**Selector:** `uilibrary-radio-button`

| Member | Signature / Type | Description |
|---|---|---|
| `id` | `string` | Auto-generated UUID. Used as the `for`/`id` pair linking the `<label>` to the `<input>`. |
| `value` | `@Input() any` | The value this button represents. |
| `checked` | `@Input() boolean \| undefined` | Current checked state. Supports `[(checked)]` two-way binding. |
| `checkedChange` | `@Output() EventEmitter<boolean>` | Emitted when the button is clicked and not disabled. The parent group subscribes to this internally. |
| `disabled` | `@Input() boolean` | Disables the button. |
| `labelPosition` | `@Input() 'left' \| 'right'` | Flex order of the label relative to the input. Defaults to `'left'`. |
| `check()` | `(): void` | Sets `checked = true` and emits `checkedChange`. No-ops when disabled. |
| `checkChanged()` | `(): void` | Emits `checkedChange` without setting `checked`. Called on native `change` events. |

---

### `RadioGroupComponent`

**Selector:** `uilibrary-radio-group`

Implements `ControlValueAccessor` — compatible with both `formControlName` and `ngModel`.

| Member | Signature / Type | Description |
|---|---|---|
| `disabled` | `@Input() set disabled(v: boolean)` | Propagates the disabled state to all child buttons via a deferred `setTimeout`. |
| `value` | `any` | The currently selected value. Synced from the forms layer via `writeValue()` or from child button clicks. |
| `ngControl` | `NgControl` (injected, optional) | The bound `NgControl` from the forms layer. Injected with `@Optional() @Self()`. |

---

## Technical decisions

### Why a custom ControlValueAccessor instead of Angular's built-in RadioControlValueAccessor?

Angular ships `RadioControlValueAccessor` in `@angular/forms`, which handles radio group binding using matched `name` attributes across individual inputs. This module evolved organically before the built-in was considered. The custom CVA coordinates the group entirely through `@ContentChildren` subscriptions rather than `name`-based DOM coupling, which better fits the content-projection model (`<uilibrary-radio-group>` wrapping arbitrary projected buttons). A future refactor could adopt or wrap the built-in if the API surface allows.

### Why ContentChildren subscriptions instead of a shared service or event bubbling?

The group must know which child button was selected and then uncheck all others. Using `@ContentChildren(RadioButtonComponent)` gives direct access to each child's `checkedChange` output. The `$cancelButtonSubs` Subject acts as a teardown signal — when the `QueryList` changes (buttons added or removed), all previous subscriptions are cancelled and rebuilt. This avoids memory leaks from stale subscriptions to destroyed button instances.

### Why setTimeout in ngAfterContentInit and the disabled setter?

Both `setTimeout(() => {}, 0)` calls are deliberate workarounds for `ExpressionChangedAfterItHasBeenCheckedError`. Angular's change detection has already run for the current cycle when `ngAfterContentInit` fires, so mutating child component properties directly would throw in development mode. Deferring to the next microtask avoids this.

A cleaner alternative is to inject `ChangeDetectorRef` and call `markForCheck()` or `detectChanges()` after updating children, which avoids the indirection of `setTimeout`. This is a known improvement candidate.

### Why labelPosition for WCAG 2.0?

The `labelPosition` input flips the CSS `order` of the label and input elements within the flex row. This ensures the `<label>` always appears before or after the `<input>` in the visual layout without changing DOM order. Keeping the DOM order consistent (label before input) satisfies WCAG 2.0 Success Criterion 1.3.2 (Meaningful Sequence) and ensures screen readers always announce the label before the control.

---

## Troubleshooting

### Checked state does not update when the form control is patched programmatically

**Symptom:** Calling `patchValue()` or `setValue()` updates the form model but the radio buttons do not visually reflect the new selection.

**Root cause:** `RadioGroupComponent.ngOnInit` subscribes to `ngControl.control.valueChanges`. If the component was initialised without a bound `ngControl` (e.g. the group is not inside a `formGroup` or does not have an `ngModel`), this subscription is never set up.

**Fix:** Ensure `uilibrary-radio-group` is bound to a form control via `formControlName` or `[(ngModel)]`. If using `ngModel` outside a form, include `[ngModelOptions]="{ standalone: true }"`.

---

### Disabling the group does not affect already-rendered buttons on initial load

**Symptom:** Passing `[disabled]="true"` on the group at initialisation leaves the buttons enabled.

**Root cause:** The `disabled` setter defers propagation via `setTimeout`. If Angular renders the group with `disabled = true` before `ngAfterContentInit` has run (i.e. before `radioButtons` is populated), the `forEach` loop iterates over an empty `QueryList`.

**Fix:** Set the disabled state after the view has initialised, or manage per-button `[disabled]` bindings individually.

---

### No keyboard arrow-key navigation between options

**Symptom:** Pressing the arrow keys while focused on a radio button does not move focus or selection to the next button.

**Root cause:** This is a known limitation. Native browser arrow-key navigation for radio groups requires all `<input type="radio">` elements to share the same `name` attribute. This library does not set a shared `name`, so the browser's built-in radio grouping is not activated.

**Workaround:** If keyboard navigation is required, implement it in the consuming component using a `(keydown)` handler, or use a different component (e.g. a styled select or listbox).

---

### The unused RadioControlValueAccessor import

`RadioControlValueAccessor` is imported in `group.component.ts` but not used. This is a residual import — it can be safely removed without affecting behaviour.
