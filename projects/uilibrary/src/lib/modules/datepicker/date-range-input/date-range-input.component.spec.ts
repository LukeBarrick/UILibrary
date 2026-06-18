import { MockBuilder, MockRender } from 'ng-mocks';

import { DateRangeInputComponent } from './date-range-input.component';
import { DatepickerModule } from '../datepicker.module';
import { DateSelectionStrategy } from '../date-selection-strategy';
import { DateRange } from '../date-range';

class MockDateSelectionStrategy extends DateSelectionStrategy {
  calculateSelection(value: Date | null, current: DateRange): DateRange {
    return current;
  }
}

describe('DateRangeInputComponent', () => {
  beforeEach(() => MockBuilder(DateRangeInputComponent, DatepickerModule)
    .provide({ provide: DateSelectionStrategy, useClass: MockDateSelectionStrategy }));

  it('should create', () => {
    expect(MockRender(DateRangeInputComponent).point.componentInstance).toBeTruthy();
  });

  describe('stateChanges', () => {
    it('should emit stateChanges on onFocus', () => {
      const comp = MockRender(DateRangeInputComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp.onFocus();
      expect(count).toBe(1);
    });

    it('should emit stateChanges on onBlur', () => {
      const comp = MockRender(DateRangeInputComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp.onBlur();
      expect(count).toBe(1);
    });

    it('should emit stateChanges on close', () => {
      const comp = MockRender(DateRangeInputComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp.close();
      expect(count).toBe(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete stateChanges on destroy', () => {
      const comp = MockRender(DateRangeInputComponent).point.componentInstance;
      let completed = false;
      comp.stateChanges.subscribe({ complete: () => completed = true });
      comp.ngOnDestroy();
      expect(completed).toBe(true);
    });
  });
});
