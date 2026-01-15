import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';

export abstract class MenuTrigger {
    menu: ContextMenuComponent  | null = null;
    abstract openMenu(event: MouseEvent): void;
    abstract closeMenu(event: MouseEvent): void;
}

@Directive({
    selector: '[menuTriggerFor]',
    providers: [
        {
            provide: MenuTrigger,
            useExisting: forwardRef(() => MenuTriggerDirective)
        }
    ],
    standalone: false
})
export class MenuTriggerDirective implements MenuTrigger {
    @Input('menuTriggerFor') get menu(): ContextMenuComponent | null { return this._menu; }
    set menu(value: ContextMenuComponent | null) { this._menu = value; }

    private get _menu(): ContextMenuComponent | null {
        return this._menuInternal;
    }
    private set _menu(value: ContextMenuComponent | null) {
        this._menuInternal = value;
    }
    private _menuInternal: ContextMenuComponent | null = null;

    public openMenu(event: MouseEvent): void {
        const menu = this.menu;
        if (!menu) {
            return;
        } else {
            menu.openMenu(event);
        }
    }

    public closeMenu(event: MouseEvent): void {
        const menu = this.menu;
        if (!menu) {
            return;
        } else {
            menu.closeMenu(event);
        }
    }
}