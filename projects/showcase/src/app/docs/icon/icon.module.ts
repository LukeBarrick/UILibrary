import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { OverviewComponent } from './overview/overview.component';
import { ApiComponent } from './api/api.component';
import { ExamplesComponent } from './examples/examples.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IconComponent,
    OverviewComponent,
    ApiComponent,
    ExamplesComponent
  ]
})
export class IconModule { }
