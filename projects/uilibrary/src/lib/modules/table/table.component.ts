import { Component, ContentChildren, ElementRef, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { TableColumnComponent } from './table-column.component';

@Component({
    selector: 'uilibrary-table',
    templateUrl: 'table.component.html',
    standalone: false
})

export class TableComponent<T> implements OnInit {
    @Input() data: readonly T[] | undefined;

    @ContentChildren(TableColumnComponent) columns!: QueryList<TableColumnComponent<T>>;

    constructor() { }

    ngOnInit() { }

    debug(): void {
        console.log(this.columns);
    }
}