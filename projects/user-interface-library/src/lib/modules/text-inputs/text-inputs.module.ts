import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TextInputComponent,
    TextAreaComponent
  ],
  exports: [
    TextInputComponent,
    TextAreaComponent
  ]
})
export class TextInputsModule { }
