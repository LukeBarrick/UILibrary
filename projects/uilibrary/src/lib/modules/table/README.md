# Table

A column-based data table for the UI Library. Built on Angular content projection and typed template directives — no third-party table library required.

---

## Contents

- [How it works](#how-it-works)
- [Setup](#setup)
- [Basic usage — simple table](#basic-usage--simple-table)
- [Basic usage — row index and column index](#basic-usage--row-index-and-column-index)
- [Basic usage — sorting and filtering (host-managed)](#basic-usage--sorting-and-filtering-host-managed)
- [Options reference](#options-reference)
- [API reference](#api-reference)
- [Technical decisions](#technical-decisions)

---

## How it works

Each column is defined as a `<uilibrary-table-column>` child element. Inside each column, two `<ng-template>` directives supply the header and cell content:

```
[data]="rows"
    │
    ▼
<uilibrary-table>
    │
    ├── <uilibrary-table-column> ×N
    │       ├── <ng-template uilibrary-table-header>   ← rendered once per <th>
    │       └── <ng-template uilibrary-table-cell let-row>  ← rendered once per <td>
    │                                 context: { $implicit: T, rowIndex, colIndex }
    │
    ▼
<table>
  <thead> — one <th> per column, filled by the header template
  <tbody> — one <tr> per row; one <td> per column, filled by the cell template
```

---

## Setup

`TableModule` must be imported in the consuming NgModule. It is already re-exported by `UserInterfaceLibraryModule`, so no extra import is needed if you use the full library.

To import it directly:

```typescript
import { TableModule } from 'uilibrary';

@NgModule({
  imports: [TableModule],
})
export class MyModule {}
```

There is no service to inject. All configuration is done in the template.

---

## Basic usage — simple table

Bind `[data]` to a typed array and declare one `<uilibrary-table-column>` per column. Use `let-row` to access the current row item inside the cell template.

```typescript
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith',     email: 'bob@example.com' },
    { id: 3, name: 'Carol White',   email: 'carol@example.com' },
  ];
}
```

```html
<uilibrary-table [data]="users">
  <uilibrary-table-column>
    <ng-template uilibrary-table-header>ID</ng-template>
    <ng-template uilibrary-table-cell let-row>{{ row.id }}</ng-template>
  </uilibrary-table-column>

  <uilibrary-table-column>
    <ng-template uilibrary-table-header>Name</ng-template>
    <ng-template uilibrary-table-cell let-row>{{ row.name }}</ng-template>
  </uilibrary-table-column>

  <uilibrary-table-column>
    <ng-template uilibrary-table-header>Email</ng-template>
    <ng-template uilibrary-table-cell let-row>{{ row.email }}</ng-template>
  </uilibrary-table-column>
</uilibrary-table>
```

> **Note:** The table is intentionally unstyled. Apply Bootstrap table classes (`table`, `table-striped`, `table-hover`, etc.) to the host element or wrap it in a styled container.

---

## Basic usage — row index and column index

Both `rowIndex` and `colIndex` are available in the cell template context. Use `let-<alias>="rowIndex"` to bind them.

```html
<uilibrary-table [data]="users">
  <uilibrary-table-column>
    <ng-template uilibrary-table-header>#</ng-template>
    <ng-template uilibrary-table-cell let-row let-i="rowIndex"
      >{{ i + 1 }}</ng-template
    >
  </uilibrary-table-column>

  <uilibrary-table-column>
    <ng-template uilibrary-table-header>Name</ng-template>
    <ng-template uilibrary-table-cell let-row>{{ row.name }}</ng-template>
  </uilibrary-table-column>
</uilibrary-table>
```

> **Note:** `colIndex` is available via `let-ci="colIndex"` in the cell template but is **not** exposed in the header template context.

---

## Basic usage — sorting and filtering (host-managed)

Sorting, filtering, and pagination are not built into the component. They are the responsibility of the host component: transform the data array before passing it to `[data]`.

```typescript
@Component({ ... })
export class UserListComponent {
  private allUsers: User[] = [ /* … */ ];
  filteredUsers: User[] = this.allUsers;
  sortAsc = true;

  filterByName(query: string): void {
    const q = query.toLowerCase();
    this.filteredUsers = this.allUsers.filter(u =>
      u.name.toLowerCase().includes(q)
    );
  }

  sortByName(): void {
    this.sortAsc = !this.sortAsc;
    this.filteredUsers = [...this.filteredUsers].sort((a, b) =>
      this.sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }
}
```

```html
<input (input)="filterByName($any($event.target).value)" placeholder="Filter…" />
<button (click)="sortByName()">Sort by name</button>

<uilibrary-table [data]="filteredUsers">
  <!-- columns … -->
</uilibrary-table>
```

> **Note:** Because `[data]` accepts `readonly T[]`, assign a new array reference whenever the data changes (e.g. use spread `[...arr]` or `Array.from()`). Mutating an existing array in place will not trigger change detection.

---

## Options reference

`TableComponent` has a single input. `TableColumnComponent` and the two directives have no configuration inputs beyond template provision.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `data` | `readonly T[] \| undefined` | `undefined` | The array of row items to display. Pass a new reference to trigger re-render. |

The `appTableCellDefOf` input on `TableHeaderDirective` and `TableCellDirective` is for TypeScript type-narrowing in templates only and has no runtime effect.

---

## API reference

### `TableComponent<T>`

| Member | Signature | Description |
|--------|-----------|-------------|
| `data` | `@Input() readonly T[] \| undefined` | Row data to render. |

---

### `TableColumnComponent<T>`

Wrapper element for a single column definition. Has no inputs. Provide column content via the `uilibrary-table-header` and `uilibrary-table-cell` directives inside an `<ng-template>`.

---

### `TableHeaderDirective<T>`

| Member | Type | Description |
|--------|------|-------------|
| `template` | `TemplateRef<TableHeaderContext<T>>` | The projected header template. Accessed internally by `TableComponent`. |

Template context type — `TableHeaderContext<T>`:

| Variable | Type | Description |
|----------|------|-------------|
| `$implicit` | `T` | _(unused in header; provided for consistency)_ |
| `colIndex` | `number` | Zero-based index of this column. |

---

### `TableCellDirective<T>`

| Member | Type | Description |
|--------|------|-------------|
| `template` | `TemplateRef<TableCellContext<T>>` | The projected cell template. Accessed internally by `TableComponent`. |

Template context type — `TableCellContext<T>`:

| Variable | Type | Description |
|----------|------|-------------|
| `$implicit` | `T` | The current row item. Bind with `let-row`. |
| `rowIndex` | `number` | Zero-based row index. Bind with `let-i="rowIndex"`. |
| `colIndex` | `number` | Zero-based column index. Bind with `let-ci="colIndex"`. |

---

### `TableModule`

| Declares & exports | `TableComponent`, `TableColumnComponent`, `TableHeaderDirective`, `TableCellDirective` |
|--------------------|----------------------------------------------------------------------------------------|

---

## Technical decisions

### Why content projection instead of a column config array?

A config-array API (e.g. `[columns]="[{ key: 'name', label: 'Name' }]"`) works for plain text columns but breaks down as soon as a cell needs custom markup — buttons, status badges, icons, links. Content projection with `<ng-template>` lets the consumer render arbitrary Angular content in every cell without passing render functions or component factories.

### Why a separate `<uilibrary-table-column>` element instead of a directive?

Wrapping each column in a component element (`<uilibrary-table-column>`) makes the column tree visible in Angular's `ContentChildren` query as a typed `QueryList<TableColumnComponent<T>>`. A directive applied to an `<ng-template>` would require a different querying strategy and lose the structural clarity of co-locating header and cell templates inside one element.

### Why `appTableCellDefOf` on the directives?

This follows the Angular CDK table pattern. The `appTableCellDefOf` input accepts the same array as `[data]` so TypeScript can infer the generic type `T` for the template context (via `ngTemplateContextGuard`). Without it, `let-row` in the cell template resolves to `any`. It has no runtime side-effect.

### Why is sorting / filtering / pagination handled by the host?

The table component is intentionally a thin rendering layer. Embedding sort state, filter state, and pagination state into the component would require either a large `@Input` surface or an internal service, both of which add complexity before the feature set is agreed. Keeping those concerns in the host component means the table can remain a pure display component and those features can be layered on top in a controlled way.
