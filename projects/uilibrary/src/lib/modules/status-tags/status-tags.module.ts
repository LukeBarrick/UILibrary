import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTagComponent } from './status-tag/status-tag.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatusTagComponent
  ],
  exports: [
    StatusTagComponent
  ]
})
export class StatusTagsModule { }
