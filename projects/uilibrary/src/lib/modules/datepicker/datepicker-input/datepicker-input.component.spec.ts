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

  describe('stateChanges', () => {
    it('should emit stateChanges on writeValue', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component.writeValue(new Date());
      expect(count).toBe(1);
    });

    it('should emit stateChanges on setDisabledState', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component.setDisabledState!(true);
      expect(count).toBe(1);
    });

    it('should emit stateChanges on onFocus', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component.onFocus();
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
