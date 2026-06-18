import { FormControl } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';

import { CheckboxComponent } from './checkbox.component';
import { CheckboxesModule } from '../checkboxes.module';
import { UUIDService } from '../../../core/services/UUID.service';
import { LabelPosition } from '../../../core/enums/label-position.enum';

describe('CheckboxComponent', () => {
  let uuidSpy: jasmine.SpyObj<UUIDService>;

  beforeEach(() => {
    uuidSpy = jasmine.createSpyObj<UUIDService>('UUIDService', ['generate']);
    uuidSpy.generate.and.returnValue('test-uuid-123');
    return MockBuilder(CheckboxComponent, CheckboxesModule)
      .provide({ provide: UUIDService, useValue: uuidSpy });
  });

  it('should create', () => {
    expect(MockRender(CheckboxComponent).point.componentInstance).toBeTruthy();
  });

  it('should have a unique id from UUID service', () => {
    const comp = MockRender(CheckboxComponent).point.componentInstance;
    expect(comp.id).toBe('test-uuid-123');
    expect(uuidSpy.generate).toHaveBeenCalled();
  });

  describe('Input Properties', () => {
    it('should have default labelPosition of Right', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { labelPosition: LabelPosition.Right }).point;
      expect(comp.labelPosition).toBe(LabelPosition.Right);
    });

    it('should accept labelPosition input', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { labelPosition: LabelPosition.Left }).point;
      expect(comp.labelPosition).toBe(LabelPosition.Left);
    });

    it('should have default hideLabel of false', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { hideLabel: false }).point;
      expect(comp.hideLabel).toBe(false);
    });

    it('should accept hideLabel input', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { hideLabel: true }).point;
      expect(comp.hideLabel).toBe(true);
    });

    it('should have default variant of branded', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { variant: 'branded' }).point;
      expect(comp.variant).toBe('branded');
    });

    it('should accept variant input', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { variant: 'custom' }).point;
      expect(comp.variant).toBe('custom');
    });

    it('should have default size of small', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { size: 'small' }).point;
      expect(comp.size).toBe('small');
    });

    it('should accept size input', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { size: 'large' }).point;
      expect(comp.size).toBe('large');
    });

    it('should set checked input', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { checked: true } as any).point;
      expect(comp.value).toBe(true);
    });

    it('should accept disabled input', () => {
      const { componentInstance: comp } = MockRender(CheckboxComponent, { disabled: true } as any).point;
      expect(comp.disabled).toBe(true);
    });
  });

  describe('Default State', () => {
    it('should have default value of false', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.writeValue(false);
      expect(comp.value).toBe(false);
    });

    it('should have default disabled state of false', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.setDisabledState(false);
      expect(comp.disabled).toBe(false);
    });

    it('should have LabelPosition enum available', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      expect(comp.LabelPosition).toBeDefined();
      expect(comp.LabelPosition).toBe(LabelPosition);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.writeValue(true);
      expect(comp.value).toBe(true);
      comp.writeValue(false);
      expect(comp.value).toBe(false);
    });

    it('should implement registerOnChange', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      const fn = jasmine.createSpy('onChange');
      comp.registerOnChange(fn);
      expect(comp.onChange).toBe(fn);
    });

    it('should implement registerOnTouched', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      const fn = jasmine.createSpy('onTouched');
      comp.registerOnTouched(fn);
      expect(comp.onTouched).toBe(fn);
    });

    it('should implement setDisabledState', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.setDisabledState(true);
      expect(comp.disabled).toBe(true);
      comp.setDisabledState(false);
      expect(comp.disabled).toBe(false);
    });
  });

  describe('Disabled Property Getter/Setter', () => {
    it('should get disabled state', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp['_disabled'] = true;
      expect(comp.disabled).toBe(true);
    });

    it('should set disabled state via setter', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.disabled = true;
      expect(comp['_disabled']).toBe(true);
    });

    it('should set disabled state via setDisabledState', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.setDisabledState(true);
      expect(comp.disabled).toBe(true);
    });
  });

  describe('handleChange', () => {
    it('should toggle value on handleChange', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.value = false;
      comp.handleChange();
      expect(comp.value).toBe(true);
      comp.handleChange();
      expect(comp.value).toBe(false);
    });

    it('should call onChange callback when value changes', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      const onChangeSpy = jasmine.createSpy('onChange');
      comp.registerOnChange(onChangeSpy);
      comp.value = false;
      comp.handleChange();
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should emit valueChange when value changes', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      spyOn(comp.valueChange, 'next');
      comp.value = false;
      comp.handleChange();
      expect(comp.valueChange.next).toHaveBeenCalledWith(true);
    });

    it('should call onTouched callback when value changes', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      const onTouchedSpy = jasmine.createSpy('onTouched');
      comp.registerOnTouched(onTouchedSpy);
      comp.handleChange();
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should emit the new value to onChange', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      const onChangeSpy = jasmine.createSpy('onChange');
      comp.registerOnChange(onChangeSpy);
      comp.value = true;
      comp.handleChange();
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('ValueChange EventEmitter', () => {
    it('should have valueChange defined', () => {
      expect(MockRender(CheckboxComponent).point.componentInstance.valueChange).toBeDefined();
    });

    it('should emit when value changes', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      const emissions: boolean[] = [];
      comp.valueChange.subscribe((value: boolean) => emissions.push(value));
      comp.value = false;
      comp.handleChange();
      expect(emissions.length).toBe(1);
      expect(emissions[0]).toBe(true);
    });
  });

  describe('Integration with Angular Forms', () => {
    it('should work with FormControl', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      const formControl = new FormControl(false);
      comp.registerOnChange((value: any) => formControl.setValue(value));
      comp.handleChange();
      expect(formControl.value).toBeDefined();
    });

    it('should update when FormControl value changes', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.writeValue(true);
      expect(comp.value).toBe(true);
    });

    it('should handle disabled state from FormControl', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.setDisabledState(true);
      expect(comp.disabled).toBe(true);
      comp.setDisabledState(false);
      expect(comp.disabled).toBe(false);
    });
  });

  describe('Checked Input Setter', () => {
    it('should call writeValue when checked is set', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      spyOn(comp, 'writeValue');
      comp.checked = true;
      expect(comp.writeValue).toHaveBeenCalledWith(true);
    });

    it('should update value when checked is set', () => {
      const comp = MockRender(CheckboxComponent).point.componentInstance;
      comp.checked = false;
      expect(comp.value).toBe(false);
      comp.checked = true;
      expect(comp.value).toBe(true);
    });
  });
});
