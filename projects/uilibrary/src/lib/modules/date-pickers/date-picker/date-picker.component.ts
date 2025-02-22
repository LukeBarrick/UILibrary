import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self
} from '@angular/core';
import { UUIDService } from '../../../core/services/UUID.service';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';
import { DatePipe, FormatWidth, getLocaleDateFormat } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { parse } from 'date-fns';
import { DatePickerInputComponent } from './date-picker-input/date-picker-input.component';

@Component({
  selector: 'uilibrary-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
  ],
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {

  @ContentChildren(DatePickerInputComponent) child!: QueryList<DatePickerInputComponent>;


  public id = this.UUID.generate();

  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string | null>();

  @Input() placeholder: string = '';
  @Input() multi: boolean = false;
  @Input() multiAmount: number = 2;
  @Input() closeOnSelect: boolean = true;
  @Input() set isDisabled(disabled: boolean) {
    setTimeout(() => {
      this.disabled = disabled;
    }, 0);
  }
  @Output() isDisabledChange = new EventEmitter<boolean>();
  disabled: boolean = false;

  dateTracker = new Date();
  currentDay!: number;
  selectedMonth!: number;
  selectedYear!: number;
  selectedMonthLiteral: string = '';
  daysInMonth: number[] = [];
  weeksInMonth: any[][] = [];

  isOpen: boolean = false;

  datePipe = new DatePipe(this.localeId, null, { dateFormat: 'shortDate' });

  selectedDates: Date[] = [];

  mon = new Date('0001-01-01T00:00:00');
  tue = new Date('0001-02-01T00:00:00');
  wed = new Date('0001-03-01T00:00:00');
  thu = new Date('0001-04-01T00:00:00');
  fri = new Date('0001-05-01T00:00:00');
  sat = new Date('0001-06-01T00:00:00');
  sun = new Date('0001-07-01T00:00:00');

  //Focus trap to ensure field doesn't lose focus for accessiblity reasons.
  @HostListener('document:click', ['$event']) onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (this.isOpen && !this.elRef.nativeElement.contains(target)) {
      this.isOpen = false;
    } else if (this.isOpen) {
      let input = this.elRef.nativeElement.querySelector('input');
      input.focus();
    }
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Inject(LOCALE_ID) protected localeId: string,
    @Inject(DATE_NOW) protected today: Date,
    private readonly UUID: UUIDService,
    private readonly elRef: ElementRef,
  ) {
    if(this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.value) {
      const formattedDate = this.datePipe.transform(this.value);
      if (formattedDate) {
        this.dateTracker = new Date(this.value);
        this.selectedDates.push(new Date(this.value));
        this.value = formattedDate;
      }
    }

    this.currentDay = this.dateTracker.getDay();
    this.selectedMonth = this.dateTracker.getMonth();
    this.selectedYear = this.dateTracker.getFullYear();
    this.selectedMonthLiteral = this.dateTracker.toLocaleString(this.localeId, {
      month: 'long',
    });
    this.generateCalendar(this.selectedMonth, this.selectedYear);
  }

  open(): void {
    this.isOpen = true;
    console.log(this.child)

    this.child.get(0)?.writeValue(new Date().toISOString())
    this.child.get(0)?.handleChange()

    this.child.get(1)?.writeValue(new Date().toISOString())
    this.child.get(1)?.handleChange()
    
    console.log(this.localeId)

    console.log(this.child.get(0)?.value)
    console.log(this.child.get(1)?.value)
  }


  selectDate(day: number) {
    const date = new Date(this.selectedYear, this.selectedMonth, day);
    if (this.multi) {
      let index = this.selectedDates.findIndex(
        (_selecteDate) =>
          _selecteDate.getDate() === date.getDate() &&
          _selecteDate.getMonth() === date.getMonth() &&
          _selecteDate.getFullYear() === date.getFullYear()
      );

      //Remove an already selected date
      if (index > -1) {
        this.selectedDates.splice(index, 1);
      }

      if (this.selectedDates.length < this.multiAmount && index === -1) {
        this.selectedDates.push(date);
      }

      if (this.selectedDates.length === this.multiAmount && this.closeOnSelect) {
        this.isOpen = false;
      }

    } else {
      this.selectedDates = [];
      this.selectedDates.push(date);

      if(this.closeOnSelect) {
        this.isOpen = false;
      }
    }

    this.onChange(this.value);
    this.valueChange.next(this.value);
    this.onTouched();
  }


  next(): void {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
      this.dateTracker.setMonth(0);
      this.dateTracker.setFullYear(this.selectedYear);
    } else {
      this.selectedMonth++;
      this.dateTracker.setMonth(this.selectedMonth);
    }

    this.selectedMonthLiteral = this.dateTracker.toLocaleString(this.localeId, {
      month: 'long',
    }); //Localise
    this.generateCalendar(this.selectedMonth, this.selectedYear);
  }

  previous(): void {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
      this.dateTracker.setMonth(11);
      this.dateTracker.setFullYear(this.selectedYear);
    } else {
      this.selectedMonth--;
      this.dateTracker.setMonth(this.selectedMonth);
    }

    this.selectedMonthLiteral = this.dateTracker.toLocaleString(this.localeId, {
      month: 'long',
    }); //Localise
    this.generateCalendar(this.selectedMonth, this.selectedYear);
  }

  generateCalendar(month: number, year: number) {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays: any[] = [];

    //Fill empty days
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    //Push days into array
    for (let day = 0; day < daysInMonth; day++) {
      calendarDays.push(day);
    }

    //Reset array, iterate and splice grouping by week
    this.weeksInMonth = [];
    while (calendarDays.length) {
      this.weeksInMonth.push(calendarDays.splice(0, 7));
    }
  }

  isToday(day: number): boolean {
    const todaysDate = new Date(
      this.selectedYear,
      this.selectedMonth,
      day
    );

    return (
      todaysDate.getDate() === this.today.getDate() &&
      todaysDate.getMonth() === this.today.getMonth() &&
      todaysDate.getFullYear() === this.today.getFullYear()
    );
  }

  isSelected(day: number): boolean {
    const selecteDate = new Date(
      this.selectedYear,
      this.selectedMonth,
      day
    );

    return !!this.selectedDates.find(
      (_selecteDate) =>
        _selecteDate.getDate() === selecteDate.getDate() &&
        _selecteDate.getMonth() === selecteDate.getMonth() &&
        _selecteDate.getFullYear() === selecteDate.getFullYear()
    );
  }

  isWithinActiveRange(day: number): boolean {
    if(this.selectedDates.length <= 1) {
      return false;
    }

    const activeStartRange: Date = this.selectedDates[0];
    const activeEndRange: Date = this.selectedDates[this.selectedDates.length - 1];

    const currentDate = new Date(
      this.selectedYear,
      this.selectedMonth,
      day
    );

    return currentDate >= activeStartRange && currentDate <= activeEndRange;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value; //this doesn't work as it parses the full date + only can handle one date
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleChange() {
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }
}
