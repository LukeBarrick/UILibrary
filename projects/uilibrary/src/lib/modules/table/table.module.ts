import { NgModule } from '@angular/core';

import { TableComponent } from './table.component';
import { BrowserModule } from "@angular/platform-browser";
import { TableHeaderDirective } from './header.directive';
import { TableCellDirective } from './cell.directive';
import { TableColumnComponent } from './table-column.component';

@NgModule({
    imports: [BrowserModule],
    exports: [
        TableComponent,
        TableHeaderDirective,
        TableCellDirective,
        TableColumnComponent
    ],
    declarations: [
        TableComponent,
        TableHeaderDirective,
        TableCellDirective,
        TableColumnComponent
    ],
    providers: [],
})
export class TableModule { }
