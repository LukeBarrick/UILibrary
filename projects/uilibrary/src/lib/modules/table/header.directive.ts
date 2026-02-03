import { Directive, Input, TemplateRef } from '@angular/core';

export type TableHeaderContext<T> = {
    $implicit: T;      
    colIndex: number;
}

@Directive({ selector: '[uilibrary-table-header]', standalone: false })
export class TableHeaderDirective<T> {
    @Input() appTableCellDefOf: readonly T[] = [];

    constructor(public readonly template: TemplateRef<TableHeaderContext<T>>) { }

    static ngTemplateContextGuard<T>(
        _dir: TableHeaderDirective<T>,
        _ctx: unknown,
    ): _ctx is TableHeaderContext<T> {
        return true;
    }
}