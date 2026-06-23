import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';
import { isAfter, isBefore } from 'date-fns';

@Component({
  selector: 'uilibrary-calendar-select',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  standalone: false
})
export class CalendarComponent implements OnInit {
  currentDate!: Date;
  dateTracker!: Date;

  selectedMonth!: number;
  selectedMonthLiteral!: string;
  selectedYear!: number;

  @Output() dateSelected = new EventEmitter<Date>();

  mon = new Date('0001-01-01T00:00:00');
  tue = new Date('0001-02-01T00:00:00');
  wed = new Date('0001-03-01T00:00:00');
  thu = new Date('0001-04-01T00:00:00');
  fri = new Date('0001-05-01T00:00:00');
  sat = new Date('0001-06-01T00:00:00');
  sun = new Date('0001-07-01T00:00:00');

  weeksInMonth: (number | null)[][] = [];

  constructor(@Inject(LOCALE_ID) protected localeId: string,
    @Inject(DATE_NOW) protected today: Date) {
    this.currentDate = today;
  }

  @Input() selecteDates: Date[] | Date | undefined;

  ngOnInit(): void {
    let selectedDate: Date = this.currentDate;
    if (Array.isArray(this.selecteDates) && this.selecteDates.length > 0) {
      selectedDate = this.selecteDates[0];
      this.setDate(selectedDate);
    } else if (this.selecteDates instanceof Date && !isNaN(this.selecteDates.getTime())) {
      selectedDate = this.selecteDates;
      this.setDate(selectedDate);
    } else {
      this.setDate(selectedDate);
    }
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

  selectDay(day: number, month: number, year: number) {
    const selected = new Date(year, month, day, 12, 0, 0, 0);
    this.dateSelected.emit(selected);
  }

  setDate(date: Date): void {
    this.dateTracker = new Date(date);
    this.selectedMonth = date.getMonth();
    this.selectedMonthLiteral = date.toLocaleString(this.localeId, { month: 'long' });
    this.selectedYear = date.getFullYear();
    this.generateCalendar(this.selectedMonth, this.selectedYear);
  }

  isSelected(day: number): boolean {
    if (!this.selecteDates) return false;

    const selecteDate = new Date(
      this.selectedYear,
      this.selectedMonth,
      day
    );

    let isSelected: boolean = false;

    if (Array.isArray(this.selecteDates)) {
      for (let i = 0; i < this.selecteDates.length; i++) {
        let selected = this.selecteDates[i].getDate() === selecteDate.getDate() &&
          this.selecteDates[i].getMonth() === selecteDate.getMonth() &&
          this.selecteDates[i].getFullYear() === selecteDate.getFullYear()

        if (selected) {
          isSelected = true;
          break;
        }
      }
    } else {
      isSelected = this.selecteDates.getDate() === selecteDate.getDate() &&
        this.selecteDates.getMonth() === selecteDate.getMonth() &&
        this.selecteDates.getFullYear() === selecteDate.getFullYear()
    }

    return isSelected;
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

  isWithinActiveRange(day: number): boolean {
    const date = new Date(
      this.selectedYear,
      this.selectedMonth,
      day
    );

    if (Array.isArray(this.selecteDates) && this.selecteDates.length >= 2) {
      const dates = this.selecteDates.slice().sort((a, b) => a.getTime() - b.getTime());

      const firstDate = dates[0];
      const lastDate = dates[dates.length - 1];

      return isAfter(date, firstDate) && isBefore(date, lastDate);
    }

    return false;
  }
}