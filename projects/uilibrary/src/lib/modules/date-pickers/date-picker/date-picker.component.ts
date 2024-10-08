import { Component, ElementRef, HostListener, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { UUIDService } from '../../../core/services/UUID.service';

@Component({
  selector: 'uilibrary-date-picker',
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit {
  public id = this.UUID.generate();
  public value: string | undefined = undefined;

  @Input() placeholder: string = "";
  
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

  today = new Date();

  currentDay!: number;
  currentMonth!: number;
  currentYear!: number;
  currentMonthLiteral: string = '';
  daysInMonth: number[] = [];
  weeksInMonth: any[][] = [];

  constructor(@Inject(LOCALE_ID) protected localeId: string,
              private readonly UUID: UUIDService,
              private readonly elRef: ElementRef,
  ) {
    
    this.currentDay = this.today.getDay();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.currentMonthLiteral = this.today.toLocaleString(this.localeId, { month: 'long' }); //Localise
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  ngOnInit() {
    console.log('Date picker is work in progress, please do not use.');
    console.log(this.localeId)
  }
  
  selectDate(day: number) {
    const date = new Date(day, this.currentMonth, this.currentYear);
  }

  next(): void {
    if(this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
      this.today.setMonth(0);
      this.today.setFullYear(this.currentYear);
    } else {
      this.currentMonth++;
      this.today.setMonth(this.currentMonth);
    }

    this.currentMonthLiteral = this.today.toLocaleString(this.localeId, { month: 'long' }); //Localise
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  previous(): void {
    if(this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
      this.today.setMonth(11);
      this.today.setFullYear(this.currentYear);
    } else {
      this.currentMonth--;
      this.today.setMonth(this.currentMonth);
    }
    
    this.currentMonthLiteral = this.today.toLocaleString(this.localeId, { month: 'long' }); //Localise
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
}
