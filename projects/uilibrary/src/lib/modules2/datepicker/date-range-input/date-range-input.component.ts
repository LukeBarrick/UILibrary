import { AfterViewInit, Component, ContentChild, ContentChildren, DestroyRef, ElementRef, EventEmitter, forwardRef, HostListener, inject, Input, OnDestroy, OnInit, Optional, Output, QueryList, Self, ViewChild, ViewChildren } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { NgControl } from '@angular/forms';
import { filter, map, Observable, Subscription, takeUntil, tap } from 'rxjs';
import { StartDateDirective } from './start-date.directive';
import { EndDateDirective } from './end-date.directive';
import { DateSelectionStrategy } from '../date-selection-strategy';
import { DateRange } from '../date-range';

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
export class DateRangeInput2Component implements UIFormFieldControl<DateRange>, AfterViewInit, OnDestroy  {
  private elRef = inject(ElementRef<DateRangeInput2Component>);
  private destroyRef = inject(DestroyRef)
  
  value: DateRange | null = null;

  stateChanges: Observable<void> = new Observable<void>;

  $startDateValueChanges: Subscription | undefined = undefined;
  $endDateValueChanges: Subscription | undefined = undefined;

  id: string = crypto.randomUUID();
  placeholder: string = '';
  private _disabled: boolean = false;
  private _focussed: boolean = false;
  _open: boolean = false;
  
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Input() editable: boolean = true;
  
  @HostListener('document:mousedown', ['$event']) onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const parent = this.elRef.nativeElement.parentElement;

    if (this.open && !parent.contains(target)) {
      this.open = false;
      this.openChange.emit(this._open);
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

  ngAfterViewInit(): void {
    if(this.startDate?.ngControl) {
      this.$startDateValueChanges = this.startDate.ngControl.valueChanges?.pipe(
        tap(() => this.removeStartDateFromCalendar()),
        filter(value => value instanceof Date), 
        tap(value => this.addStartDateToCalendar(value))
      ).subscribe();
    } 

    if(this.endDate?.ngControl) {
        this.$endDateValueChanges = this.endDate.ngControl.valueChanges?.pipe(
          tap(() => this.removeEndDateFromCalendar()),
          filter(value => value instanceof Date), 
          tap(value => this.addEndDateToCalendar(value))
        ).subscribe();
    } 
  }

  ngOnDestroy(): void {
    this.$startDateValueChanges?.unsubscribe();
    this.$endDateValueChanges?.unsubscribe();
  }

  get empty(): boolean {
    return !!this.value;
  }

  get disabled() {
    return this._disabled;
  }

  get shouldLabelFloat(): boolean {
    return !!this.startDate?.shouldLabelFloat || !!this.endDate?.shouldLabelFloat || this.open;
  }

  get hasErrors() {
    return !!(this.startDate?.hasErrors && this.bothTouched) || !!(this.endDate?.hasErrors && this.bothTouched);
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
    this.open = true;
  }

  onBlur() {
    this._focussed = false;
  }

  focus(): void {
    this.open = true;
  }

  setValue(): void { return; }

  selecteDates: Date[] = [];

  addStartDateToCalendar(value: Date): void {
    let nextRange: DateRange = {start: value, end: null};

    if(this.endDate?.value instanceof Date) {
      nextRange.end = this.endDate.value;
    }

    this.addDatesToCalendar(nextRange);
  }

  addEndDateToCalendar(value: Date): void {
    let nextRange: DateRange = {start: null, end: value};

    if(this.startDate?.value instanceof Date) {
      nextRange.start = this.startDate.value;
    }

    this.addDatesToCalendar(nextRange);
  }

  dateSelected(value: Date): void {
    if(!this.startDate || !this.endDate) 
      //throw warning 
      return;

    let dateRange: DateRange = { start: null, end: null };

    if(this.startDate.value instanceof Date) {
      dateRange.start = this.startDate.value;
    }

    if(this.endDate.value instanceof Date) {
      dateRange.end = this.endDate.value;
    }

    const nextRange = this.strategy.calculateSelection(value, dateRange);
 
    if(dateRange.start != nextRange.start)
      this.startDate.setValue(nextRange.start);

    if(dateRange.end != nextRange.end)
      this.endDate.setValue(nextRange.end);

    this.addDatesToCalendar(nextRange);
  }

  removeStartDateFromCalendar() {
    if(this.selecteDates.length) {
      this.selecteDates.splice(0, 1);
    }
  }

  removeEndDateFromCalendar() {
    if(this.selecteDates.length) {
      this.selecteDates.pop();
    }
  }

  addDatesToCalendar(range: DateRange) {
    const dates: Date[] = [];

    if(range.start) 
      dates.push(range.start);

    if (range.end)
      dates.push(range.end);

    this.selecteDates = dates;
  }
}
