import { Component, ContentChild, ElementRef, forwardRef, Optional, Self, ViewChild } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { StartDateDirective } from './start-date.directive';
import { EndDateDirective } from './end-date.directive';
import { Datepicker2InputComponent } from '../datepicker-input/datepicker-input.component';

@Component({
  selector: 'uilibrary2-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrl: './date-range-input.component.css',
  providers: [
    {
      provide: UIFormFieldControl,
      useExisting: forwardRef(() => DateRangeInput2Component)
    }
  ]
})
export class DateRangeInput2Component implements UIFormFieldControl<Date> {
  value: Date | null = null;

  stateChanges: Observable<void> = new Observable<void>;
  id: string = crypto.randomUUID();
  placeholder: string = '';
  private _disabled: boolean = false;
  private _focussed: boolean = false;

  @ContentChild(StartDateDirective) StartDate: UIFormFieldControl<Date> | undefined;
  @ContentChild(EndDateDirective) EndDate: UIFormFieldControl<Date> | undefined;

  get _startDateControl() {
    return this.StartDate?.ngControl;
  }

  get _endDateControl() {
    return this.EndDate?.ngControl;
  }

  /**
   *
   */
  constructor(@Optional() @Self() public ngControl: NgControl) {

  }

  get empty(): boolean {
    return this.ngControl ? !this.ngControl.control?.value : false;
  }

  get disabled() {
    return this._disabled;
  }

  get shouldLabelFloat(): boolean {
    return !!this.StartDate?.shouldLabelFloat || !!this.EndDate?.shouldLabelFloat;
  }

  get hasErrors() {
    return !!this.StartDate?.hasErrors && this.bothTouched  || !!this.EndDate?.hasErrors && this.bothTouched;
  }

  get touched() {
    return !!this.StartDate?.touched || !!this.EndDate?.touched;
  }

  get dirty() {
    return !!this.StartDate?.dirty || !!this.EndDate?.dirty;
  }

  get bothTouched() {
    return !!(this.StartDate?.touched && this.EndDate?.touched);
  }

  onFocus() {
    this._focussed = true;
  }

  onBlur() {
    this._focussed = false;
  }

  focus(): void {
    //custom focus stratergy?
  }
}
