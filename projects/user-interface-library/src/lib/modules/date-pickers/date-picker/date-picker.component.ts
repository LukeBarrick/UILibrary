import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uilibrary-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  isOpen: boolean = false;

  currentDay: number = 0;
  currentMonth: number = 0;
  currentYear: number = 0;

  constructor() { }

  ngOnInit() {
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }
}
