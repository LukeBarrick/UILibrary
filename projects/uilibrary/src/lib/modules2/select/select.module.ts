import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectWcagHelperDirective } from './select-wcag-helper/select-wcag-helper.directive';
import { Select2Component } from './select.component';
import { CollapseDirective } from './collapse/collapse.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [	
    Select2Component,
    SelectWcagHelperDirective,
    CollapseDirective
   ], 
  exports: [
    Select2Component
  ]
})
export class Select2Module { }
