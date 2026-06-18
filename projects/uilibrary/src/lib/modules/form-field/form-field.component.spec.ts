import { Subject } from 'rxjs';
import { MockBuilder, MockRender } from 'ng-mocks';

import { FormFieldComponent } from './form-field.component';
import { FormFieldModule } from './form-field.module';
import { UIFormFieldControl } from './form-field-control';
import { UIPrefix } from './directives/UIPrefix';
import { UISuffix } from './directives/UISuffix';

class MockFormFieldControl extends UIFormFieldControl<any> {
  override value: any = '';
  override stateChanges = new Subject<void>();
  override id: string = 'mock-id';
  override placeholder: string = 'mock-placeholder';
  override empty: boolean = false;
  override shouldLabelFloat: boolean = false;
  override disabled: boolean = false;
  override hasErrors: boolean = false;
  override hasFocus: boolean = false;
  override touched: boolean = false;
  override dirty: boolean = false;
  override ngControl!: any;

  override focus(): void {}
  override setValue(value: any): void { this.value = value; }
  override setID(id: string): void { this.id = id; }
}

describe('FormFieldComponent', () => {
  beforeEach(() => MockBuilder(FormFieldComponent, FormFieldModule));

  it('should create', () => {
    expect(MockRender(FormFieldComponent).point.componentInstance).toBeTruthy();
  });

  it('should generate a unique uuid', () => {
    const comp = MockRender(FormFieldComponent).point.componentInstance;
    expect(comp.uuid).toBeDefined();
    expect(typeof comp.uuid).toBe('string');
    expect(comp.uuid.length).toBeGreaterThan(0);
  });

  describe('Input Properties', () => {
    it('should accept labelFloatOverride input', () => {
      const { componentInstance: comp } = MockRender(FormFieldComponent, { labelFloatOverride: true }).point;
      expect(comp.labelFloatOverride).toBe(true);
    });

    it('should initialize labelFloatOverride as undefined', () => {
      const { componentInstance: comp } = MockRender(FormFieldComponent, { labelFloatOverride: undefined }).point;
      expect(comp.labelFloatOverride).toBeUndefined();
    });
  });

  describe('ContentChild Queries', () => {
    it('should have formFieldControl as undefined before content projection', () => {
      expect(MockRender(FormFieldComponent).point.componentInstance.formFieldControl).toBeUndefined();
    });

    it('should have prefix as undefined before content projection', () => {
      expect(MockRender(FormFieldComponent).point.componentInstance.prefix).toBeUndefined();
    });

    it('should have suffix as undefined before content projection', () => {
      expect(MockRender(FormFieldComponent).point.componentInstance.suffix).toBeUndefined();
    });
  });

  describe('Getters', () => {
    it('should return formFieldControl via _control getter', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      comp.formFieldControl = mockControl;
      expect(comp._control).toBe(mockControl);
    });

    it('should return prefix via _prefix getter', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockPrefix = {} as UIPrefix;
      comp.prefix = mockPrefix;
      expect(comp._prefix).toBe(mockPrefix);
    });

    it('should return suffix via _suffix getter', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockSuffix = {} as UISuffix;
      comp.suffix = mockSuffix;
      expect(comp._suffix).toBe(mockSuffix);
    });
  });

  describe('initialiseControl', () => {
    it('should set control ID when control is present', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      spyOn(mockControl, 'setID');
      comp.formFieldControl = mockControl;
      comp.ngAfterContentInit();
      expect(mockControl.setID).toHaveBeenCalledWith(comp.uuid);
    });

    it('should subscribe to control stateChanges', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      comp.formFieldControl = mockControl;
      comp.ngAfterContentInit();
      expect(comp.stateChanges).toBeDefined();
    });

    it('should call markForCheck when stateChanges emits', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      comp.formFieldControl = mockControl;
      comp.ngAfterContentInit();
      const cdr = (comp as any).cdr;
      spyOn(cdr, 'markForCheck');
      mockControl.stateChanges.next();
      expect(cdr.markForCheck).toHaveBeenCalled();
    });

    it('should handle undefined control gracefully', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      comp.formFieldControl = undefined;
      expect(() => comp.ngAfterContentInit()).not.toThrow();
    });
  });

  describe('focusControl', () => {
    it('should call focus on the control', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      spyOn(mockControl, 'focus');
      comp.formFieldControl = mockControl;
      comp.focusControl();
      expect(mockControl.focus).toHaveBeenCalled();
    });

    it('should handle undefined control gracefully', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      comp.formFieldControl = undefined;
      expect(() => comp.focusControl()).not.toThrow();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from stateChanges', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      comp.formFieldControl = mockControl;
      comp.ngAfterContentInit();
      spyOn(comp.stateChanges!, 'unsubscribe');
      comp.ngOnDestroy();
      expect(comp.stateChanges!.unsubscribe).toHaveBeenCalled();
    });

    it('should handle undefined stateChanges', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      comp.stateChanges = undefined;
      expect(() => comp.ngOnDestroy()).not.toThrow();
    });
  });

  describe('Host Bindings', () => {
    it('should have form-field-disabled class when control is disabled', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      mockControl.disabled = true;
      comp.formFieldControl = mockControl;
      expect(comp._control?.disabled).toBe(true);
    });

    it('should have form-field-label-float class when shouldLabelFloat is true', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      mockControl.shouldLabelFloat = true;
      comp.formFieldControl = mockControl;
      expect(comp._control?.shouldLabelFloat).toBe(true);
    });

    it('should have form-field-errors class when control has errors', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      mockControl.hasErrors = true;
      comp.formFieldControl = mockControl;
      expect(comp._control?.hasErrors).toBe(true);
    });

    it('should have form-field-touched class when control is touched', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      mockControl.touched = true;
      comp.formFieldControl = mockControl;
      expect(comp._control?.touched).toBe(true);
    });

    it('should have form-field-dirty class when control is dirty', () => {
      const comp = MockRender(FormFieldComponent).point.componentInstance;
      const mockControl = new MockFormFieldControl();
      mockControl.dirty = true;
      comp.formFieldControl = mockControl;
      expect(comp._control?.dirty).toBe(true);
    });
  });

  describe('Value Property', () => {
    it('should have default value of 1', () => {
      expect(MockRender(FormFieldComponent).point.componentInstance.value).toBe(1);
    });
  });

  describe('Empty Property', () => {
    it('should have default empty value of true', () => {
      expect(MockRender(FormFieldComponent).point.componentInstance.empty).toBe(true);
    });
  });
});
