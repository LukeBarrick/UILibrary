import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeInput2Component } from './date-range-input/date-range-input.component';
import { StartDateDirective } from './date-range-input/start-date.directive';
import { EndDateDirective } from './date-range-input/end-date.directive';
import { Datepicker2InputComponent } from './datepicker-input/datepicker-input.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Datepicker2InputComponent,
    DateRangeInput2Component,
    CalendarComponent,
    StartDateDirective,
    EndDateDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    Datepicker2InputComponent,
    DateRangeInput2Component,
    CalendarComponent,
    StartDateDirective,
    EndDateDirective
  ]
})
export class Datepicker2Module { }
