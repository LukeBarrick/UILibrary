import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'uilibrary-select-playground',
    templateUrl: 'select-playground.component.html',
    styleUrl: 'select-playground.component.scss',
    standalone: false
})

export class SelectPlaygroundComponent implements OnInit {
    fb = inject(FormBuilder);

    @Input() showOutput: boolean = false;

    items: Item[] = [
        { id: 1, value: "Item 1" },
        { id: 2, value: "Item 2" },
        { id: 3, value: "Item 3" }
    ]

    selectModel = { id: 1, value: 'Item 1' };
    clearable = this.items[0];

    constructor() { }

    ngOnInit() {
        // this.clearable = { id: 1, value: "Item 1"}
    }

    stringify(value: string) {
        return JSON.stringify(value);
    }

    exampleCompareFn(item: any, selected: any) {
        return item.id === selected.id;
    }
}

export interface Item {
    id: number,
    value: string
}