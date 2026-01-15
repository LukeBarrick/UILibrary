import { ChangeDetectorRef, Component, HostListener, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuTrigger } from './menu-trigger.directive';

@Component({
  selector: 'uilibrary-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContextMenuComponent {
  @ViewChild(MenuTrigger, { static: true }) menuTrigger!: MenuTrigger;

  menuVisible = false;
  menuPosition = { x: 0, y: 0 };

  onOptionClick(option: string): void {
    this.hideMenu();
  }

  hideMenu(): void {
    this.menuVisible = false;
  }

  @HostListener('document:click')
  onGlobalClick(): void {
    this.hideMenu();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.hideMenu();
  }

  openMenu(event: MouseEvent): void {
    this.menuPosition = { x: event.clientX, y: event.clientY };
    this.menuVisible = true;
  }

  closeMenu(event: MouseEvent): void {
    this.menuVisible = false;
  }
}