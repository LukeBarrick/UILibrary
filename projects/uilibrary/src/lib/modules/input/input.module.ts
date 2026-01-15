import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent as InputDirective } from './input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InputDirective
  ],
  exports: [
    InputDirective
  ]
})
export class InputModule { }
