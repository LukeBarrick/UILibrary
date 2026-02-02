import { Directive, inject, Input, TemplateRef } from '@angular/core';
import { TableComponent } from './table.component';

export type TableCellContext<T> = {
    $implicit: T;      // row item
    rowIndex: number;
    colIndex: number;
};

@Directive({ selector: '[uilibrary-table-cell]', standalone: false })
export class TableCellDirective<T> {
   @Input({ required: true }) appTableCellDefOf!: readonly T[];

  constructor(public readonly template: TemplateRef<TableCellContext<T>>) {}

  static ngTemplateContextGuard<T>(
    _dir: TableCellDirective<T>,
    _ctx: unknown,
  ): _ctx is TableCellContext<T> {
    return true;
  }
}