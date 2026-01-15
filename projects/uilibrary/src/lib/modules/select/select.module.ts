import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectWcagHelperDirective } from './select-wcag-helper/select-wcag-helper.directive';
import { SelectComponent } from './select.component';
import { CollapseDirective } from './collapse/collapse.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [	
    SelectComponent,
    SelectWcagHelperDirective,
    CollapseDirective
   ], 
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
