import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icon.module';
import { DatePickerInputComponent } from './date-picker/date-picker-input/date-picker-input.component';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    FormsModule
  ],
  declarations: [
    DatePickerComponent,
    DatePickerInputComponent
  ],
  exports: [
    DatePickerComponent,
    DatePickerInputComponent
  ]
})
export class DatePickersModule { }
