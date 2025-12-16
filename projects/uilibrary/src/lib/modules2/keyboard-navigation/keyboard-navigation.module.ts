import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellNavDirective } from './cell-nav.directive';
import { NavRegistryService } from './nav-registry.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CellNavDirective
  ],
  providers: [
    NavRegistryService
  ],
  exports: [
    CellNavDirective
  ],
})
export class KeyboardNavigationModule { }
