import { MockBuilder, MockRender } from 'ng-mocks';

import { RadioButtonComponent } from './button.component';
import { RadioModule } from '../radio.module';

describe('RadioButtonComponent', () => {
  beforeEach(() => MockBuilder(RadioButtonComponent, RadioModule));

  it('should create', () => {
    expect(MockRender(RadioButtonComponent).point.componentInstance).toBeTruthy();
  });

  it('should have a unique id', () => {
    const comp = MockRender(RadioButtonComponent).point.componentInstance;
    expect(comp.id).toBeDefined();
    expect(typeof comp.id).toBe('string');
  });

  it('should reflect disabled state of false when provided', () => {
    const { componentInstance: comp } = MockRender(RadioButtonComponent, { disabled: false }).point;
    expect(comp.disabled).toBe(false);
  });

  it('should reflect labelPosition left when provided', () => {
    const { componentInstance: comp } = MockRender(RadioButtonComponent, { labelPosition: 'left' }).point;
    expect(comp.labelPosition).toBe('left');
  });

  describe('Input Properties', () => {
    it('should accept value input', () => {
      const { componentInstance: comp } = MockRender(RadioButtonComponent, { value: 'option1' }).point;
      expect(comp.value).toBe('option1');
    });

    it('should accept checked input', () => {
      const { componentInstance: comp } = MockRender(RadioButtonComponent, { checked: true }).point;
      expect(comp.checked).toBe(true);
    });

    it('should accept disabled input', () => {
      const { componentInstance: comp } = MockRender(RadioButtonComponent, { disabled: true }).point;
      expect(comp.disabled).toBe(true);
    });

    it('should accept labelPosition input', () => {
      const { componentInstance: comp } = MockRender(RadioButtonComponent, { labelPosition: 'right' }).point;
      expect(comp.labelPosition).toBe('right');
    });
  });

  describe('check method', () => {
    it('should set checked to true when not disabled', () => {
      const comp = MockRender(RadioButtonComponent, { disabled: false }).point.componentInstance;
      comp.checked = false;
      comp.check();
      expect(comp.checked).toBe(true);
    });

    it('should emit checkedChange when checked', () => {
      const comp = MockRender(RadioButtonComponent, { disabled: false }).point.componentInstance;
      spyOn(comp.checkedChange, 'emit');
      comp.check();
      expect(comp.checkedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should not change checked state when disabled', () => {
      const comp = MockRender(RadioButtonComponent, { disabled: true }).point.componentInstance;
      comp.checked = false;
      comp.check();
      expect(comp.checked).toBe(false);
    });

    it('should not emit checkedChange when disabled', () => {
      const comp = MockRender(RadioButtonComponent, { disabled: true }).point.componentInstance;
      spyOn(comp.checkedChange, 'emit');
      comp.check();
      expect(comp.checkedChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('checkChanged method', () => {
    it('should emit checkedChange when not disabled', () => {
      const comp = MockRender(RadioButtonComponent, { disabled: false }).point.componentInstance;
      spyOn(comp.checkedChange, 'emit');
      comp.checkChanged();
      expect(comp.checkedChange.emit).toHaveBeenCalled();
    });

    it('should not emit checkedChange when disabled', () => {
      const comp = MockRender(RadioButtonComponent, { disabled: true }).point.componentInstance;
      spyOn(comp.checkedChange, 'emit');
      comp.checkChanged();
      expect(comp.checkedChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('Output Events', () => {
    it('should have checkedChange output', () => {
      expect(MockRender(RadioButtonComponent).point.componentInstance.checkedChange).toBeDefined();
    });

    it('should emit boolean value on checkedChange', () => {
      const comp = MockRender(RadioButtonComponent, { disabled: false }).point.componentInstance;
      const emissions: boolean[] = [];
      comp.checkedChange.subscribe((value: boolean) => emissions.push(value));
      comp.check();
      expect(emissions.length).toBeGreaterThan(0);
      expect(typeof emissions[0]).toBe('boolean');
    });
  });
});
