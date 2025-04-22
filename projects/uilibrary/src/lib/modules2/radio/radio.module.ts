import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButton2Component } from './button/button.component';
import { RadioGroup2Component } from './group/group.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    RadioButton2Component,
    RadioGroup2Component
  ],
  exports: [
    RadioButton2Component,
    RadioGroup2Component
  ]
})
export class Radio2Module { }
