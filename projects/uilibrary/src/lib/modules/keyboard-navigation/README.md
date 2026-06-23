# Keyboard Navigation

A directive-based keyboard navigation system for 2D grid UIs in the UI Library. Built on a coordinate registry service and the roving `tabIndex` pattern — no Angular CDK `ListKeyManager` required.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — plain cells](#basic-usage--plain-cells)
- [Basic usage — cells with embedded inputs](#basic-usage--cells-with-embedded-inputs)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Interaction / behaviour table](#interaction--behaviour-table)
- [Technical decisions](#technical-decisions)
- [Troubleshooting](#troubleshooting)

---

## How it works

The module consists of two collaborating pieces: a directive placed on each cell host element, and a singleton registry service that maps grid coordinates to DOM elements.

```
App template renders cells with [uiCellNav]
  │
  ├─ CellNavDirective.ngOnInit()
  │    sets tabIndex=0 and role="gridcell" on the host element
  │
  └─ CellNavDirective.$keyChanged (combineLatest rowIndex + colIndex)
       calls NavRegistryService.register(row, col, el)
                │
                ▼
     NavRegistryService.cells  Map<"row:col", HTMLElement>

User presses Arrow key on a focused cell
  │
  ▼
CellNavDirective.onKeydown()
  │ calls NavRegistryService.move(from, dir)
  ▼
NavRegistryService.move()
  │ resolves next HTMLElement from Map, calls el.focus()
  ▼
New cell receives browser focus
```

When a cell is destroyed, `CellNavDirective.ngOnDestroy()` calls `NavRegistryService.unregister(row, col)` to remove it from the map.

---

## Setup

`KeyboardNavigationModule` is already included in `UserInterfaceLibraryModule`. If you are importing the full library, no additional module import is needed.

To import the module on its own:

```typescript
import { KeyboardNavigationModule } from 'uilibrary';

@NgModule({
  imports: [KeyboardNavigationModule],
})
export class MyGridModule {}
```

To inject `NavRegistryService` directly for programmatic focus control:

```typescript
import { NavRegistryService } from 'uilibrary';

@Component({ ... })
export class MyGridComponent {
  private nav = inject(NavRegistryService);

  focusFirstCell(): void {
    this.nav.focusCell(0, 0);
  }
}
```

> **Note:** `NavRegistryService` is provided at application root scope — injecting it anywhere in the app gives you the same singleton instance.

---

## Basic usage — plain cells

Apply `[uiCellNav]` to each cell host element and bind the zero-based `rowIndex` and `colIndex` inputs. Add `role="grid"` to the outer container and `role="row"` to each row wrapper.

```html
<div role="grid">
  <div role="row" *ngFor="let row of rows; let r = index">
    <div
      *ngFor="let cell of row.cells; let c = index"
      [uiCellNav]="true"
      [rowIndex]="r"
      [colIndex]="c"
    >
      {{ cell.value }}
    </div>
  </div>
</div>
```

> **Note:** The directive automatically sets `role="gridcell"` and `tabIndex="0"` on each host element. You are responsible for adding `role="grid"` to the container and `role="row"` to each row — the directive does not walk up the DOM to set these.

---

## Basic usage — cells with embedded inputs

When a cell contains a form control, the directive provides two-mode interaction:

- **Navigation mode** — Arrow keys move focus between cells; the inner control is not focused.
- **Edit mode** — Focus is passed to the inner control; Arrow keys pass through to the control.

```html
<div role="grid">
  <div role="row" *ngFor="let row of rows; let r = index">
    <div
      *ngFor="let col of row.cells; let c = index"
      [uiCellNav]="true"
      [rowIndex]="r"
      [colIndex]="c"
    >
      <input type="text" [(ngModel)]="col.value" />
    </div>
  </div>
</div>
```

The directive auto-discovers any `input`, `textarea`, or `select` inside the cell. Pressing `Enter`, `F2`, or any printable key while the cell host is focused activates edit mode. Pressing `Escape` returns focus to the cell host.

### Specifying an explicit focus target

When a cell contains multiple form controls, use the `cellFocusTarget` attribute to designate which one should receive focus on entry:

```html
<div [uiCellNav]="true" [rowIndex]="r" [colIndex]="c">
  <label>Amount</label>
  <input type="number" cellFocusTarget [(ngModel)]="row.amount" />
  <span class="currency">GBP</span>
</div>
```

> **Note:** `cellFocusTarget` is a plain HTML attribute, not an Angular `@Input`. Place it directly on the element that should receive focus when the cell enters edit mode. When `cellFocusTarget` is present, auto-discovery of other controls is skipped entirely.

---

## Options reference

Both inputs are required on every `[uiCellNav]` host.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rowIndex` | `number` | — | Zero-based row index of this cell. Re-registers the cell with the service when changed. |
| `colIndex` | `number` | — | Zero-based column index of this cell. Re-registers the cell with the service when changed. |

---

## API reference

### `CellNavDirective`

Applied via the `[uiCellNav]` attribute selector. Manages per-cell keyboard events and edit-mode state.

| Member | Signature | Description |
|--------|-----------|-------------|
| `rowIndex` | `@Input({ required: true }) number` | Zero-based row position. Triggers re-registration when the value changes. |
| `colIndex` | `@Input({ required: true }) number` | Zero-based column position. Triggers re-registration when the value changes. |
| `setFocus(focus)` | `(focus: boolean) => void` | Programmatically toggles edit mode. Pass `true` to enter edit mode; `false` to return to navigation mode. |

---

### `NavRegistryService`

Singleton service that owns the coordinate-to-element map for the active grid.

| Member | Signature | Description |
|--------|-----------|-------------|
| `register()` | `(row: number, col: number, el: HTMLElement) => void` | Registers a DOM element at the given coordinates. Overwrites any previous registration at those coordinates. |
| `unregister()` | `(row: number, col: number) => void` | Removes the registration at the given coordinates. Safe to call even if the cell was never registered. |
| `focusCell()` | `(row: number, col: number) => void` | Programmatically focuses the element registered at the given coordinates. No-op if no element exists there. |
| `move()` | `(from: CellKey, dir: 'up' \| 'down' \| 'left' \| 'right') => CellKey` | Moves focus one step from `from` in the given direction. Clamped within registered bounds. Returns the new coordinates, or `from` if movement was blocked (e.g. missing cell). |

#### `CellKey`

```typescript
interface CellKey { row: number; col: number; }
```

---

### `KeyboardNavigationModule`

| Declares | `CellNavDirective`  |
|----------|---------------------|
| Provides | `NavRegistryService` |
| Exports  | `CellNavDirective`  |
| Imports  | `CommonModule`      |

---

## Interaction / behaviour table

| Scenario | Current state | Key / action | What happens |
|----------|---------------|--------------|--------------|
| Navigate to adjacent cell | Navigation mode | `Arrow` key | `NavRegistryService.move()` is called; the next cell host receives browser focus |
| Enter edit mode (explicit) | Navigation mode, cell has inner input | `Enter` or `F2` | Focus moves to the inner control (`cellFocusTarget` if present, otherwise first auto-discovered control) |
| Enter edit mode (type-ahead) | Navigation mode, cell has inner input | Any printable key (no modifier) | Same as above; the pressed character is inserted into the input value and a synthetic `input` event is dispatched |
| Exit edit mode | Edit mode | `Escape` | Focus returns to the cell host element; edit mode is cleared |
| Input loses focus to outside the cell | Edit mode | Mouse click outside the cell | `blur` event on the inner control is detected; `relatedTarget` check confirms focus left the cell; edit mode is cleared |
| Navigate while in edit mode | Edit mode | `Arrow` key | Arrow key is **not** intercepted — it passes through to the inner control |
| Cell is destroyed | Any | `ngOnDestroy` | Directive calls `NavRegistryService.unregister(row, col)` to remove the cell from the map |
| Cell coordinates change | Any | `rowIndex` or `colIndex` input changes | `combineLatest` emits and `NavRegistryService.register()` is called with the new coordinates (map-based overwrite; no explicit unregister of the old key) |

---

## Technical decisions

### Why a custom directive rather than Angular CDK `ListKeyManager`?

Angular CDK's `ListKeyManager` is designed for 1D lists — menus, autocomplete dropdowns, and similar vertical or horizontal sequences. This module targets 2D grids where navigation spans both rows and columns simultaneously. Adapting `ListKeyManager` for 2D movement would require two manager instances (one per axis) with synchronised state, adding indirection with no meaningful gain. A flat `Map<"row:col", HTMLElement>` is a direct and transparent representation of the grid that keeps the movement logic self-contained in a single `move()` call.

### Why is the directive applied per cell rather than once on the grid container?

Self-registration per cell means the grid container does not need to know its dimensions in advance. Cells register themselves on mount and unregister on destroy, so the registry stays consistent as rows are added, removed, or conditionally rendered (e.g. `*ngIf`, virtual scrolling). This removes the need for any lifecycle management in the host component.

### Why does the directive use `inject()` rather than constructor injection?

Angular's partial compilation mode (required for library builds via `ng-packagr`) imposes constraints on constructor parameter metadata. Using `inject()` as a class field initialiser (`reg = inject(NavRegistryService)`) is fully compatible with partial compilation and avoids an explicit constructor parameter, keeping the constructor empty.

### Why is `tabIndex` set imperatively in `ngOnInit` rather than via `@HostBinding`?

A `@HostBinding('tabIndex')` set to a constant `0` would also work. Setting it imperatively in `ngOnInit` makes the directive's intent legible at the cost site: the cell is claiming the roving focus role the moment it initialises. It also avoids Angular's host binding change-detection cycle for a value that is set once and never changes.

---

## Troubleshooting

### Symptom: focus jumps unpredictably when two grids are on the same page

**Root cause:** `NavRegistryService` is provided at application root scope (`providedIn: 'root'`). Two grids with overlapping `rowIndex`/`colIndex` values will overwrite each other's registrations in the shared coordinate map.

**Fix:** Avoid rendering two keyboard-navigable grids simultaneously on the same route. Multi-grid support (scoped service instances) is a planned enhancement — see the comment at the top of `nav-registry.service.ts`.

---

### Symptom: pressing Arrow keys scrolls the page instead of moving focus

**Root cause:** Arrow key interception only occurs when the **cell host** element has focus and the directive is in navigation mode. If the inner input currently has focus (edit mode), Arrow keys are intentionally passed through and the browser scrolls the page.

**Fix:** Press `Escape` first to exit edit mode and return focus to the cell host, then use Arrow keys to navigate.

---

### Symptom: a printable key inserts the character twice

**Root cause:** The type-ahead handler inserts the character directly into the input value and dispatches a synthetic `input` event. If a third-party directive on the same input also intercepts `keydown` and re-dispatches the event, the character may be inserted a second time.

**Fix:** Add the `cellFocusTarget` attribute to the input. This signals to the directive that it should enter edit mode and move focus to the control, but it will no longer pre-insert the character — the control handles the original key event naturally once it has focus.

---
