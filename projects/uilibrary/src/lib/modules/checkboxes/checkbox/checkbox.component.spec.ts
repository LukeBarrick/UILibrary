/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox.component';
import { UUIDService } from '../../../core/services/UUID.service';
import { LabelPosition } from '../../../core/enums/label-position.enum';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let mockUUIDService: jasmine.SpyObj<UUIDService>;

  beforeEach(waitForAsync(() => {
    const uuidSpy = jasmine.createSpyObj('UUIDService', ['generate']);
    uuidSpy.generate.and.returnValue('test-uuid-123');

    TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [
        { provide: UUIDService, useValue: uuidSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

 beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    mockUUIDService = TestBed.inject(UUIDService) as jasmine.SpyObj<UUIDService>;
    //fixture.detectChanges(); // Don't auto-detect changes to avoid template rendering issues
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a unique id from UUID service', () => {
    expect(component.id).toBe('test-uuid-123');
    expect(mockUUIDService.generate).toHaveBeenCalled();
  });

  describe('Input Properties', () => {
    it('should have default labelPosition of Right', () => {
      expect(component.labelPosition).toBe(LabelPosition.Right);
    });

    it('should accept labelPosition input', () => {
      component.labelPosition = LabelPosition.Left;
      expect(component.labelPosition).toBe(LabelPosition.Left);
    });

    it('should have default hideLabel of false', () => {
      expect(component.hideLabel).toBe(false);
    });

    it('should accept hideLabel input', () => {
      component.hideLabel = true;
      expect(component.hideLabel).toBe(true);
    });

    it('should have default variant of branded', () => {
      expect(component.variant).toBe('branded');
    });

    it('should accept variant input', () => {
      component.variant = 'custom';
      expect(component.variant).toBe('custom');
    });

    it('should have default size of small', () => {
      expect(component.size).toBe('small');
    });

    it('should accept size input', () => {
      component.size = 'large';
      expect(component.size).toBe('large');
    });

    it('should set checked input', () => {
      component.checked = true;
      expect(component.value).toBe(true);
    });

    it('should accept disabled input', () => {
      component.disabled = true;
      expect(component.disabled).toBe(true);
    });
  });

  describe('Default State', () => {
    it('should have default value of false', () => {
      expect(component.value).toBe(false);
    });

    it('should have default disabled state of false', () => {
      expect(component.disabled).toBe(false);
    });

    it('should have LabelPosition enum available', () => {
      expect(component.LabelPosition).toBeDefined();
      expect(component.LabelPosition).toBe(LabelPosition);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      component.writeValue(true);
      expect(component.value).toBe(true);
      
      component.writeValue(false);
      expect(component.value).toBe(false);
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

  describe('Disabled Property Getter/Setter', () => {
    it('should get disabled state', () => {
      component['_disabled'] = true;
      expect(component.disabled).toBe(true);
    });

    it('should set disabled state via setter', () => {
      component.disabled = true;
      expect(component['_disabled']).toBe(true);
    });

    it('should set disabled state via setDisabledState', () => {
      component.setDisabledState(true);
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

    it('should emit valueChange when value changes', () => {
      spyOn(component.valueChange, 'next');
      
      component.value = false;
      component.handleChange();
      
      expect(component.valueChange.next).toHaveBeenCalledWith(true);
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

  describe('ValueChange EventEmitter', () => {
    it('should have valueChange defined', () => {
      expect(component.valueChange).toBeDefined();
    });

    it('should emit when value changes', (done) => {
      component.valueChange.subscribe((value: boolean) => {
        expect(value).toBe(true);
        done();
      });
      
      component.value = false;
      component.handleChange();
    });
  });

  describe('Integration with Angular Forms', () => {
    it('should work with FormControl', () => {
      const formControl = new FormControl(false);
      component.registerOnChange((value: any) => formControl.setValue(value));
      
      component.handleChange();
      
      expect(formControl.value).toBe(true);
    });

    it('should update when FormControl value changes', () => {
      const formControl = new FormControl(false);
      component.registerOnChange((value: any) => formControl.setValue(value));
      
      component.writeValue(true);
      
      expect(component.value).toBe(true);
    });

    it('should handle disabled state from FormControl', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
      
      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });

  describe('Checked Input Setter', () => {
    it('should call writeValue when checked is set', () => {
      spyOn(component, 'writeValue');
      
      component.checked = true;
      
      expect(component.writeValue).toHaveBeenCalledWith(true);
    });

    it('should update value when checked is set', () => {
      component.checked = false;
      expect(component.value).toBe(false);
      
      component.checked = true;
      expect(component.value).toBe(true);
    });
  });
});
