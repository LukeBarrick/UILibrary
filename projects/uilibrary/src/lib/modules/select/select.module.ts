import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectWcagHelperDirective } from './select-wcag-helper/select-wcag-helper.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [
    SelectComponent,
    SelectWcagHelperDirective
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
