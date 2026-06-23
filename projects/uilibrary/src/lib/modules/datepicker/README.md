# Datepicker

A single-date and date-range picker for the UI Library. Built on `date-fns` for locale-aware date parsing and formatting — no native date input quirks or third-party picker overlay required.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — single date picker](#basic-usage--single-date-picker)
- [Basic usage — programmatic open / close](#basic-usage--programmatic-open--close)
- [Basic usage — date range picker](#basic-usage--date-range-picker)
- [Basic usage — custom selection strategy](#basic-usage--custom-selection-strategy)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)
- [Troubleshooting](#troubleshooting)

---

## How it works

### Single date picker

```
User types in text input
  │
  ▼
DatePickerInputComponent.onInput()
  │  date-fns parse() with locale 'P' format
  ▼
Valid Date?
  ├─ Yes → writeValue() → onChange() → form control updated
  │         calendar selection synced via addDateToCalendar()
  └─ No  → raw string propagated to form control (triggers validation)

User clicks calendar day
  │
  ▼
CalendarComponent emits (dateSelected)
  │
  ▼
DatePickerInputComponent.dateSelected()
  │  writeValue() → onChange() → form control updated
  ▼
closeOnSelection=true → calendar closes
```

### Date range picker

```
Native <input startDate> or <input endDate> receives input
  │
  ▼
DateInputDirective.onInput()
  │  date-fns parse() with locale 'P' format
  ▼
Valid Date → onChange() → startDate / endDate form control updated
  │
  ▼
DateRangeInputComponent (subscribed via valueChanges)
  │  syncs selected dates array → calendar highlight updated
  ▼

User clicks calendar day
  │
  ▼
CalendarComponent emits (dateSelected)
  │
  ▼
DateRangeInputComponent.dateSelected()
  │  DateSelectionStrategy.calculateSelection(picked, currentRange)
  ▼
nextRange → start / end form controls updated individually
  │
  ▼
Both dates set + closeOnSelection=true → calendar closes
```

---

## Setup

`DatepickerModule` is already included in `UserInterfaceLibraryModule`, so no additional import is needed when using the full library.

For cherry-picked imports, add `DatepickerModule` to your feature module. The `FormModule` (template-driven) or `ReactiveFormsModule` (reactive forms) must also be imported in whichever module uses the pickers.

```typescript
import { DatepickerModule } from 'uilibrary';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [DatepickerModule, ReactiveFormsModule],
})
export class MyFeatureModule {}
```

> **Note:** `DatepickerModule` depends on `IconModule` internally for the calendar navigation chevrons. Both are included in `UserInterfaceLibraryModule`; if cherry-picking, `IconModule` is pulled in transitively and does not need to be imported separately.

---

## Basic usage — single date picker

Wrap `uilibrary-datepicker-input` inside `uilibrary-form-field` to get a floating label, validation error state, and consistent layout.

### Template-driven (ngModel)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent {
  departureDate: Date | null = null;
}
```

```html
<uilibrary-form-field>
  <label ui-label>Departure date</label>
  <uilibrary-datepicker-input [(ngModel)]="departureDate"></uilibrary-datepicker-input>
</uilibrary-form-field>

<p>Selected: {{ departureDate }}</p>
```

### Reactive forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({ ... })
export class BookingComponent {
  form = this.fb.group({
    departureDate: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}
}
```

```html
<form [formGroup]="form">
  <uilibrary-form-field>
    <label ui-label>Departure date</label>
    <uilibrary-datepicker-input formControlName="departureDate"></uilibrary-datepicker-input>
  </uilibrary-form-field>
</form>
```

> **Note:** The form control value is a `Date` object when the user selects from the calendar or types a valid locale-formatted date. If the typed string cannot be parsed it is propagated as a raw string, which will fail `Validators.required` and any type-guard check on the value.

---

## Basic usage — programmatic open / close

Expose a template reference variable on the component and call `open()` or `close()` from any external trigger (button, icon, etc.).

```html
<uilibrary-form-field>
  <label ui-label>Event date</label>
  <uilibrary-datepicker-input #datePicker formControlName="eventDate"></uilibrary-datepicker-input>
  <uilibrary-icon ui-suffix name="calendar" size="small"
    (click)="datePicker.open()" style="cursor: pointer;">
  </uilibrary-icon>
</uilibrary-form-field>

<button type="button" (click)="datePicker.open()">Pick a date</button>
<button type="button" (click)="datePicker.close()">Close calendar</button>
```

> **Note:** `open()` on `DatePickerInputComponent` also focuses the underlying text input so keyboard users can begin typing immediately.

---

## Basic usage — date range picker

`uilibrary-date-range-input` projects two native `<input>` elements marked with the `startDate` and `endDate` attribute directives. Each input binds to its own form control.

### Template-driven

```html
<uilibrary-form-field>
  <label ui-label>Stay</label>
  <uilibrary-date-range-input>
    <input startDate [(ngModel)]="checkIn" [ngModelOptions]="{ standalone: true }" placeholder="Check-in" />
    <input endDate   [(ngModel)]="checkOut" [ngModelOptions]="{ standalone: true }" placeholder="Check-out" />
  </uilibrary-date-range-input>
</uilibrary-form-field>
```

### Reactive forms

```typescript
form = this.fb.group({
  checkIn:  [null, Validators.required],
  checkOut: [null, Validators.required],
});
```

```html
<form [formGroup]="form">
  <uilibrary-form-field>
    <label ui-label>Stay</label>
    <uilibrary-date-range-input>
      <input startDate formControlName="checkIn"  />
      <input endDate   formControlName="checkOut" />
    </uilibrary-date-range-input>
  </uilibrary-form-field>
</form>
```

> **Note:** The `startDate` and `endDate` directives implement `ControlValueAccessor`, so each input participates in the form model independently. `DateRangeInputComponent` coordinates them via its shared `DateSelectionStrategy`, but each control's value is always an individual `Date | null`.

### Keeping the calendar open after selection

Set `[closeOnSelection]="false"` when users need to review or adjust the range after picking:

```html
<uilibrary-date-range-input [closeOnSelection]="false" #rangeRef>
  <input startDate formControlName="checkIn"  />
  <input endDate   formControlName="checkOut" />
</uilibrary-date-range-input>

<button (click)="rangeRef.close()">Done</button>
```

---

## Basic usage — custom selection strategy

The default strategy (`DefaultDateSelectionStrategy`) fills the start date first, then the end date, and re-places the boundary closest to the newly picked day when both are already set. To replace it, extend `DateSelectionStrategy` and provide it in your module.

```typescript
import { Injectable } from '@angular/core';
import { DateSelectionStrategy, DateRange } from 'uilibrary';

@Injectable()
export class SingleClickStrategy extends DateSelectionStrategy {
  calculateSelection(value: Date | null, current: DateRange): DateRange {
    // Always overwrite start; clear end so a fresh range begins
    return { start: value, end: null };
  }
}
```

```typescript
import { DatepickerModule, DateSelectionStrategy } from 'uilibrary';

@NgModule({
  imports: [DatepickerModule],
  providers: [
    { provide: DateSelectionStrategy, useClass: SingleClickStrategy }
  ],
})
export class MyFeatureModule {}
```

> **Note:** The provider is scoped to the module in which it is declared. Provide it in a lazy-loaded module to override the strategy for only that feature; provide it in `AppModule` to apply globally.

---

## Options reference

### `DatePickerInputComponent`

| Option | Type | Default | Description |
|---|---|---|---|
| `closeOnSelection` | `boolean` | `true` | Close the calendar popup when the user picks a date. Set to `false` to keep it open. |
| `editable` | `boolean` | `false` | Reserved for future use — not currently wired in the template. |

### `DateRangeInputComponent`

| Option | Type | Default | Description |
|---|---|---|---|
| `closeOnSelection` | `boolean` | `true` | Close the calendar popup once both start and end dates are selected. |
| `editable` | `boolean` | `true` | Reserved for future use — not currently wired in the template. |

### `CalendarComponent`

| Option | Type | Default | Description |
|---|---|---|---|
| `selecteDates` | `Date[] \| Date \| undefined` | `undefined` | One or two `Date` values to highlight. Pass a single `Date` for a single picker; pass a two-element array `[start, end]` to highlight a range. |

---

## API reference

### `DatePickerInputComponent`

Selector: `uilibrary-datepicker-input`

Implements `ControlValueAccessor` — use with `ngModel` or `formControlName`.

| Member | Signature | Description |
|---|---|---|
| `open()` | `() => void` | Opens the calendar and focuses the text input. |
| `close()` | `() => void` | Closes the calendar. |
| `closeOnSelection` | `@Input() boolean` | See Options reference. |
| `editable` | `@Input() boolean` | See Options reference. |

---

### `DateRangeInputComponent`

Selector: `uilibrary-date-range-input`

Coordinates two projected `DateInputDirective` children (`startDate` and `endDate`). Does not implement `ControlValueAccessor` itself — each projected input binds independently.

| Member | Signature | Description |
|---|---|---|
| `open()` | `() => void` | Opens the calendar; focuses the first unfilled input. |
| `close()` | `() => void` | Closes the calendar. |
| `closeOnSelection` | `@Input() boolean` | See Options reference. |
| `editable` | `@Input() boolean` | See Options reference. |

---

### `CalendarComponent`

Selector: `uilibrary-calendar-select`

A standalone calendar grid. Used internally by both pickers but also exported so consumers can embed it directly.

| Member | Signature | Description |
|---|---|---|
| `selecteDates` | `@Input() Date[] \| Date \| undefined` | Highlighted date(s). |
| `dateSelected` | `@Output() EventEmitter<Date>` | Emits the `Date` the user clicked. |

---

### `DateInputDirective`

Selector: `[ui-date-input]`

A `ControlValueAccessor` directive applied to a native `<input>` element. Parses typed text using `date-fns` `'P'` format (locale-aware short date). Used directly or via the `startDate` / `endDate` sub-directives.

| Member | Signature | Description |
|---|---|---|
| `disabled` | `@Input() boolean` | Disables the underlying input. |
| `value` | `Date \| string \| null` | Current internal value. |

---

### `StartDateDirective`

Selector: `[startDate]`  
Extends `DateInputDirective`. Use on the first `<input>` inside `uilibrary-date-range-input`.

---

### `EndDateDirective`

Selector: `[endDate]`  
Extends `DateInputDirective`. Use on the second `<input>` inside `uilibrary-date-range-input`.

---

### `DateSelectionStrategy`

Abstract class used as a DI token. Extend and provide to customise how calendar clicks update the date range.

| Member | Signature | Description |
|---|---|---|
| `calculateSelection()` | `(value: Date \| null, current: DateRange) => DateRange` | Given a newly clicked date and the current range, return the next range state. |

---

### `DateRange`

```typescript
export interface DateRange {
  start: Date | null;
  end: Date | null;
}
```

---

### `DatepickerModule`

| Declares | `DatePickerInputComponent`, `DateRangeInputComponent`, `CalendarComponent`, `StartDateDirective`, `EndDateDirective`, `DateInputDirective` |
|---|---|
| Exports | All declarations |
| Provides | `{ provide: DateSelectionStrategy, useClass: DefaultDateSelectionStrategy }` |
| Imports | `CommonModule`, `FormsModule`, `IconModule` |

---

## Technical decisions

### Why `DateSelectionStrategy` is an abstract class rather than `InjectionToken<T>`

The pattern is consistent with `UIFormFieldControl<T>` used throughout this library (itself modelled on Angular CDK's `MatFormFieldControl`). Using an abstract class means:

- TypeScript enforces the contract at compile time — implementors receive a clear compile error if `calculateSelection` is missing.
- The token and the type are the same symbol, so consumers write `{ provide: DateSelectionStrategy, useClass: MyStrategy }` without a separate import for an `InjectionToken`.
- Stub method bodies can be added in future without a breaking change to implementors.

The trade-off is that the abstract class must be importable at runtime. `DateSelectionStrategy` is exported via `public-api.ts` for this reason.

### Why `date-fns` handles all date parsing and formatting

Date manipulation across `DatePickerInputComponent`, `DateRangeInputComponent`, and `DateInputDirective` uses `format`, `parse`, `isAfter`, `isBefore`, and `isSameDay` from `date-fns`.

- **Locale-aware `'P'` format** — the short date format (`dd/MM/yyyy` in `en-GB`, `MM/dd/yyyy` in `en-US`, etc.) is resolved by `DateFnsLocaleService`, which bridges Angular's `LOCALE_ID` token to a date-fns `Locale` object. This means the picker automatically adapts when the application's `LOCALE_ID` changes.
- **Predictable parsing** — `parse(value, 'P', new Date(), { locale })` returns `Invalid Date` for unrecognised strings rather than silently producing a wrong date, which makes the "pass raw string to form control" fallback explicit and testable.
- **`date-fns` is already a project-wide dependency** — no additional bundle cost.

### Why calendar navigation uses native `toLocaleDateString` for day names

The day-of-week header (`Sun Mon Tue …`) and the month name (`selectedMonthLiteral`) use `toLocaleDateString` / `toLocaleString` with the Angular `LOCALE_ID`. This is separate from `date-fns` because the day names are purely for display — they don't need to be parsed back — and the native Intl API is already available in all supported browsers, keeping this path zero-dependency.

### Why `DateRangeInputComponent` uses content projection for inputs

The two inputs inside a date range picker (`startDate`, `endDate`) each need to be independent `ControlValueAccessor` instances so consumers can bind them to separate form controls (`formControlName="checkIn"` and `formControlName="checkOut"`). Implementing this with a single component and two `@Input` bindings would require a wrapping `ControlValueAccessor` that decomposes and recomposes a `DateRange` object — adding complexity and making it impossible to apply Angular validators to each date independently.

Content projection with attribute directives keeps the consumer's form model flat and lets Angular's reactive forms infrastructure handle each control's validity, touched state, and dirty state natively.

### Why `DATE_NOW` is an injection token

`DatePickerInputComponent` and `CalendarComponent` both receive "today" via `@Inject(DATE_NOW)` rather than calling `new Date()` directly. The `DATE_NOW` token is provided in `CoreModule` using `useFactory: () => new Date()`. This makes the current date substitutable in tests, so specs can fix a known date without patching `Date` globally:

```typescript
providers: [{ provide: DATE_NOW, useValue: new Date('2025-01-15') }]
```

### Accessibility — known gap

The `CalendarComponent` grid currently has no ARIA roles (`role="grid"`, `role="gridcell"`), no `aria-label` on the navigation buttons, and no keyboard arrow-key navigation between days. Users relying solely on a keyboard or screen reader cannot select dates from the calendar grid. The text input fallback (`type="text"` with locale-formatted parsing) remains fully keyboard-accessible. ARIA support for the grid is a planned improvement.

---

## Troubleshooting

**Calendar never closes after picking a date**  
Check that `[closeOnSelection]` is not explicitly set to `false`. For `DateRangeInputComponent`, the calendar only auto-closes when *both* `start` and `end` are set in the same `calculateSelection` cycle — if your custom strategy returns a range with only one date populated, the calendar stays open.

**Typed date is not parsed correctly**  
The parser uses `date-fns` `'P'` format with the application's `LOCALE_ID`. In `en-GB` this is `dd/MM/yyyy`; in `en-US` it is `MM/dd/yyyy`. If users complain that their typed dates are not accepted, verify that `LOCALE_ID` is configured correctly in `AppModule`:

```typescript
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEnGB from '@angular/common/locales/en-GB';

registerLocaleData(localeEnGB);

@NgModule({
  providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }],
})
export class AppModule {}
```

**Form control value is a string instead of a `Date`**  
This happens when the user typed text that could not be parsed. The `onChange` path propagates the raw string to the form control so validators can flag it. Add a type-guard in your `valueChanges` subscription if you need to act only on valid `Date` values:

```typescript
this.form.get('departureDate')!.valueChanges.pipe(
  filter((v): v is Date => v instanceof Date)
).subscribe(date => { /* safe to use as Date */ });
```
