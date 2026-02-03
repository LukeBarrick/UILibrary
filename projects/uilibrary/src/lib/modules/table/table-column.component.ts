import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { TableCellDirective } from './cell.directive';
import { TableHeaderDirective } from './header.directive';

@Component({
    selector: 'uilibrary-table-column',
    template: '',
    standalone: false
})

export class TableColumnComponent<T> implements OnInit {
    constructor() { }

    ngOnInit() { }

    @ContentChild(TableHeaderDirective, {static: false}) headerTemplate?: TableHeaderDirective<T>;
    @ContentChild(TableCellDirective, {static:false}) cellTemplate?: TableCellDirective<T>;
}