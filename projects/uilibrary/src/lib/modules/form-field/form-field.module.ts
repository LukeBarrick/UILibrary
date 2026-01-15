import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';
import { PrefixDirective } from './directives/UIPrefix';
import { SuffixDirective } from './directives/UISuffix';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormFieldComponent,
    PrefixDirective,
    SuffixDirective
  ],
  exports: [
    FormFieldComponent,
    PrefixDirective,
    SuffixDirective
  ]
})
export class FormFieldModule { }
