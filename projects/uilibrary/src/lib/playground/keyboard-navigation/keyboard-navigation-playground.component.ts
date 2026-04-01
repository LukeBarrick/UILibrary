import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'uilibrary-keyboard-navigation-playground',
    templateUrl: 'keyboard-navigation-playground.component.html',
    styleUrl: 'keyboard-navigation-playground.component.scss',
    standalone: false
})

export class KeyboardNavigationPlaygroundComponent implements OnInit {
    gridRows: string[][] = [
        ['A1', 'A2', 'A3'],
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3']
    ];

    constructor() { }

    ngOnInit() { }
}