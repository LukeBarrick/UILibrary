import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
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
      multi: true 
    }
  ]
})
export class DatePickerComponent implements OnInit {
  public id = this.UUID.generate();

  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  @Input() placeholder: string = '';
  @Input() dualSelect: boolean = false;
  @Input() set isDisabled (disabled: boolean) {
    setTimeout(() => {
      this.disabled = disabled;
    }, 0)
  };
  @Output() isDisabledChange = new EventEmitter<boolean>();
  disabled: boolean = false;

  dateTracker = new Date();
  currentDay!: number;
  currentMonth!: number;
  currentYear!: number;
  currentMonthLiteral: string = '';
  daysInMonth: number[] = [];
  weeksInMonth: any[][] = [];

  selectedDate: Date | undefined;

  mon = new Date("1/1/0001 12:00:00");
  tue = new Date("1/2/0001 12:00:00");
  wed = new Date("1/3/0001 12:00:00");
  thu = new Date("1/4/0001 12:00:00");
  fri = new Date("1/5/0001 12:00:00");
  sat = new Date("1/6/0001 12:00:00");
  sun = new Date("1/7/0001 12:00:00");

  constructor(@Inject(LOCALE_ID) protected localeId: string,
              @Inject(DATE_NOW) protected today: Date,
              private readonly UUID: UUIDService,
              private readonly elRef: ElementRef
  ) { }

  ngOnInit() {
    if(this.value) {
      const datePipe = new DatePipe(this.localeId, null, { dateFormat: 'shortDate' });
      const formattedDate = datePipe.transform(this.value)
      if(formattedDate) {
        this.dateTracker = new Date(this.value);
        this.selectedDate = new Date(this.value);
        this.value = formattedDate;
      }
    }
 
    this.currentDay = this.dateTracker.getDay();
    this.currentMonth = this.dateTracker.getMonth();
    this.currentYear = this.dateTracker.getFullYear();
    this.currentMonthLiteral = this.dateTracker.toLocaleString(this.localeId, { month: 'long' }); //Localise
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if(value) {
      const datePipe = new DatePipe(this.localeId, null, { dateFormat: 'shortDate' });
      this.value = datePipe.transform(this.value);
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
    this.onTouched()
  }

  isOpen: boolean = false;

  open(): void {
    this.isOpen = true;
  }

  //Focus trap to ensure field doesn't lose focus for accessiblity reasons.
  @HostListener('document:click', ['$event']) onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
  
    if(this.isOpen && !this.elRef.nativeElement.contains(target)) {
      this.isOpen = false;
    } else if (this.isOpen) {
      let input = this.elRef.nativeElement.querySelector('input');
      input.focus();
    }
  }
  
  selectDate(day: number) {
    const date = new Date(this.currentYear, this.currentMonth, day);
    this.selectedDate = date;
    this.value = date.toDateString();

    const datePipe = new DatePipe(this.localeId, null, { dateFormat: 'shortDate' });
    this.value = datePipe.transform(date);

    this.onChange(this.value);
    this.onTouched();
    this.isOpen = false;
  }

  next(): void {
    if(this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
      this.dateTracker.setMonth(0);
      this.dateTracker.setFullYear(this.currentYear);
    } else {
      this.currentMonth++;
      this.dateTracker.setMonth(this.currentMonth);
    }

    this.currentMonthLiteral = this.dateTracker.toLocaleString(this.localeId, { month: 'long' }); //Localise
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  previous(): void {
    if(this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
      this.dateTracker.setMonth(11);
      this.dateTracker.setFullYear(this.currentYear);
    } else {
      this.currentMonth--;
      this.dateTracker.setMonth(this.currentMonth);
    }
    
    this.currentMonthLiteral = this.dateTracker.toLocaleString(this.localeId, { month: 'long' }); //Localise
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  generateCalendar(month: number, year: number) {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays: any[] = [];

    //Fill empty days
    for(let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    //Push days into array
    for(let day = 0; day < daysInMonth; day++) {
      calendarDays.push(day)
    }

    //Reset array, iterate and splice grouping by week
    this.weeksInMonth = [];
    while(calendarDays.length) {
      this.weeksInMonth.push(calendarDays.splice(0, 7))
    }
  }

  isToday(day: number): boolean {
    const todaysDate = new Date(this.currentYear, this.currentMonth, day);
  
    return (
      todaysDate.getDate() === this.today.getDate() &&
      todaysDate.getMonth() === this.today.getMonth() &&
      todaysDate.getFullYear() === this.today.getFullYear()
    )
  }

  isSelected(day:number): boolean {
    const selectedDate = new Date(this.currentYear, this.currentMonth, day);

    return (
      selectedDate.getDate() == this.selectedDate?.getDate() &&
      selectedDate.getMonth() == this.selectedDate?.getMonth() &&
      selectedDate.getFullYear() == this.selectedDate?.getFullYear()
    )
  }
}
