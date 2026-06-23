# Input Annotations

Three lightweight annotation components for form fields: a hint/error message, a required marker, and an info tooltip. Designed primarily for use inside `uilibrary-form-field` but usable anywhere in a template. The tooltip is currently built on ng-bootstrap's `ngbTooltip` directive — a migration to Angular CDK overlay is planned.

---

## Contents

- [Setup](#setup)
- [Basic usage — hint text](#basic-usage--hint-text)
- [Basic usage — required marker](#basic-usage--required-marker)
- [Basic usage — tooltip](#basic-usage--tooltip)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [SCSS utility classes](#scss-utility-classes)
- [Technical decisions](#technical-decisions)

---

## Setup

`InputAnnotationsModule` is already imported by `UserInterfaceLibraryModule`, so no additional module import is needed if you are using the full library.

To use the module on its own:

```typescript
import { InputAnnotationsModule } from 'uilibrary';

@NgModule({
  imports: [InputAnnotationsModule],
})
export class MyModule {}
```

> **Note:** `InputAnnotationsModule` depends on `NgbModule` (ng-bootstrap). Ensure `@ng-bootstrap/ng-bootstrap` is installed and that you are importing `NgbModule` (or at minimum the tooltip feature) somewhere in your application.

---

## Basic usage — hint text

Place `<uilibrary-hint>` below an input to display a helper or validation message. Set `variant="error"` for validation failures or `variant="normal"` for neutral help text (the default).

```html
<!-- Normal hint -->
<uilibrary-form-field>
  <label ui-label>Email address</label>
  <input ui-input type="email" />
  <uilibrary-hint>We will never share your email.</uilibrary-hint>
</uilibrary-form-field>

<!-- Validation error -->
<uilibrary-form-field>
  <label ui-label>Email address</label>
  <input ui-input type="email" />
  <uilibrary-hint variant="error">Please enter a valid email address.</uilibrary-hint>
</uilibrary-form-field>
```

> **Note:** The hint message is provided via content projection — place plain text or inline HTML directly between the opening and closing tags.

Toggling hints conditionally with `*ngIf` is the recommended way to show validation state:

```html
<uilibrary-hint variant="error" *ngIf="emailControl.invalid && emailControl.touched">
  Please enter a valid email address.
</uilibrary-hint>
```

---

## Basic usage — required marker

`<uilibrary-required>` renders a styled asterisk (`*`) to visually mark a field as mandatory. Place it directly after the label inside a `uilibrary-form-field`.

```html
<uilibrary-form-field>
  <label ui-label>Full name</label>
  <uilibrary-required></uilibrary-required>
  <input ui-input type="text" />
</uilibrary-form-field>
```

Use the `margin` input to control spacing when the asterisk sits next to other inline elements:

```html
<!-- Add space to the left of the asterisk -->
<uilibrary-required margin="left"></uilibrary-required>

<!-- Add space to both sides -->
<uilibrary-required margin="both"></uilibrary-required>
```

---

## Basic usage — tooltip

`<uilibrary-tooltip>` renders a circular `?` button that triggers an ng-bootstrap tooltip on hover or focus. Supply the tooltip's **title** and **body content** using the named projection slots `[title]` and `[content]`.

```html
<!-- Standalone tooltip -->
<uilibrary-tooltip placement="top">
  <span title>What is this?</span>
  <span content>This field is used to uniquely identify your account.</span>
</uilibrary-tooltip>
```

Because the slots accept arbitrary HTML, you can include rich content such as links or formatted text:

```html
<uilibrary-tooltip placement="bottom">
  <span title>Password requirements</span>
  <span content>Must be at least <strong>8 characters</strong> and include a number.</span>
</uilibrary-tooltip>
```

### Using as a form-field suffix

The most common usage is to attach a tooltip as a suffix icon on a form field:

```html
<uilibrary-form-field>
  <label ui-label>National Insurance number</label>
  <input ui-input type="text" />
  <uilibrary-tooltip ui-suffix placement="right" margin="left">
    <span title>Where to find this</span>
    <span content>Your NI number appears on your payslip or P60.</span>
  </uilibrary-tooltip>
</uilibrary-form-field>
```

> **Note:** The `placement` input is passed directly to ng-bootstrap's `ngbTooltip`. Valid values are: `top`, `bottom`, `left`, `right`, `auto`, and their `-start` / `-end` variants (e.g. `top-start`). Omitting `placement` lets ng-bootstrap choose the best position automatically.

---

## Options reference

### `HintComponent` inputs

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `variant` | `'normal' \| 'error'` | `'normal'` | Controls text colour. `'error'` uses the danger colour token; `'normal'` uses the dark-gray colour token. |

### `RequiredComponent` inputs

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `margin` | `'none' \| 'left' \| 'right' \| 'both'` | `'none'` | Adds inline spacing around the asterisk. Resolves to `.tooltip-margin-left`, `.tooltip-margin-right`, or `.tooltip-margin-both`. |

### `TooltipComponent` inputs

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `margin` | `'none' \| 'left' \| 'right' \| 'both'` | `'none'` | Adds inline spacing around the tooltip button. Same CSS classes as `RequiredComponent`. |
| `placement` | `string` | `''` | Tooltip placement passed to ng-bootstrap's `ngbTooltip`. Standard values: `top`, `bottom`, `left`, `right`, `auto`. Empty string lets ng-bootstrap decide. |

---

## API reference

### `HintComponent`

Selector: `uilibrary-hint`

| Member | Type | Description |
|--------|------|-------------|
| `variant` | `@Input() 'normal' \| 'error'` | Applies `.hint-normal` or `.hint-error` styling class. Default: `'normal'`. |
| _(content)_ | `ng-content` | The hint message. Accepts plain text or inline HTML. |

---

### `RequiredComponent`

Selector: `uilibrary-required`

| Member | Type | Description |
|--------|------|-------------|
| `margin` | `@Input() string` | Adds a spacing class to the wrapper div. Recognised values: `'left'`, `'right'`, `'both'`, `'none'`. Default: `'none'`. |

---

### `TooltipComponent`

Selector: `uilibrary-tooltip`

| Member | Type | Description |
|--------|------|-------------|
| `margin` | `@Input() string` | Adds a spacing class to the wrapper div. Recognised values: `'left'`, `'right'`, `'both'`, `'none'`. Default: `'none'`. |
| `placement` | `@Input() string` | Forwarded to ng-bootstrap's `ngbTooltip`. Controls which side the tooltip panel opens on. Default: `''`. |
| `[title]` slot | `ng-content select="[title]"` | Rendered as the bold title line inside the tooltip panel. |
| `[content]` slot | `ng-content select="[content]"` | Rendered as the body text inside the tooltip panel. |

---

### `InputAnnotationsModule`

| Declares | `HintComponent`, `RequiredComponent`, `TooltipComponent` |
|----------|-----------------------------------------------------------|
| Exports | `HintComponent`, `RequiredComponent`, `TooltipComponent` |
| Imports | `CommonModule`, `NgbModule` |

---

## SCSS utility classes

These classes are applied by the components internally. You do not need to apply them manually; they are listed here for reference when overriding styles.

### Hint

| Class | Element | Purpose |
|-------|---------|---------|
| `.hint-normal` | `div` inside `uilibrary-hint` | Normal helper text styling — `dark-gray` colour, 12 px. |
| `.hint-error` | `div` inside `uilibrary-hint` | Validation error styling — `danger` colour, 12 px. |

### Required

| Class | Element | Purpose |
|-------|---------|---------|
| `.required` | `div` inside `uilibrary-required` | Styles the asterisk: `danger` colour, bold, 25 px, superscript offset. |
| `.tooltip-margin-left` | Wrapper `div` | Adds `margin-inline-start: 15px`. |
| `.tooltip-margin-right` | Wrapper `div` | Adds `margin-inline-end: 15px`. |
| `.tooltip-margin-both` | Wrapper `div` | Adds `margin-inline: 15px`. |

### Tooltip

| Class | Element | Purpose |
|-------|---------|---------|
| `.tooltip-custom` | Wrapper `div` inside `uilibrary-tooltip` | Contains the trigger button. |
| `.tooltip-margin-left` | Wrapper `div` | Adds `margin-inline-start: 15px`. |
| `.tooltip-margin-right` | Wrapper `div` | Adds `margin-inline-end: 15px`. |
| `.tooltip-margin-both` | Wrapper `div` | Adds `margin-inline: 15px`. |

> **Note:** After any SCSS changes, run `npm run build-sass` to recompile `projects/uilibrary/assets/styles.css`.

---

## Technical decisions

### Why content projection for tooltip title and body instead of `@Input` strings?

The `[title]` and `[content]` projection slots were chosen over plain `@Input()` string properties to support **rich HTML content** inside the tooltip panel — for example, bold text, links, or formatted lists. If the content were an `@Input() string`, Angular's template binding would treat it as plain text and HTML tags would be escaped. Projection slots let consumers write arbitrary inline HTML between the tags without any sanitisation workaround.

### Why ng-bootstrap `ngbTooltip` rather than a custom implementation?

`ngbTooltip` was used as a pragmatic starting point because ng-bootstrap was already a dependency of the wider library. However, a **migration to Angular CDK overlay** is planned for this component. The CDK tooltip primitive will remove the hard dependency on ng-bootstrap for this module and provide better control over positioning, focus management, and accessibility attributes. Until the migration is complete, consumers should be aware that `InputAnnotationsModule` requires `NgbModule`.

### Why does the margin input share CSS class names with the Required and Tooltip components?

Both `RequiredComponent` and `TooltipComponent` use the same `.tooltip-margin-left / -right / -both` classes because they serve the same visual purpose — adding consistent inline spacing to small inline elements placed beside a label or input. Sharing the class names keeps the SCSS surface small; there is no semantic difference between a required marker needing space and a tooltip button needing space.
