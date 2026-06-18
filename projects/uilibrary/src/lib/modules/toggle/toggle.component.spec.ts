import { FormControl } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';

import { ToggleComponent } from './toggle.component';
import { ToggleModule } from './toggle.module';
import { LabelPosition } from '../../core/enums/label-position.enum';

describe('ToggleComponent', () => {
  beforeEach(() => MockBuilder(ToggleComponent, ToggleModule));

  it('should create', () => {
    expect(MockRender(ToggleComponent).point.componentInstance).toBeTruthy();
  });

  it('should have a unique id', () => {
    const comp = MockRender(ToggleComponent).point.componentInstance;
    expect(comp.id).toBeDefined();
    expect(typeof comp.id).toBe('string');
  });

  it('should reflect value of false when provided', () => {
    const { componentInstance: comp } = MockRender(ToggleComponent, { checked: false } as any).point;
    expect(comp.value).toBe(false);
  });

  it('should reflect disabled state of false when provided', () => {
    const { componentInstance: comp } = MockRender(ToggleComponent, { disabled: false }).point;
    expect(comp.disabled).toBe(false);
  });

  it('should reflect labelPosition Left when provided', () => {
    const { componentInstance: comp } = MockRender(ToggleComponent, { labelPosition: LabelPosition.Left }).point;
    expect(comp.labelPosition).toBe(LabelPosition.Left);
  });

  it('should reflect hideLabel false when provided', () => {
    const { componentInstance: comp } = MockRender(ToggleComponent, { hideLabel: false }).point;
    expect(comp.hideLabel).toBe(false);
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      comp.writeValue(true);
      expect(comp.value).toBe(true);
    });

    it('should implement registerOnChange', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      const fn = jasmine.createSpy('onChange');
      comp.registerOnChange(fn);
      expect(comp.onChange).toBe(fn);
    });

    it('should implement registerOnTouched', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      const fn = jasmine.createSpy('onTouched');
      comp.registerOnTouched(fn);
      expect(comp.onTouched).toBe(fn);
    });

    it('should implement setDisabledState', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      comp.setDisabledState(true);
      expect(comp.disabled).toBe(true);

      comp.setDisabledState(false);
      expect(comp.disabled).toBe(false);
    });
  });

  describe('Input Properties', () => {
    it('should set checked input', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      comp.checked = true;
      expect(comp.value).toBe(true);
    });

    it('should accept labelSize input', () => {
      const { componentInstance: comp } = MockRender(ToggleComponent, { labelSize: 'large' }).point;
      expect(comp.labelSize).toBe('large');
    });

    it('should accept labelPosition input', () => {
      const { componentInstance: comp } = MockRender(ToggleComponent, { labelPosition: LabelPosition.Right }).point;
      expect(comp.labelPosition).toBe(LabelPosition.Right);
    });

    it('should accept hideLabel input', () => {
      const { componentInstance: comp } = MockRender(ToggleComponent, { hideLabel: true }).point;
      expect(comp.hideLabel).toBe(true);
    });

    it('should accept disabled input', () => {
      const { componentInstance: comp } = MockRender(ToggleComponent, { disabled: true }).point;
      expect(comp.disabled).toBe(true);
    });
  });

  describe('handleChange', () => {
    it('should toggle value on handleChange', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      comp.value = false;
      comp.handleChange();
      expect(comp.value).toBe(true);

      comp.handleChange();
      expect(comp.value).toBe(false);
    });

    it('should call onChange callback when value changes', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      const onChangeSpy = jasmine.createSpy('onChange');
      comp.registerOnChange(onChangeSpy);
      comp.value = false;
      comp.handleChange();
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should call onTouched callback when value changes', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      const onTouchedSpy = jasmine.createSpy('onTouched');
      comp.registerOnTouched(onTouchedSpy);
      comp.handleChange();
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should emit the new value to onChange', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      const onChangeSpy = jasmine.createSpy('onChange');
      comp.registerOnChange(onChangeSpy);
      comp.value = true;
      comp.handleChange();
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('Integration with Angular Forms', () => {
    it('should work with FormControl', () => {
      const comp = MockRender(ToggleComponent).point.componentInstance;
      const formControl = new FormControl(false);
      comp.registerOnChange((value: any) => formControl.setValue(value));
      comp.handleChange();
      expect(formControl.value).toBeDefined();
    });
  });
});
