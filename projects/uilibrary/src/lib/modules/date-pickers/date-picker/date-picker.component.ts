import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { UUIDService } from '../../../core/services/UUID.service';

@Component({
  selector: 'uilibrary-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
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

  currentDay!: number;
  currentMonth!: number;
  currentYear!: number;
  daysInMonth: number[] = [];
  weeksInMonth: any[][] = [];

  constructor(private UUID: UUIDService,
              private elRef: ElementRef
  ) {
    const today = new Date();
    this.currentDay = today.getDay();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  ngOnInit() {
    console.log('Date picker is work in progress, please do not use.')
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
