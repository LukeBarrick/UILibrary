import { Component, ContentChild, ContentChildren, ElementRef, forwardRef, HostListener, inject, Optional, QueryList, Self, ViewChild, ViewChildren } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { NgControl } from '@angular/forms';
import { debounce, Observable, Subscription } from 'rxjs';
import { StartDateDirective } from './start-date.directive';
import { EndDateDirective } from './end-date.directive';
import { DateSelectionStrategy } from '../date-selection-strategy';
import { DateRange } from '../date-range';
import { DateFnsLocaleService } from '../../../core/services/date-fns-locale.service';
import { parse } from 'date-fns';

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
export class DateRangeInput2Component implements UIFormFieldControl<DateRange> {
  private elRef = inject(ElementRef<DateRangeInput2Component>);
  private dateFnsLocaleService = inject(DateFnsLocaleService);
  
  value: DateRange | null = null;

  stateChanges: Observable<void> = new Observable<void>;

  $startDateValueChanges: Subscription | undefined = undefined;
  $endDateValueChanges: Subscription | undefined = undefined;

  id: string = crypto.randomUUID();
  placeholder: string = '';
  private _disabled: boolean = false;
  private _focussed: boolean = false;
  isOpen: boolean = false;
  
  @HostListener('document:click', ['$event']) onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const parent = this.elRef.nativeElement.parentElement;

    if (this.isOpen && !parent.contains(target)) {
      this.isOpen = false;
    } 
  }

  @ContentChild(StartDateDirective) startDate: UIFormFieldControl<Date> | undefined;
  @ContentChild(EndDateDirective) endDate: UIFormFieldControl<Date> | undefined;

  /**
   *
   */
  constructor(private readonly strategy: DateSelectionStrategy,
              @Optional() @Self() public ngControl: NgControl) {
   
  }

  get empty(): boolean {
    return !!this.value;
  }

  get disabled() {
    return this._disabled;
  }

  get shouldLabelFloat(): boolean {
    return !!this.startDate?.shouldLabelFloat || !!this.endDate?.shouldLabelFloat || this.isOpen;
  }

  get hasErrors() {
    return !!this.startDate?.hasErrors && this.bothTouched || !!this.endDate?.hasErrors && this.bothTouched;
  }

  get hasFocus() {
    return !!this.startDate?.hasFocus || !!this.endDate?.hasFocus;
  }

  get touched() {
    return !!this.startDate?.touched || !!this.endDate?.touched;
  }

  get dirty() {
    return !!this.startDate?.dirty || !!this.endDate?.dirty;
  }

  get bothTouched() {
    return !!(this.startDate?.touched && this.endDate?.touched);
  }

  onFocus() {
    this._focussed = true;
    this.isOpen = true;
  }

  onBlur() {
    this._focussed = false;
  }

  focus(): void {
    this.isOpen = true;
  }

  setValue(): void { return; }

  selecteDates: Date[] = [];

  addDateToCalendar(value: Date): void {
    this.selecteDates?.push(value);
  }

  dateSelected(value: Date): void {
    if(!this.startDate || !this.endDate) 
      //throw warning 
      return;

    let dateRange: DateRange = { start: null, end: null };

    if(this.startDate.value instanceof Date) {
      dateRange.start = this.startDate.value;
      console.log('start date is a date')
    }

    if(this.endDate.value instanceof Date) {
      dateRange.end = this.endDate.value;
      console.log('end date is a date')
    }

    //seet 

    const nextRange = this.strategy.calculateSelection(value, dateRange);

    console.log('next range is {0}', nextRange)
    
    this.startDate.setValue(nextRange.start);
    this.endDate.setValue(nextRange.end);

    this.addDateToCalendar(value);
  }


}
