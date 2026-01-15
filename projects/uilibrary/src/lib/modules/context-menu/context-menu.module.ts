import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { ContextSideMenuComponent } from './context-side-menu/context-side-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ContextMenuComponent,
    ContextSideMenuComponent,
    MenuTriggerDirective
  ],
  exports: [
    ContextMenuComponent,
    ContextSideMenuComponent,
    MenuTriggerDirective
  ]
})
export class ContextMenuModule { }
