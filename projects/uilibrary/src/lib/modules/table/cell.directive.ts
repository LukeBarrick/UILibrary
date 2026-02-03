import { Directive, Input, TemplateRef } from '@angular/core';

export type TableCellContext<T> = {
    $implicit: T;      // row item
    rowIndex: number;
    colIndex: number;
};


@Directive({ selector: '[uilibrary-table-cell]', standalone: false })
export class TableCellDirective<T> {
   @Input() appTableCellDefOf: readonly T[] = [];

  constructor(public readonly template: TemplateRef<TableCellContext<T>>) {}

  static ngTemplateContextGuard<T>(
    _dir: TableCellDirective<T>,
    _ctx: unknown,
  ): _ctx is TableCellContext<T> {
    return true;
  }
}