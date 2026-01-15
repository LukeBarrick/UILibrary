import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeInputComponent } from './date-range-input/date-range-input.component';
import { StartDateDirective } from './date-range-input/start-date.directive';
import { EndDateDirective } from './date-range-input/end-date.directive';
import { DatePickerInputComponent } from './datepicker-input/datepicker-input.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { DefaultDateSelectionStrategy } from './default-date-selection-strategy';
import { DateSelectionStrategy } from './date-selection-strategy';
import { DateInputDirective } from './date-range-input/date-input.directive';

@NgModule({
  declarations: [
    DatePickerInputComponent,
    DateRangeInputComponent,
    CalendarComponent,
    StartDateDirective,
    EndDateDirective,
    DateInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule
],
  exports: [
    DatePickerInputComponent,
    DateRangeInputComponent,
    CalendarComponent,
    StartDateDirective,
    EndDateDirective,
    DateInputDirective
  ],
  providers: [
    { provide: DateSelectionStrategy, useClass: DefaultDateSelectionStrategy }
  ]
})
export class DatepickerModule { }
