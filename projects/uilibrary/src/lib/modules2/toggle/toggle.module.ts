import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toggle2Component } from './toggle.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    Toggle2Component
  ],
  exports: [
    Toggle2Component
  ]
})
export class Toggle2Module { }
