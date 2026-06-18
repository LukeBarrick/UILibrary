# FormField

A wrapper component for the UI Library that gives any control a floating label, prefix/suffix decorators, and form-validation state styling. Modelled on Angular CDK's `MatFormFieldControl` contract — no CDK dependency required.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — wrapping a built-in control](#basic-usage--wrapping-a-built-in-control)
- [Basic usage — prefix and suffix decorators](#basic-usage--prefix-and-suffix-decorators)
- [Basic usage — implementing a custom control](#basic-usage--implementing-a-custom-control)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)
- [Troubleshooting](#troubleshooting)

---

## How it works

```
Inner control emits stateChanges
  │
  ▼
FormFieldComponent subscriber calls ChangeDetectorRef.markForCheck()
  │
  ▼
Host class bindings re-evaluate
(form-field-disabled, form-field-label-float, form-field-errors, form-field-touched, form-field-dirty)
  │
  ▼
Template reflects current state
(floating label, prefix/suffix visibility, footer errors/hints)
```

On `AfterContentInit`, the form-field uses `@ContentChild(UIFormFieldControl)` to locate the projected control and subscribe to its `stateChanges` observable. It also calls `control.setID(uuid)` so the `<label [for]="uuid">` automatically associates with the inner input — consumers never manage IDs manually.

---

## Setup

`FormFieldModule` is already exported by `UserInterfaceLibraryModule`, so no additional import is needed when using the full library.

To use the form-field in isolation:

```typescript
import { FormFieldModule } from 'uilibrary';

@NgModule({
  imports: [FormFieldModule],
})
export class MyModule {}
```

---

## Basic usage — wrapping a built-in control

Place any library control inside `<uilibrary-form-field>` using the appropriate content-projection attributes.

```html
<uilibrary-form-field>
  <label ui-label>Email address</label>
  <input ui-input type="email" formControlName="email" />
  <span ui-error *ngIf="form.get('email')?.hasError('required')">Email is required</span>
</uilibrary-form-field>
```

The `ui-label` attribute projects the label into the slot linked to the auto-generated UUID. The `ui-input` attribute activates `InputComponent`, which implements `UIFormFieldControl`.

> **Note:** The `<label>` element must carry `ui-label` — not a manual `[for]` binding. The form-field assigns `[for]` automatically via a generated UUID shared with the inner control.

> **Note:** Display only one `[ui-error]` element at a time. Multiple visible error messages stack in the single-line footer row and push the content below down. Use `*ngIf` or `@if` to show exactly one error per validation state.

---

## Basic usage — prefix and suffix decorators

The form-field supports both icon/element decorators (always visible) and inline text decorators (visible only when the label is floated).

### Icon or element prefix / suffix

```html
<!-- Icon prefix -->
<uilibrary-form-field>
  <span ui-prefix class="my-icon-search"></span>
  <label ui-label>Search</label>
  <input ui-input type="search" [(ngModel)]="query" />
</uilibrary-form-field>

<!-- Element suffix -->
<uilibrary-form-field>
  <label ui-label>Amount</label>
  <input ui-input type="number" [(ngModel)]="amount" />
  <button ui-suffix type="button">Clear</button>
</uilibrary-form-field>
```

### Inline text prefix / suffix

Text prefixes and suffixes are only rendered when the label is in the floated (raised) position — i.e. the control has a value or focus.

```html
<!-- Currency prefix -->
<uilibrary-form-field>
  <div ui-text-prefix>£</div>
  <label ui-label>Price</label>
  <input ui-input type="text" [(ngModel)]="price" />
</uilibrary-form-field>

<!-- Unit suffix -->
<uilibrary-form-field>
  <label ui-label>Weight</label>
  <input ui-input type="text" [(ngModel)]="weight" />
  <div ui-text-suffix>kg</div>
</uilibrary-form-field>
```

> **Note:** Elements using `ui-text-prefix` or `ui-text-suffix` are hidden when the label has not yet floated. If the decorator must always be visible, use `ui-prefix` / `ui-suffix` instead.

---

## Basic usage — implementing a custom control

To project a custom component into `<uilibrary-form-field>`, it must:

1. Extend `UIFormFieldControl<T>`.
2. Implement Angular's `ControlValueAccessor`.
3. Provide itself as `UIFormFieldControl` via `forwardRef`.
4. Emit on `stateChanges` whenever internal state changes (value, touched, focused, disabled).

```typescript
import { Component, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { UIFormFieldControl } from 'uilibrary';
import { Subject } from 'rxjs';

@Component({
  selector: '[ui-input]', // must match a projection slot accepted by the form-field
  template: `...`,
  providers: [
    {
      provide: UIFormFieldControl,
      useExisting: forwardRef(() => MyControlComponent),
    },
  ],
})
export class MyControlComponent
  implements UIFormFieldControl<string>, ControlValueAccessor, OnDestroy {

  stateChanges = new Subject<void>();
  id = '';
  value: string | null = null;
  placeholder = '';
  empty = true;
  disabled = false;
  shouldLabelFloat = false;
  hasErrors = false;
  hasFocus = false;
  touched = false;
  dirty = false;
  ngControl!: NgControl;

  focus(): void { /* focus the native element */ }

  setValue(value: string | null): void {
    this.value = value;
    this.stateChanges.next();
  }

  setID(id: string): void {
    this.id = id;
    // assign to the native element if needed:
    // this.renderer.setAttribute(this.el.nativeElement, 'id', id);
  }

  // ControlValueAccessor
  writeValue(value: string): void { this.value = value; }
  registerOnChange(fn: any): void { /* store fn */ }
  registerOnTouched(fn: any): void { /* store fn */ }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}
```

> **Note:** The component selector must match one of the slots the form-field template projects: `[ui-input]`, `[ui-select]`, `uilibrary-date-range-input`, or `uilibrary-datepicker-input`. Elements with any other selector will be silently ignored.

---

## Options reference

| Option | Type | Default | Description |
|---|---|---|---|
| `labelFloatOverride` | `boolean \| undefined` | `undefined` | When `true`, forces the label into the permanently floated (raised) position regardless of the control's `shouldLabelFloat` value. Not intended for typical use — useful when a label must always appear above the input regardless of value, or in testing scenarios. |

---

## API reference

### FormFieldComponent

Selector: `uilibrary-form-field`

| Member | Type / Signature | Description |
|---|---|---|
| `labelFloatOverride` | `@Input() boolean \| undefined` | See [Options reference](#options-reference). |
| `focusControl()` | `() => void` | Programmatically focuses the projected inner control. Called internally on `mouseup`; may also be invoked by consumers. |

**Host CSS classes (applied automatically):**

| Class | Applied when |
|---|---|
| `form-field-disabled` | The inner control's `disabled` is `true` |
| `form-field-label-float` | `labelFloatOverride` is `true` OR the control's `shouldLabelFloat` is `true` |
| `form-field-errors` | The inner control's `hasErrors` is `true` |
| `form-field-touched` | The inner control's `touched` is `true` |
| `form-field-dirty` | The inner control's `dirty` is `true` |

**Content projection slots:**

| Attribute / selector | Description |
|---|---|
| `ui-label` | The field's floating label. `[for]` is set automatically via generated UUID. |
| `ui-input` | Primary control slot. The element must implement `UIFormFieldControl`. |
| `ui-select` | Alternative control slot for select-style controls implementing `UIFormFieldControl`. |
| `uilibrary-date-range-input` | Slot for `DateRangeInputComponent`. |
| `uilibrary-datepicker-input` | Slot for `DatePickerInputComponent`. |
| `ui-prefix` | Icon or element rendered to the left of the label/input; always visible. |
| `ui-text-prefix` | Inline text rendered to the left of the input; visible only when the label is floated. |
| `ui-suffix` | Icon or element rendered to the right of the label/input; always visible. |
| `ui-text-suffix` | Inline text rendered to the right of the input; visible only when the label is floated. |
| `ui-error` | Validation error message in the footer. Show only one at a time. |
| `ui-hint` | Helper text in the footer. |
| `ui-note` | Secondary note in the footer. |

---

### UIFormFieldControl\<T\>

Abstract base class and DI token. Extend this on any component or directive that acts as the inner control of a `<uilibrary-form-field>`.

| Member | Type | Description |
|---|---|---|
| `value` | `T \| string \| null` | Current value of the control. |
| `stateChanges` | `Observable<void>` | Emit whenever any state property changes so the form-field can trigger change detection. |
| `id` | `string` | Assigned by the form-field via `setID()`. |
| `placeholder` | `string` | Placeholder text shown inside the control. |
| `empty` | `boolean` | Whether the control currently has no value. |
| `ngControl` | `NgControl` | Angular reactive forms control reference. |
| `disabled` | `boolean` | Whether the control is disabled. |
| `shouldLabelFloat` | `boolean` | When `true`, the label moves to the raised position. Typically `true` when the control has a value or focus. |
| `hasErrors` | `boolean` | Whether the control has active validation errors. |
| `hasFocus` | `boolean` | Whether the control currently has focus. |
| `touched` | `boolean` | Whether the control has been interacted with (blurred at least once). |
| `dirty` | `boolean` | Whether the control's value has changed from its initial state. |
| `focus()` | `() => void` | Called by the form-field on `mouseup` to focus the inner native element. |
| `setValue(value)` | `(value: T \| null) => void` | Sets the control's value programmatically. |
| `setID(id)` | `(id: string) => void` | Called once by the form-field in `AfterContentInit` to pass the generated UUID for label association. |

---

### PrefixDirective

Selector: `[ui-prefix], [ui-text-prefix]`

Marks an element as the prefix of a form-field. Using `[ui-text-prefix]` (attribute with any or no value) sets `isText = true`, which moves the element into the inline text-prefix slot — visible only when the label is floated.

| Member | Type | Description |
|---|---|---|
| `isText` | `boolean` | `true` when the `[ui-text-prefix]` attribute is present. Set automatically; do not bind manually. |

---

### SuffixDirective

Selector: `[ui-suffix], [ui-text-suffix]`

Marks an element as the suffix of a form-field. Using `[ui-text-suffix]` sets `isText = true`, which moves the element into the inline text-suffix slot — visible only when the label is floated.

| Member | Type | Description |
|---|---|---|
| `isText` | `boolean` | `true` when the `[ui-text-suffix]` attribute is present. Set automatically; do not bind manually. |

---

### FormFieldModule

NgModule that exports `FormFieldComponent`, `PrefixDirective`, and `SuffixDirective`. Already re-exported by `UserInterfaceLibraryModule`.

---

## Technical decisions

### Why UIFormFieldControl is an abstract class rather than InjectionToken\<T\>

`UIFormFieldControl<T>` is modelled on Angular CDK's `MatFormFieldControl` — a design the team evaluated and wanted to own outright so the library remains 100% independent of CDK styling and can be themed entirely through Bootstrap and the repository's custom CSS. Using an abstract class rather than a plain `InjectionToken<T>` means implementors get stub method bodies (`focus()`, `setValue()`, `setID()`) that compile and do nothing by default, enforcing the contract at the TypeScript level while keeping the `extends` / `implements` syntax familiar to developers from OOP backgrounds such as C#. A bare `InjectionToken` would require each implementor to re-declare every member from scratch without compiler guidance.

### Why OnPush change detection is driven by a stateChanges observable

The form-field evaluates host CSS class bindings (`form-field-disabled`, `form-field-label-float`, etc.) based on the inner control's state. With the default change detection strategy, those bindings would re-evaluate on every change-detection cycle in the application. `ChangeDetectionStrategy.OnPush` restricts evaluation to explicit `markForCheck()` calls — triggered inside the `stateChanges` subscription. Controls must therefore emit on `stateChanges` whenever any piece of state that affects rendering changes:

- **On value change** — updates `shouldLabelFloat` and `dirty`.
- **On focus** — updates `hasFocus` and `shouldLabelFloat`.
- **On blur** — sets `touched`.
- **On disabled change** — updates `disabled`.

### Why label association uses an auto-generated UUID

Requiring consumers to supply matching `id` / `[for]` pairs on every form-field would be repetitive and error-prone, particularly in forms with many fields. The form-field generates a UUID via `self.crypto.randomUUID()`, binds it to `<label [for]>`, and passes it to the inner control via `control.setID(id)`. Consumers never handle IDs manually; the label association is always correct and unique.

### Why text prefix/suffix visibility is tied to shouldLabelFloat

A text decorator placed inline with the input (e.g. `£` or `kg`) would visually collide with a non-floated label that occupies the same vertical space inside the field. Hiding the text decorator until the label floats keeps the layout clean without overlapping content. Icon or element prefixes/suffixes (`ui-prefix`, `ui-suffix`) do not share that space and are always visible.

---

## Troubleshooting

**Label does not float / host classes are not updating**

The inner control is not emitting on `stateChanges` after a state change. Ensure the control calls `this.stateChanges.next()` on every value, focus, blur, and disabled state change.

---

**Content is not projected / inner control is not detected**

The projected element's selector must match one of the defined `ng-content` slots: `[ui-input]`, `[ui-select]`, `uilibrary-date-range-input`, or `uilibrary-datepicker-input`. Elements with any other selector are silently ignored by Angular's content projection. Add one of the accepted attributes to the element, or contact the library maintainers to add a new projection slot.

---

**Multiple error messages push page content down**

Only one `[ui-error]` element should be visible at a time. Use `*ngIf` or `@if` to show a single message per validation state (e.g. show `required` before `email`, never both simultaneously). Multiple visible errors each occupy their own line inside the single-line footer row and shift the content below them.

---

**Custom control does not receive its UUID / label [for] is not associated**

Ensure the control's `setID(id: string)` implementation applies the id to the underlying native element — for example:

```typescript
setID(id: string): void {
  this.id = id;
  this.renderer.setAttribute(this.el.nativeElement, 'id', id);
}
```

The form-field calls `setID` once in `AfterContentInit`. If the native element is created after that lifecycle hook (e.g. via a dynamic component), the call will have been missed and the association will not be made.
