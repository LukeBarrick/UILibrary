import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';
import { PrefixDirective } from './directives/UIPrefix';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormFieldComponent,
    PrefixDirective
  ],
  exports: [
    FormFieldComponent,
    PrefixDirective
  ]
})
export class FormField2Module { }
