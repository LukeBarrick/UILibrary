import { FormControl, NgControl } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';

import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';

describe('SelectComponent', () => {
  beforeEach(() => MockBuilder(SelectComponent, SelectModule)
    .provide({ provide: NgControl, useValue: { control: null } }));

  it('should create', () => {
    expect(MockRender(SelectComponent).point.componentInstance).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept items input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const testItems = ['item1', 'item2', 'item3'];
      comp.items = testItems;
      expect(comp.items).toEqual(testItems);
    });

    it('should accept ariaLabel input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.ariaLabel = 'Test Label';
      expect(comp.ariaLabel).toBe('Test Label');
    });

    it('should accept loading input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.loading = true;
      expect(comp.loading).toBe(true);
    });

    it('should accept multiple input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.multiple = true;
      expect(comp.multiple).toBe(true);
    });

    it('should accept searchable input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.searchable = true;
      expect(comp.searchable).toBe(true);
    });

    it('should accept placeholder input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.placeholder = 'Select an option';
      expect(comp.placeholder).toBe('Select an option');
    });

    it('should accept clearable input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.clearable = true;
      expect(comp.clearable).toBe(true);
    });

    it('should accept bindLabel input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.bindLabel = 'name';
      expect(comp.bindLabel).toBe('name');
    });

    it('should accept bindValue input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.bindValue = 'id';
      expect(comp.bindValue).toBe('id');
    });

    it('should accept disabled input', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.disabled = true;
      expect(comp.disabled).toBe(true);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.writeValue('test');
      expect(comp.value).toBe('test');
    });

    it('should implement registerOnChange', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const fn = jasmine.createSpy('onChange');
      comp.registerOnChange(fn);
      expect(comp.onChange).toBe(fn);
    });

    it('should implement registerOnTouched', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const fn = jasmine.createSpy('onTouched');
      comp.registerOnTouched(fn);
      expect(comp.onTouched).toBe(fn);
    });

    it('should implement setDisabledState', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.setDisabledState(true);
      expect(comp._disabled).toBe(true);

      comp.setDisabledState(false);
      expect(comp._disabled).toBe(false);
    });
  });

  describe('UIFormFieldControl Implementation', () => {
    it('should have empty getter return false when no value', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      (comp as any).ngControl = null;
      expect(comp.empty).toBe(false);
    });

    it('should have shouldLabelFloat return true when focused', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp['_focussed'] = true;
      expect(comp.shouldLabelFloat).toBe(true);
    });

    it('should have shouldLabelFloat return false when not focused and empty', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp['_focussed'] = false;
      const mockFormControl = new FormControl('');
      (comp as any).ngControl = { control: mockFormControl };
      expect(comp.shouldLabelFloat).toBe(false);
    });

    it('should have hasFocus return the focused state', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp['_focussed'] = true;
      expect(comp.hasFocus).toBe(true);

      comp['_focussed'] = false;
      expect(comp.hasFocus).toBe(false);
    });

    it('should set ID when setID is called', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.setID('test-id-123');
      expect(comp.id).toBe('test-id-123');
    });
  });

  describe('Event Handlers', () => {
    it('should call onChange on _onInput', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const onChangeSpy = jasmine.createSpy('onChange');
      comp.registerOnChange(onChangeSpy);
      comp._onInput('test value');
      expect(onChangeSpy).toHaveBeenCalledWith('test value');
    });

    it('should set focussed to false on _onBlur', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp['_focussed'] = true;
      comp._onBlur();
      expect(comp['_focussed']).toBe(false);
    });

    it('should call onTouched on _onBlur', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const onTouchedSpy = jasmine.createSpy('onTouched');
      comp.registerOnTouched(onTouchedSpy);
      comp._onBlur();
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should set focussed to true on _onFocus', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp['_focussed'] = false;
      comp._onFocus();
      expect(comp['_focussed']).toBe(true);
    });
  });

  describe('handleInput', () => {
    it('should call onChange with the event', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const onChangeSpy = jasmine.createSpy('onChange');
      comp.registerOnChange(onChangeSpy);
      comp.handleInput('test event');
      expect(onChangeSpy).toHaveBeenCalledWith('test event');
    });

    it('should call onTouched', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const onTouchedSpy = jasmine.createSpy('onTouched');
      comp.registerOnTouched(onTouchedSpy);
      comp.handleInput('test');
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('defaultCompareFn', () => {
    it('should return true for identical objects', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const obj1 = { id: 1, name: 'Test' };
      const obj2 = { id: 1, name: 'Test' };
      expect(comp.defaultCompareFn(obj1, obj2)).toBe(true);
    });

    it('should return false for different objects', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const obj1 = { id: 1, name: 'Test1' };
      const obj2 = { id: 2, name: 'Test2' };
      expect(comp.defaultCompareFn(obj1, obj2)).toBe(false);
    });

    it('should return true for identical primitives', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      expect(comp.defaultCompareFn('test', 'test')).toBe(true);
    });

    it('should return true for objects with the same properties in different key order', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const obj1 = { b: 2, a: 1 };
      const obj2 = { a: 1, b: 2 };
      expect(comp.defaultCompareFn(obj1, obj2)).toBe(true);
    });
  });

  describe('Scroll Callbacks', () => {
    it('should call onScroll callback when _onScroll is invoked', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const scrollSpy = jasmine.createSpy('onScroll');
      comp.onScroll = scrollSpy;
      const scrollEvent = { end: true };
      comp._onScroll(scrollEvent);
      expect(scrollSpy).toHaveBeenCalledWith(scrollEvent);
    });

    it('should not error when onScroll is undefined', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.onScroll = undefined;
      expect(() => comp._onScroll({ end: true })).not.toThrow();
    });

    it('should call scrollToEnd callback when _scrollToEnd is invoked', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const scrollToEndSpy = jasmine.createSpy('scrollToEnd');
      comp.scrollToEnd = scrollToEndSpy;
      comp._scrollToEnd();
      expect(scrollToEndSpy).toHaveBeenCalled();
    });

    it('should not error when scrollToEnd is undefined', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      comp.scrollToEnd = undefined;
      expect(() => comp._scrollToEnd()).not.toThrow();
    });
  });

  describe('stateChanges', () => {
    it('should emit stateChanges on writeValue', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp.writeValue('test');
      expect(count).toBe(1);
    });

    it('should emit stateChanges on setDisabledState', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp.setDisabledState(true);
      expect(count).toBe(1);
    });

    it('should emit stateChanges on _onFocus', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp._onFocus();
      expect(count).toBe(1);
    });

    it('should emit stateChanges on _onBlur', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      let count = 0;
      comp.stateChanges.subscribe(() => count++);
      comp._onBlur();
      expect(count).toBe(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete stateChanges on destroy', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      let completed = false;
      comp.stateChanges.subscribe({ complete: () => completed = true });
      comp.ngOnDestroy();
      expect(completed).toBe(true);
    });
  });

  describe('Integration with Angular Forms', () => {
    it('should work with FormControl', () => {
      const comp = MockRender(SelectComponent).point.componentInstance;
      const formControl = new FormControl('option1');
      comp.registerOnChange((value: any) => formControl.setValue(value));
      comp.handleInput('option2');
      expect(formControl.value).toBe('option2');
    });
  });
});
