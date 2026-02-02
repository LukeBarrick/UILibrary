import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { TableCellDirective } from './cell.directive';

@Component({
    selector: 'uilibrary-table-column',
    template: '',
    standalone: false
})

export class TableColumnComponent<T> implements OnInit {
    constructor() { }

    ngOnInit() { }

    @ContentChild('header', {static: false}) headerTemplate?: TemplateRef<unknown>;
    @ContentChild(TableCellDirective, {static:false}) cellTemplate?: TableCellDirective<T>;
}