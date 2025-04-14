import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { OverviewComponent } from './overview/overview.component';
import { ApiComponent } from './api/api.component';
import { ExamplesComponent } from './examples/examples.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InputComponent,
    OverviewComponent,
    ApiComponent,
    ExamplesComponent
  ]
})
export class InputModule { }
