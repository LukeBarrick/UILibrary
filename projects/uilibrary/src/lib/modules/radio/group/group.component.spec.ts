/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, NO_ERRORS_SCHEMA, QueryList } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { RadioGroupComponent } from './group.component';
import { RadioButtonComponent } from '../button/button.component';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioGroupComponent, RadioButtonComponent ],
      imports: [ ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      // Create mock radio buttons
      const mockButton1 = { disabled: false } as RadioButtonComponent;
      const mockButton2 = { disabled: false } as RadioButtonComponent;
      component.radioButtons = new QueryList<RadioButtonComponent>();
      (component.radioButtons as any)._results = [mockButton1, mockButton2];

      component.setDisabledState!(true);
      
      expect(mockButton1.disabled).toBe(true);
      expect(mockButton2.disabled).toBe(true);
    });
  });

  describe('Input Properties', () => {
    it('should accept disabled input', (done) => {
      const mockButton = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      component.radioButtons = new QueryList<RadioButtonComponent>();
      (component.radioButtons as any)._results = [mockButton];
      
      component.disabled = true;
      
      setTimeout(() => {
        expect(mockButton.disabled).toBe(true);
        done();
      }, 10);
    });

    it('should propagate disabled state to all radio buttons', (done) => {
      const mockButton1 = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      const mockButton2 = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      const mockButton3 = { disabled: false, checkedChange: new EventEmitter<boolean>() } as unknown as RadioButtonComponent;
      component.radioButtons = new QueryList<RadioButtonComponent>();
      (component.radioButtons as any)._results = [mockButton1, mockButton2, mockButton3];
      
      component.disabled = true;
      
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
      const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
      component.$valueChanges = mockSubscription;
      
      component.ngOnDestroy();
      
      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should not error if no subscription exists on destroy', () => {
      component.$valueChanges = undefined;
      
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('ContentChildren Integration', () => {
    it('should query RadioButtonComponents', () => {
      expect(component.radioButtons).toBeDefined();
    });
  });

  describe('Value Management', () => {
    it('should store value when writeValue is called', () => {
      const testValue = 'option2';
      component.writeValue(testValue);
      expect(component.value).toBe(testValue);
    });

    it('should initialize with undefined value', () => {
      expect(component.value).toBeUndefined();
    });
  });

  describe('Integration with Angular Forms', () => {
    it('should work with FormControl', () => {
      const formControl = new FormControl('option1');
      component.registerOnChange((value: any) => formControl.setValue(value));
      
      component.value = 'option2';
      component.onChange('option2');
      
      expect(formControl.value).toBe('option2');
    });
  });
});
