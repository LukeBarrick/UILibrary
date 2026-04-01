import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DatePickerInputComponent } from './datepicker-input.component';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';

describe('DatepickerInputComponent', () => {
  let component: DatePickerInputComponent;
  let fixture: ComponentFixture<DatePickerInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerInputComponent],
      providers: [
        { provide: DATE_NOW, useValue: new Date() }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
