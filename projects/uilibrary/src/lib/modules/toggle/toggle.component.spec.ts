/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToggleComponent } from './toggle.component';
import { LabelPosition } from '../../core/enums/label-position.enum';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); // Don't auto-detect changes to avoid template rendering issues
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a unique id', () => {
    expect(component.id).toBeDefined();
    expect(typeof component.id).toBe('string');
  });

  it('should have default value of false', () => {
    expect(component.value).toBe(false);
  });

  it('should have default disabled state of false', () => {
    expect(component.disabled).toBe(false);
  });

  it('should set default labelPosition to Left', () => {
    expect(component.labelPosition).toBe(LabelPosition.Left);
  });

  it('should set hideLabel default to false', () => {
    expect(component.hideLabel).toBe(false);
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      component.writeValue(true);
      expect(component.value).toBe(true);
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
      expect(component.disabled).toBe(true);
      
      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });

  describe('Input Properties', () => {
    it('should set checked input', () => {
      component.checked = true;
      expect(component.value).toBe(true);
    });

    it('should accept labelSize input', () => {
      component.labelSize = 'large';
      expect(component.labelSize).toBe('large');
    });

    it('should accept labelPosition input', () => {
      component.labelPosition = LabelPosition.Right;
      expect(component.labelPosition).toBe(LabelPosition.Right);
    });

    it('should accept hideLabel input', () => {
      component.hideLabel = true;
      expect(component.hideLabel).toBe(true);
    });

    it('should accept disabled input', () => {
      component.disabled = true;
      expect(component.disabled).toBe(true);
    });
  });

  describe('handleChange', () => {
    it('should toggle value on handleChange', () => {
      component.value = false;
      component.handleChange();
      expect(component.value).toBe(true);
      
      component.handleChange();
      expect(component.value).toBe(false);
    });

    it('should call onChange callback when value changes', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      component.value = false;
      component.handleChange();
      
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should call onTouched callback when value changes', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      component.handleChange();
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should emit the new value to onChange', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      component.value = true;
      component.handleChange();
      
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('Integration with Angular Forms', () => {
    it('should work with FormControl', () => {
      const formControl = new FormControl(false);
      component.registerOnChange((value: any) => formControl.setValue(value));
      
      component.handleChange();
      
      expect(formControl.value).toBe(true);
    });
  });
});
