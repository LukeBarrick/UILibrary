import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, DestroyRef, ElementRef, EventEmitter, forwardRef, HostListener, inject, Input, OnDestroy, OnInit, Optional, Output, QueryList, Self, ViewChild, ViewChildren } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { NgControl } from '@angular/forms';
import { filter, map, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { StartDateDirective } from './start-date.directive';
import { EndDateDirective } from './end-date.directive';
import { DateSelectionStrategy } from '../date-selection-strategy';
import { DateRange } from '../date-range';

@Component({
    selector: 'uilibrary-date-range-input',
    templateUrl: './date-range-input.component.html',
    styleUrl: './date-range-input.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: UIFormFieldControl,
            useExisting: forwardRef(() => DateRangeInputComponent)
        }
    ],
    standalone: false
})
export class DateRangeInputComponent implements UIFormFieldControl<DateRange>, AfterContentInit, OnDestroy  {
  private elRef = inject(ElementRef<DateRangeInputComponent>);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  
  value: DateRange | null = null;

  readonly stateChanges = new Subject<void>();

  $startDateValueChanges: Subscription | undefined = undefined;
  $endDateValueChanges: Subscription | undefined = undefined;

  id: string = crypto.randomUUID();
  placeholder: string = '';
  private _disabled: boolean = false;
  private _focussed: boolean = false;
  
  _open: boolean = false;
  @Input() editable: boolean = true;
  @Input() closeOnSelection: boolean = true;
  
  @HostListener('document:mousedown', ['$event']) onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const parent = this.elRef.nativeElement.parentElement;

    if (this._open && !parent.contains(target)) {
      this._open = false;
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

  ngAfterContentInit(): void {
    if(this.startDate?.ngControl) {
      this.$startDateValueChanges = this.startDate.ngControl.valueChanges?.pipe(
        tap(() => this.removeStartDateFromCalendar()),
        filter(value => value instanceof Date),
        tap(value => this.addStartDateToCalendar(value))
      ).subscribe();
    }

    if(this.endDate?.ngControl) {
       console.log('end date registered');
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
    this.stateChanges.complete();
  }

  get empty(): boolean {
    return !!this.value;
  }

  get disabled() {
    return !!this.startDate?.disabled || !!this.endDate?.disabled;
  }

  get shouldLabelFloat(): boolean {
    return !!this.startDate?.shouldLabelFloat || !!this.endDate?.shouldLabelFloat || this._open;
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
    if(!this.disabled) {
      this._focussed = true;
      this._open = true;
      this.stateChanges.next();
      this.cdr.markForCheck();
    }
  }

  onBlur() {
    this._focussed = false;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  focus(): void {
    if(!this.disabled) {
       this._open = true;
       this.stateChanges.next();
       this.cdr.markForCheck();
    }
  }

  setValue(value: DateRange | null): void { 
    this.addDatesToCalendar(value ? value : {start: null, end: null});
  }

  selecteDates: Date[] = [];

  private addStartDateToCalendar(value: Date): void {
    let nextRange: DateRange = {start: value, end: null};

    if(this.endDate?.value instanceof Date) {
      nextRange.end = this.endDate.value;
    }

    this.addDatesToCalendar(nextRange);
  }

  private addEndDateToCalendar(value: Date): void {
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

    if(nextRange.start && nextRange.end && this.closeOnSelection) {
      this.close();
    }
  }

  private removeStartDateFromCalendar() {
    console.log('remove triggered')
    if(this.selecteDates.length) {
      this.selecteDates.splice(0, 1);
    }

     this.stateChanges.next();
    this.cdr.markForCheck();
  }

  private removeEndDateFromCalendar() {
    if(this.selecteDates.length) {
      this.selecteDates.pop();
    }
  }

  private addDatesToCalendar(range: DateRange) {
    const dates: Date[] = [];

    if(range.start) 
      dates.push(range.start);

    if (range.end)
      dates.push(range.end);

    this.selecteDates = dates;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  open(): void {
    this._open = true;
    this.stateChanges.next();
    this.cdr.markForCheck();

    if(!this.startDate?.value) 
      this.startDate?.focus();
    else if (!this.endDate?.value)
      this.endDate?.focus();
  }

  close(): void {
    this._open = false;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  setID(id: string): void {
    this.startDate?.setID(id);
    this.endDate?.setID(id);
  }
}
