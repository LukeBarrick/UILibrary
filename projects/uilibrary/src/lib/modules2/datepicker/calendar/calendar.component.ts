import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';

@Component({
  selector: 'uilibrary-calendar-select',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  dateTracker = new Date();

  selectedMonth: number = this.currentDate.getMonth();
  selectedMonthLiteral = this.currentDate.toLocaleString(this.localeId, {
    month: 'long',
  });
  selectedYear: number = this.currentDate.getFullYear();

  mon = new Date('0001-01-01T00:00:00');
  tue = new Date('0001-02-01T00:00:00');
  wed = new Date('0001-03-01T00:00:00');
  thu = new Date('0001-04-01T00:00:00');
  fri = new Date('0001-05-01T00:00:00');
  sat = new Date('0001-06-01T00:00:00');
  sun = new Date('0001-07-01T00:00:00');

  weeksInMonth: (number | null)[][] = [];

  /**
   *
   */
  constructor(@Inject(LOCALE_ID) protected localeId: string,
              @Inject(DATE_NOW) protected today: Date) {

  }
  
  ngOnInit(): void {
    this.generateCalendar(this.selectedMonth, this.selectedYear);
  }

  generateCalendar(month: number, year: number) {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays: (number | null)[] = [
      ...new Array(firstDayOfMonth).fill(null), //Back fill empty calendar days
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    //Reset array, iterate and splice grouping by week
    this.weeksInMonth = [];
    while (calendarDays.length) {
      this.weeksInMonth.push(calendarDays.splice(0, 7));
    }
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
    });
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
    });
    this.generateCalendar(this.selectedMonth, this.selectedYear);
  }

}
