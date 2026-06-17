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

  describe('stateChanges', () => {
    it('should emit stateChanges on onFocus', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component.onFocus();
      expect(count).toBe(1);
    });

    it('should emit stateChanges on onBlur', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component.onBlur();
      expect(count).toBe(1);
    });

    it('should emit stateChanges on close', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component.close();
      expect(count).toBe(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete stateChanges on destroy', () => {
      let completed = false;
      component.stateChanges.subscribe({ complete: () => completed = true });
      component.ngOnDestroy();
      expect(completed).toBe(true);
    });
  });
});
