import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { ApiComponent } from './api/api.component';
import { ExamplesComponent } from './examples/examples.component';
import { OverviewComponent } from './overview/overview.component';
import { Routes } from '@angular/router';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SelectComponent,
    OverviewComponent,
    ApiComponent,
    ExamplesComponent,
  ],
})
export class SelectModule {}
