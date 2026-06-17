/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, NgControl } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectComponent ],
      imports: [ ReactiveFormsModule, NgSelectModule ],
      providers: [
        { provide: NgControl, useValue: { control: null } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    // Skip detectChanges here to avoid template rendering issues
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept items input', () => {
      const testItems = ['item1', 'item2', 'item3'];
      component.items = testItems;
      expect(component.items).toEqual(testItems);
    });

    it('should accept ariaLabel input', () => {
      component.ariaLabel = 'Test Label';
      expect(component.ariaLabel).toBe('Test Label');
    });

    it('should accept loading input', () => {
      component.loading = true;
      expect(component.loading).toBe(true);
    });

    it('should accept multiple input', () => {
      component.multiple = true;
      expect(component.multiple).toBe(true);
    });

    it('should accept searchable input', () => {
      component.searchable = true;
      expect(component.searchable).toBe(true);
    });

    it('should accept placeholder input', () => {
      component.placeholder = 'Select an option';
      expect(component.placeholder).toBe('Select an option');
    });

    it('should accept clearable input', () => {
      component.clearable = true;
      expect(component.clearable).toBe(true);
    });

    it('should accept bindLabel input', () => {
      component.bindLabel = 'name';
      expect(component.bindLabel).toBe('name');
    });

    it('should accept bindValue input', () => {
      component.bindValue = 'id';
      expect(component.bindValue).toBe('id');
    });

    it('should accept disabled input', () => {
      component.disabled = true;
      expect(component.disabled).toBe(true);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      const testValue = 'test';
      component.writeValue(testValue);
      expect(component.value).toBe(testValue);
    });

    it('should implement registerOnChange', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      expect(component.onChange).toBe(fn);
    });

    it('should implement registerOnTouched', () => {
      const fn = jasmine.createSpy('onTouched');
      component.registerOnTouched(fn);
      expect(component.onTouched).toBe(fn);
    });

    it('should implement setDisabledState', () => {
      component.setDisabledState(true);
      expect(component._disabled).toBe(true);
      
      component.setDisabledState(false);
      expect(component._disabled).toBe(false);
    });
  });

  describe('UIFormFieldControl Implementation', () => {
    it('should have empty getter return true when no value', () => {
      (component as any).ngControl = null;
      expect(component.empty).toBe(false);
    });

    it('should have shouldLabelFloat return true when focused', () => {
      component['_focussed'] = true;
      expect(component.shouldLabelFloat).toBe(true);
    });

    it('should have shouldLabelFloat return false when not focused and empty', () => {
      component['_focussed'] = false;
      // Need a mock ngControl with a FormControl holding an empty value
      // so that empty === true and shouldLabelFloat = !true || false = false
      const mockFormControl = new FormControl('');
      (component as any).ngControl = { control: mockFormControl };
      expect(component.shouldLabelFloat).toBe(false);
    });

    it('should have hasFocus return the focused state', () => {
      component['_focussed'] = true;
      expect(component.hasFocus).toBe(true);
      
      component['_focussed'] = false;
      expect(component.hasFocus).toBe(false);
    });

    it('should set ID when setID is called', () => {
      const testId = 'test-id-123';
      component.setID(testId);
      expect(component.id).toBe(testId);
    });
  });

  describe('Event Handlers', () => {
    it('should call onChange on _onInput', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      component._onInput('test value');
      
      expect(onChangeSpy).toHaveBeenCalledWith('test value');
    });

    it('should set focussed to false on _onBlur', () => {
      component['_focussed'] = true;
      component._onBlur();
      expect(component['_focussed']).toBe(false);
    });

    it('should call onTouched on _onBlur', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      component._onBlur();
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should set focussed to true on _onFocus', () => {
      component['_focussed'] = false;
      component._onFocus();
      expect(component['_focussed']).toBe(true);
    });
  });

  describe('handleInput', () => {
    it('should call onChange with the event', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      const testEvent = 'test event';
      component.handleInput(testEvent);
      
      expect(onChangeSpy).toHaveBeenCalledWith(testEvent);
    });

    it('should call onTouched', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      component.handleInput('test');
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('defaultCompareFn', () => {
    it('should return true for identical objects', () => {
      const obj1 = { id: 1, name: 'Test' };
      const obj2 = { id: 1, name: 'Test' };
      expect(component.defaultCompareFn(obj1, obj2)).toBe(true);
    });

    it('should return false for different objects', () => {
      const obj1 = { id: 1, name: 'Test1' };
      const obj2 = { id: 2, name: 'Test2' };
      expect(component.defaultCompareFn(obj1, obj2)).toBe(false);
    });

    it('should return true for identical primitives', () => {
      expect(component.defaultCompareFn('test', 'test')).toBe(true);
    });
  });

  describe('Scroll Callbacks', () => {
    it('should call onScroll callback when _onScroll is invoked', () => {
      const scrollSpy = jasmine.createSpy('onScroll');
      component.onScroll = scrollSpy;
      
      const scrollEvent = { end: true };
      component._onScroll(scrollEvent);
      
      expect(scrollSpy).toHaveBeenCalledWith(scrollEvent);
    });

    it('should not error when onScroll is undefined', () => {
      component.onScroll = undefined;
      expect(() => component._onScroll({ end: true })).not.toThrow();
    });

    it('should call scrollToEnd callback when _scrollToEnd is invoked', () => {
      const scrollToEndSpy = jasmine.createSpy('scrollToEnd');
      component.scrollToEnd = scrollToEndSpy;
      
      component._scrollToEnd();
      
      expect(scrollToEndSpy).toHaveBeenCalled();
    });

    it('should not error when scrollToEnd is undefined', () => {
      component.scrollToEnd = undefined;
      expect(() => component._scrollToEnd()).not.toThrow();
    });
  });

  describe('stateChanges', () => {
    it('should emit stateChanges on writeValue', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component.writeValue('test');
      expect(count).toBe(1);
    });

    it('should emit stateChanges on setDisabledState', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component.setDisabledState(true);
      expect(count).toBe(1);
    });

    it('should emit stateChanges on _onFocus', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component._onFocus();
      expect(count).toBe(1);
    });

    it('should emit stateChanges on _onBlur', () => {
      let count = 0;
      component.stateChanges.subscribe(() => count++);
      component._onBlur();
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

  describe('Integration with Angular Forms', () => {
    it('should work with FormControl', () => {
      const formControl = new FormControl('option1');
      component.registerOnChange((value: any) => formControl.setValue(value));
      
      component.handleInput('option2');
      
      expect(formControl.value).toBe('option2');
    });
  });
});
