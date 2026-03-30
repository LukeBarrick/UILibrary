import { NgModule } from '@angular/core';

import { TableComponent } from './table.component';
import { TableHeaderDirective } from './header.directive';
import { TableCellDirective } from './cell.directive';
import { TableColumnComponent } from './table-column.component';

@NgModule({
    imports: [],
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
