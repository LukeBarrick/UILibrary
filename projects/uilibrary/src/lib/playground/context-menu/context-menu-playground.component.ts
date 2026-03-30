import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuTrigger } from '../../modules/context-menu/menu-trigger.directive';

@Component({
    selector: 'uilibrary-context-menu-playground',
    templateUrl: 'context-menu-playground.component.html',
    styleUrl: 'context-menu-playground.component.scss',
    standalone: false
})

export class ContextMenuPlaygroundComponent implements OnInit {
    @ViewChild(MenuTrigger, { static: true }) menuTrigger!: MenuTrigger;

    constructor() { }

    ngOnInit() { }

    rightClick(event: MouseEvent): void {
        event.preventDefault();
        this.menuTrigger.openMenu(event);
    }
}