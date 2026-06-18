import { MockBuilder, MockRender } from 'ng-mocks';

import { DatePickerInputComponent } from './datepicker-input.component';
import { DatepickerModule } from '../datepicker.module';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';

describe('DatepickerInputComponent', () => {
  beforeEach(() => MockBuilder(DatePickerInputComponent, DatepickerModule)
    .provide({ provide: DATE_NOW, useValue: new Date() }));

  it('should create', () => {
    expect(MockRender(DatePickerInputComponent).point.componentInstance).toBeTruthy();
  });

  describe('stateChanges', () => {
    it('should emit stateChanges on writeValue', () => {
      const comp = MockRender(DatePickerInputComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp.writeValue(new Date());
      expect(count).toBe(1);
    });

    it('should emit stateChanges on setDisabledState', () => {
      const comp = MockRender(DatePickerInputComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp.setDisabledState!(true);
      expect(count).toBe(1);
    });

    it('should emit stateChanges on onFocus', () => {
      const comp = MockRender(DatePickerInputComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp.onFocus();
      expect(count).toBe(1);
    });

    it('should emit stateChanges on close', () => {
      const comp = MockRender(DatePickerInputComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp.close();
      expect(count).toBe(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete stateChanges on destroy', () => {
      const comp = MockRender(DatePickerInputComponent).point.componentInstance;
      let completed = false;
      comp.stateChanges.subscribe({ complete: () => completed = true });
      comp.ngOnDestroy();
      expect(completed).toBe(true);
    });
  });
});
