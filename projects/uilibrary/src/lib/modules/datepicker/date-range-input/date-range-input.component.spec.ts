import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DateRangeInputComponent } from './date-range-input.component';
import { DateSelectionStrategy } from '../date-selection-strategy';
import { DateRange } from '../date-range';

class MockDateSelectionStrategy extends DateSelectionStrategy {
  calculateSelection(value: Date | null, current: DateRange): DateRange {
    return current;
  }
}

describe('DateRangeInputComponent', () => {
  let component: DateRangeInputComponent;
  let fixture: ComponentFixture<DateRangeInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DateRangeInputComponent],
      providers: [
        { provide: DateSelectionStrategy, useClass: MockDateSelectionStrategy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
