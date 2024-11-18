import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
} from '@angular/core';
import { UUIDService } from '../../../core/services/UUID.service';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uilibrary-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements OnInit {
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

  datePipe = new DatePipe(this.localeId, null, { dateFormat: 'shortDate' });

  selectedDate: Date[] = [];

  mon = new Date('1/1/0001 12:00:00');
  tue = new Date('1/2/0001 12:00:00');
  wed = new Date('1/3/0001 12:00:00');
  thu = new Date('1/4/0001 12:00:00');
  fri = new Date('1/5/0001 12:00:00');
  sat = new Date('1/6/0001 12:00:00');
  sun = new Date('1/7/0001 12:00:00');

  constructor(
    @Inject(LOCALE_ID) protected localeId: string,
    @Inject(DATE_NOW) protected today: Date,
    private readonly UUID: UUIDService,
    private readonly elRef: ElementRef
  ) {}

  ngOnInit() {
    if (this.value) {
      const formattedDate = this.datePipe.transform(this.value);
      if (formattedDate) {
        this.dateTracker = new Date(this.value);
        this.selectedDate.push(new Date(this.value));
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

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.value = this.datePipe.transform(this.value);
    } else {
      this.value = null;
    }
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
  }

  isOpen: boolean = false;

  open(): void {
    this.isOpen = true;
  }

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

  selectDate(day: number) {
    const date = new Date(this.selectedYear, this.selectedMonth, day);
    if (this.multi) {
      let index = this.selectedDate.findIndex(
        (_selecteDate) =>
          _selecteDate.getDate() === date.getDate() &&
          _selecteDate.getMonth() === date.getMonth() &&
          _selecteDate.getFullYear() === date.getFullYear()
      );

      if (index > -1) {
        this.selectedDate.splice(index, 1);
      }

      if (this.selectedDate.length < this.multiAmount && index === -1) {
        this.selectedDate.push(date);
      }

      if (this.selectedDate.length === this.multiAmount && this.closeOnSelect) {
        this.isOpen = false;
      }

      this.value = this.setMultiValue();
    } else {
      this.selectedDate.pop();
      this.selectedDate.push(date);
      this.value = date.toDateString();
      this.value = this.datePipe.transform(date);

      if(this.closeOnSelect) {
        this.isOpen = false;
      }
    }

    this.onChange(this.value);
    this.valueChange.next(this.value);
    this.onTouched();
  }

  setMultiValue(): string {
    let value: string = '';
    this.selectedDate.sort((a, b) => a.getTime() - b.getTime());

    for (let index = 0; index < this.selectedDate.length; index++) {
      const element = this.selectedDate[index];
      
      if(index + 1 === this.selectedDate.length) {
        value = value + this.datePipe.transform(element);

      } else {
        value = value + this.datePipe.transform(element) + ' - ';
      }
    }

    return value;
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

    return !!this.selectedDate.find(
      (_selecteDate) =>
        _selecteDate.getDate() === selecteDate.getDate() &&
        _selecteDate.getMonth() === selecteDate.getMonth() &&
        _selecteDate.getFullYear() === selecteDate.getFullYear()
    );
  }

  isWithinActiveRange(day: number): boolean {
    if(this.selectedDate.length <= 1) {
      return false;
    }

    const activeStartRange: Date = this.selectedDate[0];
    const activeEndRange: Date = this.selectedDate[this.selectedDate.length - 1];

    const currentDate = new Date(
      this.selectedYear,
      this.selectedMonth,
      day
    );

    return currentDate >= activeStartRange && currentDate <= activeEndRange;
  }
}
