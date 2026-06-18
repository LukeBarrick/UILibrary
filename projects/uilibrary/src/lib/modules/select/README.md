# SelectComponent

A dropdown select component for the UI Library. Wraps `@ng-select/ng-select` for feature-rich single and multi-select behaviour with custom or built-in item templates — no native `<select>` element is used.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — single select with custom template](#basic-usage--single-select-with-custom-template)
- [Basic usage — single select with default template](#basic-usage--single-select-with-default-template)
- [Basic usage — multi-select](#basic-usage--multi-select)
- [Basic usage — reactive forms](#basic-usage--reactive-forms)
- [Basic usage — searchable select](#basic-usage--searchable-select)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)
- [Troubleshooting](#troubleshooting)

---

## How it works

`SelectComponent` wraps `NgSelectComponent` from `@ng-select/ng-select`. On initialisation it registers itself as a `UIFormFieldControl`, enabling `uilibrary-form-field` to auto-associate the `<label>`, manage floating-label state, and surface validation errors — the same contract satisfied by `InputComponent` and the datepicker controls.

```
Consumer template ([(ngModel)] / formControlName)
  │
  ▼
SelectComponent  ──  ControlValueAccessor + UIFormFieldControl
  │  writeValue() / onChange() / onTouched()
  ▼
NgSelectComponent  (ng-select)
  │  (change) / (blur) / (focus) events
  ▼
SelectComponent: handleInput() → onChange(event) → onTouched()
  │
  ▼
stateChanges.next() → cdr.markForCheck()
  │
  ▼
UIFormFieldControl state propagated to uilibrary-form-field
```

`SelectWcagHelperDirective` is applied internally to the `<ng-select>` element. On `ngAfterViewInit` it patches `role`, `aria-label`, and `aria-expanded` attributes that ng-select omits, and installs a `MutationObserver` to re-apply patches as the DOM changes dynamically (e.g. when a selected item's clear button is rendered).

---

## Setup

`SelectModule` is already imported by `UserInterfaceLibraryModule`. No additional module import is needed when using the full library bundle.

If you are importing only the select module directly:

```typescript
import { SelectModule } from 'uilibrary';

@NgModule({
  imports: [SelectModule],
})
export class MyModule {}
```

`SelectModule` depends on `@ng-select/ng-select`. Install it if it is not already present:

```bash
npm install @ng-select/ng-select
```

The ng-select theme stylesheet must be included in your application. Add it to the `styles` array in `angular.json` or import it in your global stylesheet:

```css
@import "@ng-select/ng-select/themes/default.theme.css";
```

---

## Basic usage — single select with custom template

By default, `useCustomTemplate` is `true`. You must supply both a `#labelTemplate` (rendered inside the selection box) and an `#optionTemplate` (rendered for each dropdown option) as content children.

```typescript
import { Component } from '@angular/core';

interface Country {
  id: number;
  name: string;
}

@Component({ ... })
export class MyComponent {
  countries: Country[] = [
    { id: 1, name: 'United Kingdom' },
    { id: 2, name: 'Germany' },
    { id: 3, name: 'France' },
  ];

  selected: Country | null = null;
}
```

```html
<uilibrary-form-field>
  <label ui-label>Country</label>
  <uilibrary-select
    ui-select
    [(ngModel)]="selected"
    [items]="countries"
    placeholder="Select a country"
    [clearable]="true">
    <ng-template #labelTemplate let-item>
      <strong>{{ item.name }}</strong>
    </ng-template>
    <ng-template #optionTemplate let-item>
      <strong>{{ item.name }}</strong>
    </ng-template>
  </uilibrary-select>
</uilibrary-form-field>
```

> **Note:** When `useCustomTemplate` is `true` (the default), both `#labelTemplate` and `#optionTemplate` are required. Omitting either will log a warning in development mode. The templates are the recommended rendering approach — they let you control exactly how items appear in the selection box and in the dropdown list.

---

## Basic usage — single select with default template

Set `[useCustomTemplate]="false"` and provide `bindLabel` (the item property to display). Optionally set `bindValue` to bind a primitive property rather than the whole object.

```html
<uilibrary-form-field>
  <label ui-label>Country</label>
  <uilibrary-select
    ui-select
    [(ngModel)]="selectedId"
    [items]="countries"
    [useCustomTemplate]="false"
    bindLabel="name"
    bindValue="id"
    placeholder="Select a country"
    [clearable]="true">
  </uilibrary-select>
</uilibrary-form-field>
```

> **Note:** When `bindValue` is set, the bound value is the primitive property (e.g. `id`) rather than the full object. When `bindValue` is omitted, the entire object is bound.

---

## Basic usage — multi-select

Set `[multiple]="true"`. Use `[maxSelectedItems]` to cap how many items can be chosen simultaneously, and `[closeOnSelect]="false"` so the dropdown stays open while selecting.

```html
<uilibrary-form-field>
  <label ui-label>Countries</label>
  <uilibrary-select
    ui-select
    [(ngModel)]="selectedCountries"
    [items]="countries"
    [multiple]="true"
    [maxSelectedItems]="3"
    [closeOnSelect]="false"
    [useCustomTemplate]="false"
    bindLabel="name"
    placeholder="Select up to 3 countries"
    [clearable]="true">
  </uilibrary-select>
</uilibrary-form-field>
```

> **Note:** `compareWith` is only applied in single-select mode. Multi-select mode uses ng-select's internal identity tracking and does not forward the `compareWith` function.

---

## Basic usage — reactive forms

Use `formControlName` inside a `[formGroup]` binding. Error messages are projected with `ui-error`:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ ... })
export class MyComponent {
  form: FormGroup;

  countries = [
    { id: 1, name: 'United Kingdom' },
    { id: 2, name: 'Germany' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      country: [undefined, Validators.required],
    });
  }
}
```

```html
<form [formGroup]="form">
  <uilibrary-form-field>
    <label ui-label>Country</label>
    <uilibrary-select
      ui-select
      formControlName="country"
      [items]="countries"
      [useCustomTemplate]="false"
      bindLabel="name"
      placeholder="Select a country"
      [clearable]="true">
    </uilibrary-select>
    @if (form.get('country')?.hasError('required') && form.get('country')?.touched) {
      <span ui-error>Country is required</span>
    }
  </uilibrary-form-field>
</form>
```

---

## Basic usage — searchable select

Enable `[searchable]="true"` to allow the user to filter items by typing. Supply a `[searchFn]` to override the default ng-select filtering with custom matching logic:

```typescript
customSearchFn(term: string, item: { name: string; description: string }): boolean {
  const t = term.toLowerCase();
  return item.name.toLowerCase().includes(t) ||
         item.description.toLowerCase().includes(t);
}
```

```html
<uilibrary-form-field>
  <label ui-label>Service</label>
  <uilibrary-select
    ui-select
    [(ngModel)]="selectedService"
    [items]="services"
    [searchable]="true"
    [searchFn]="customSearchFn"
    placeholder="Type to search..."
    [clearable]="true">
    <ng-template #labelTemplate let-item>
      <strong>{{ item.name }}</strong>
    </ng-template>
    <ng-template #optionTemplate let-item>
      <strong>{{ item.name }}</strong><br />
      <small>{{ item.description }}</small>
    </ng-template>
  </uilibrary-select>
</uilibrary-form-field>
```

---

## Options reference

| Option | Type | Default | Description |
|---|---|---|---|
| `items` | `any[]` | — | Array of items to display in the dropdown. |
| `ariaLabel` | `string` | `''` | Explicit `aria-label` for the combobox. Falls back to `placeholder` when empty. |
| `loading` | `boolean` | `false` | Show a loading indicator inside the dropdown panel. |
| `loadingText` | `string` | `'Loading...'` | Text displayed while `loading` is `true`. |
| `multiple` | `boolean` | `false` | Allow selecting multiple items simultaneously. |
| `maxSelectedItems` | `number` | `1` | Maximum number of selectable items when `multiple` is `true`. |
| `hideSelected` | `boolean` | `false` | Hide already-selected items from the dropdown list. |
| `clearSearchOnAdd` | `boolean` | `true` | Clear the search input after an item is added (multi-select). |
| `readonly` | `boolean` | `false` | Render the control read-only without disabling it. |
| `placeholder` | `string` | `''` | Placeholder text shown when no item is selected. Also used as the fallback `aria-label`. |
| `notFoundText` | `string` | `'No options found.'` | Text shown when no items match the current search term. |
| `markFirst` | `boolean` | `false` | Pre-highlight the first item in the open dropdown list. |
| `clearOnBackspace` | `boolean` | `true` | Remove the last selected tag when Backspace is pressed (multi-select). |
| `clearable` | `boolean` | `false` | Show a clear button to deselect the current value. |
| `closeOnSelect` | `boolean` | `true` | Close the dropdown after selecting an item. Set to `false` for multi-select workflows. |
| `useCustomTemplate` | `boolean` | `true` | Use `#labelTemplate` / `#optionTemplate` content children for rendering. Set to `false` to use the built-in template with `bindLabel`. |
| `bindLabel` | `string` | `''` | Item property to display when `useCustomTemplate` is `false`. |
| `bindValue` | `string` | `''` | Item property to use as the bound value. When empty, the full object is bound. |
| `searchable` | `boolean` | `false` | Enable typed search filtering. |
| `searchFn` | `(term: string, item: any) => boolean` | `undefined` | Custom search predicate. Overrides ng-select's built-in filtering. |
| `trackByFn` | `(item: any) => any` | `undefined` | Function for tracking items by identity to optimise list rendering. |
| `virtualScroll` | `boolean` | `false` | Enable virtual scrolling for large item lists. |
| `inputAttrs` | `{ [key: string]: string }` | `{}` | Additional HTML attributes applied to the inner search `<input>`. |
| `onScroll` | `(end: any) => void` | `undefined` | Callback fired when the dropdown panel is scrolled. Useful for lazy-loading more items. |
| `scrollToEnd` | `() => void` | `undefined` | Callback fired when the user scrolls to the bottom of the dropdown. Useful for pagination. |
| `disabled` | `boolean` | `false` | Disable the control. Also controlled by the parent reactive form control's disabled state. |
| `compareWith` | `(a: any, b: any) => boolean` | `defaultCompareFn` | Equality function used in single-select mode to match the bound value against the `items` array. Default uses `JSON.stringify` — see [Technical decisions](#technical-decisions). |

---

## API reference

### SelectComponent

Selector: `uilibrary-select`  
Change detection: `OnPush`  
Implements: `UIFormFieldControl<any>`, `ControlValueAccessor`

#### Inputs

| Member | Type | Description |
|---|---|---|
| `items` | `any[]` | Items to populate the dropdown. |
| `ariaLabel` | `string` | Explicit aria-label for the combobox. |
| `loading` | `boolean` | Display a loading spinner. |
| `loadingText` | `string` | Text while loading. |
| `multiple` | `boolean` | Enable multi-select. |
| `maxSelectedItems` | `number` | Cap on selected items (multi-select). |
| `hideSelected` | `boolean` | Hide selected items from the list. |
| `clearSearchOnAdd` | `boolean` | Clear search input on item add. |
| `readonly` | `boolean` | Read-only state. |
| `placeholder` | `string` | Placeholder and fallback aria-label. |
| `notFoundText` | `string` | No-results message. |
| `markFirst` | `boolean` | Pre-highlight first option. |
| `clearOnBackspace` | `boolean` | Remove last tag on Backspace. |
| `clearable` | `boolean` | Show clear button. |
| `closeOnSelect` | `boolean` | Close dropdown on selection. |
| `useCustomTemplate` | `boolean` | Toggle custom vs. built-in template mode. |
| `bindLabel` | `string` | Property key for display label (default template). |
| `bindValue` | `string` | Property key for bound value (default template). |
| `searchable` | `boolean` | Enable search input. |
| `searchFn` | `(term, item) => boolean` | Custom search predicate. |
| `trackByFn` | `(item) => any` | Track-by function for list rendering. |
| `virtualScroll` | `boolean` | Enable virtual scrolling. |
| `inputAttrs` | `{ [key: string]: string }` | Extra attributes on the inner `<input>`. |
| `onScroll` | `(end: any) => void` | Scroll event callback. |
| `scrollToEnd` | `() => void` | Scroll-to-end callback. |
| `disabled` | `boolean` | Disable the control. |
| `compareWith` | `(a, b) => boolean` | Equality function for single-select value matching. |

#### Content children

| Template reference | Description |
|---|---|
| `#labelTemplate` | Template for the selected item label (shown in the selection box). Required when `useCustomTemplate` is `true`. |
| `#optionTemplate` | Template for each dropdown option. Required when `useCustomTemplate` is `true`. |

Both templates receive the item as the implicit context variable (`let-item`).

#### Public methods

| Member | Signature | Description |
|---|---|---|
| `focus()` | `() => void` | Programmatically focus the underlying ng-select element. |
| `setValue(value)` | `(value: any) => void` | Programmatically set the component's value. |

#### State properties (UIFormFieldControl)

| Member | Type | Description |
|---|---|---|
| `stateChanges` | `Subject<void>` | Emits whenever control state changes. Consumed by `uilibrary-form-field`. |
| `empty` | `boolean` | `true` when no value is selected. |
| `hasErrors` | `boolean` | `true` when the bound form control is invalid. |
| `touched` | `boolean` | `true` when the bound form control has been touched. |
| `shouldLabelFloat` | `boolean` | `true` when the form-field label should float above the input. |

---

### SelectModule

Declares and exports `SelectComponent`. Also declares `SelectWcagHelperDirective` and `CollapseDirective` for internal use — these are not part of the public API.

---

## Technical decisions

### Why ng-select?

`@ng-select/ng-select` was chosen for its feature richness. Virtual scrolling, multi-select, custom label/option templates, lazy-load scroll callbacks, and flexible `bindLabel` / `bindValue` binding all come built-in. Building equivalent behaviour from scratch or from Angular CDK primitives would require significant ongoing maintenance. The library pins to `^21.5.2`, which is the major version aligned with Angular 21.

### Why is `useCustomTemplate` true by default?

Consumers are expected to define their own label and option templates to match their domain objects and visual design. The built-in template (a plain text string from `bindLabel`) is provided for simple or prototyping scenarios only; it is not the primary usage pattern. Defaulting to `true` means the recommended, design-controlled approach is zero-configuration, while the simpler fallback is an explicit opt-out.

### Why does the default `compareWith` use JSON.stringify?

The default `defaultCompareFn` compares items by serialising both to JSON strings. This is a conservative fallback for cases where items are recreated on each data fetch, causing reference equality to always fail. It is a **known gap**: the comparison is sensitive to property key ordering, so two semantically identical objects whose keys appear in different insertion orders will compare as unequal.

**When binding complex objects, always provide an explicit `compareWith` function** based on a stable primary key:

```typescript
compareById = (a: Item, b: Item): boolean => a.id === b.id;
```

```html
<uilibrary-select [compareWith]="compareById" ...>
```

> **Note:** `compareWith` is forwarded only in single-select mode. It has no effect when `[multiple]="true"`.

### Why is the WCAG directive applied internally?

`SelectWcagHelperDirective` is applied to the `<ng-select>` element inside `SelectComponent`'s own template so that all usages automatically receive the accessibility patches without any consumer action. The directive addresses several known issues in the version of ng-select currently in use: missing `role="button"` on the clear and toggle elements, absent `aria-label` attributes, and `aria-expanded` not being set on initial render. A `MutationObserver` is used to re-apply patches when the DOM updates dynamically.

**Known accessibility gap:** Dropdown options are not reachable via the Tab key — only arrow-key navigation is supported. This is a limitation intrinsic to ng-select's internal rendering and cannot be resolved with DOM attribute patches alone.

### Why OnPush change detection?

`ChangeDetectionStrategy.OnPush` restricts re-rendering to input changes and explicit `cdr.markForCheck()` calls (triggered via `stateChanges`). This reduces unnecessary re-renders in form-heavy screens where many controls coexist.

### Why forwardRef in the UIFormFieldControl provider?

The component provides itself as `UIFormFieldControl` via `forwardRef(() => SelectComponent)`. This breaks the circular reference that would otherwise occur because `UIFormFieldControl` is referenced in the provider metadata before `SelectComponent`'s class body is fully evaluated.

---

## Troubleshooting

### Console warning: "using a select field with a custom template but providing no templateRef"

**Symptom:** A `console.warn` appears in development mode.  
**Cause:** `useCustomTemplate` is `true` (the default) but neither `#labelTemplate` nor `#optionTemplate` was supplied as a content child.  
**Fix:** Add both templates inside `uilibrary-select`, or set `[useCustomTemplate]="false"` and provide `bindLabel`.

---

### Selected value is not pre-selected in the dropdown

**Symptom:** A value is set (via `ngModel` or a form control preset) but the dropdown does not show it as selected.  
**Cause:** The default `compareWith` uses `JSON.stringify`, which is sensitive to property key ordering. If the bound object's keys are in a different order than the matching item in the `items` array, they will not compare as equal.  
**Fix:** Provide a `compareWith` function based on a stable identifier:

```typescript
compareById = (a: Item, b: Item): boolean => a.id === b.id;
```

---

### Dropdown options are not reachable via the Tab key

**Symptom:** Keyboard users cannot tab through dropdown options; only arrow keys work inside the open panel.  
**Cause:** This is a known limitation of `@ng-select/ng-select`. The directive cannot resolve it because it is a behaviour intrinsic to ng-select's internal rendering, not a missing DOM attribute.  
**Workaround:** None available at the component level. Arrow-key navigation is the supported keyboard pattern for selecting dropdown options.
