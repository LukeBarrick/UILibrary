import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { ApiComponent } from './api/api.component';
import { ExamplesComponent } from './examples/examples.component';
import { FormFieldComponent } from './form-field.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormFieldComponent,
    OverviewComponent,
    ApiComponent,
    ExamplesComponent
  ]
})
export class FormFieldModule { }
