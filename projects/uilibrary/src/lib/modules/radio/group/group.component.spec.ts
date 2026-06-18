import { EventEmitter, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';

import { RadioGroupComponent } from './group.component';
import { RadioModule } from '../radio.module';
import { RadioButtonComponent } from '../button/button.component';

describe('RadioGroupComponent', () => {
  beforeEach(() => MockBuilder(RadioGroupComponent, RadioModule));

  it('should create', () => {
    expect(MockRender(RadioGroupComponent).point.componentInstance).toBeTruthy();
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      comp.writeValue('test');
      expect(comp.value).toBe('test');
    });

    it('should implement registerOnChange', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const fn = jasmine.createSpy('onChange');
      comp.registerOnChange(fn);
      expect(comp.onChange).toBe(fn);
    });

    it('should implement registerOnTouched', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const fn = jasmine.createSpy('onTouched');
      comp.registerOnTouched(fn);
      expect(comp.onTouched).toBe(fn);
    });

    it('should implement setDisabledState', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const mockButton1 = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      const mockButton2 = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      comp.radioButtons = new QueryList<RadioButtonComponent>();
      (comp.radioButtons as any)._results = [mockButton1, mockButton2];
      comp.setDisabledState!(true);
      expect(mockButton1.disabled).toBe(true);
      expect(mockButton2.disabled).toBe(true);
    });
  });

  describe('Input Properties', () => {
    it('should accept disabled input', (done) => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const mockButton = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      comp.radioButtons = new QueryList<RadioButtonComponent>();
      (comp.radioButtons as any)._results = [mockButton];
      comp.disabled = true;
      setTimeout(() => {
        expect(mockButton.disabled).toBe(true);
        done();
      }, 10);
    });

    it('should propagate disabled state to all radio buttons', (done) => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const mockButton1 = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      const mockButton2 = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      const mockButton3 = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      comp.radioButtons = new QueryList<RadioButtonComponent>();
      (comp.radioButtons as any)._results = [mockButton1, mockButton2, mockButton3];
      comp.disabled = true;
      setTimeout(() => {
        expect(mockButton1.disabled).toBe(true);
        expect(mockButton2.disabled).toBe(true);
        expect(mockButton3.disabled).toBe(true);
        done();
      }, 10);
    });
  });

  describe('Lifecycle Hooks', () => {
    it('should unsubscribe on destroy', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
      comp.$valueChanges = mockSubscription;
      comp.ngOnDestroy();
      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should not error if no subscription exists on destroy', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      comp.$valueChanges = undefined;
      expect(() => comp.ngOnDestroy()).not.toThrow();
    });

    it('should also unsubscribe radioButtonChanges on destroy', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const mockSub = jasmine.createSpyObj('Subscription', ['unsubscribe']);
      comp.$radioButtonChanges = mockSub;
      comp.ngOnDestroy();
      expect(mockSub.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('Subscription leak prevention', () => {
    it('should call onChange only once after updateRadioButtons is called multiple times', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const onChangeSpy = jasmine.createSpy('onChange');
      comp.registerOnChange(onChangeSpy);
      const mockButton = { value: 'a', checked: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      comp.radioButtons = new QueryList<RadioButtonComponent>();
      (comp.radioButtons as any)._results = [mockButton];
      (comp.radioButtons as any).dirty = true;
      (comp as any).updateRadioButtons();
      (comp as any).updateRadioButtons();
      mockButton.checkedChange.emit(true);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call onChange after the component is destroyed', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const onChangeSpy = jasmine.createSpy('onChange');
      comp.registerOnChange(onChangeSpy);
      const mockButton = { value: 'b', checked: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      comp.radioButtons = new QueryList<RadioButtonComponent>();
      (comp.radioButtons as any)._results = [mockButton];
      (comp.radioButtons as any).dirty = true;
      (comp as any).updateRadioButtons();
      comp.ngOnDestroy();
      mockButton.checkedChange.emit(true);
      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('ContentChildren Integration', () => {
    it('should query RadioButtonComponents', () => {
      expect(MockRender(RadioGroupComponent).point.componentInstance.radioButtons).toBeDefined();
    });
  });

  describe('Value Management', () => {
    it('should store value when writeValue is called', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      comp.writeValue('option2');
      expect(comp.value).toBe('option2');
    });

    it('should initialize with undefined value', () => {
      expect(MockRender(RadioGroupComponent).point.componentInstance.value).toBeUndefined();
    });
  });

  describe('Integration with Angular Forms', () => {
    it('should work with FormControl', () => {
      const comp = MockRender(RadioGroupComponent).point.componentInstance;
      const formControl = new FormControl('option1');
      comp.registerOnChange((value: any) => formControl.setValue(value));
      comp.value = 'option2';
      comp.onChange('option2');
      expect(formControl.value).toBe('option2');
    });
  });
});
