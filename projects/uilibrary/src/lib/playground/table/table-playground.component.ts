import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'uilibrary-table-playground',
    templateUrl: 'table-playground.component.html',
    styleUrl: 'table-playground.component.scss',
    standalone: false
})

export class TablePlaygroundComponent implements OnInit {
    tableData: Array<{ id: number; name: string; email: string }> = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
        { id: 3, name: 'Carol White', email: 'carol@example.com' },
        { id: 4, name: 'Dave Brown', email: 'dave@example.com' }
    ];

    constructor() { }

    ngOnInit() { }
}