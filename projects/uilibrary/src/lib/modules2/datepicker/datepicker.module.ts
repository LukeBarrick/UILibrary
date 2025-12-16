import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeInput2Component } from './date-range-input/date-range-input.component';
import { StartDateDirective } from './date-range-input/start-date.directive';
import { EndDateDirective } from './date-range-input/end-date.directive';
import { Datepicker2InputComponent } from './datepicker-input/datepicker-input.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { IconsModule } from "../../../lib/modules/icons/icon.module";
import { DefaultDateSelectionStrategy } from './default-date-selection-strategy';
import { DateSelectionStrategy } from './date-selection-strategy';
import { DateInputDirective } from './date-range-input/date-input.directive';

@NgModule({
  declarations: [
    Datepicker2InputComponent,
    DateRangeInput2Component,
    CalendarComponent,
    StartDateDirective,
    EndDateDirective,
    DateInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconsModule
],
  exports: [
    Datepicker2InputComponent,
    DateRangeInput2Component,
    CalendarComponent,
    StartDateDirective,
    EndDateDirective,
    DateInputDirective
  ],
  providers: [
    { provide: DateSelectionStrategy, useClass: DefaultDateSelectionStrategy }
  ]
})
export class Datepicker2Module { }
