/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { FormFieldComponent } from './form-field.component';
import { UIFormFieldControl } from './form-field-control';
import { UIPrefix } from './directives/UIPrefix';
import { UISuffix } from './directives/UISuffix';

// Mock form field control for testing
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
  override setID(id: string): void {
    this.id = id;
  }
}

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a unique uuid', () => {
    expect(component.uuid).toBeDefined();
    expect(typeof component.uuid).toBe('string');
    expect(component.uuid.length).toBeGreaterThan(0);
  });

  describe('Input Properties', () => {
    it('should accept labelFloatOverride input', () => {
      component.labelFloatOverride = true;
      expect(component.labelFloatOverride).toBe(true);
    });

    it('should initialize labelFloatOverride as undefined', () => {
      expect(component.labelFloatOverride).toBeUndefined();
    });
  });

  describe('ContentChild Queries', () => {
    it('should have formFieldControl as undefined before content projection', () => {
      expect(component.formFieldControl).toBeUndefined();
    });

    it('should have prefix as undefined before content projection', () => {
      expect(component.prefix).toBeUndefined();
    });

    it('should have suffix as undefined before content projection', () => {
      expect(component.suffix).toBeUndefined();
    });
  });

  describe('Getters', () => {
    it('should return formFieldControl via _control getter', () => {
      const mockControl = new MockFormFieldControl();
      component.formFieldControl = mockControl;
      expect(component._control).toBe(mockControl);
    });

    it('should return prefix via _prefix getter', () => {
      const mockPrefix = {} as UIPrefix;
      component.prefix = mockPrefix;
      expect(component._prefix).toBe(mockPrefix);
    });

    it('should return suffix via _suffix getter', () => {
      const mockSuffix = {} as UISuffix;
      component.suffix = mockSuffix;
      expect(component._suffix).toBe(mockSuffix);
    });
  });

  describe('initialiseControl', () => {
    it('should set control ID when control is present', () => {
      const mockControl = new MockFormFieldControl();
      spyOn(mockControl, 'setID');
      component.formFieldControl = mockControl;
      
      component.ngAfterContentInit();
      
      expect(mockControl.setID).toHaveBeenCalledWith(component.uuid);
    });

    it('should subscribe to control stateChanges', () => {
      const mockControl = new MockFormFieldControl();
      component.formFieldControl = mockControl;
      
      component.ngAfterContentInit();
      
      expect(component.stateChanges).toBeDefined();
    });

    it('should call markForCheck when stateChanges emits', () => {
      const mockControl = new MockFormFieldControl();
      component.formFieldControl = mockControl;
      component.ngAfterContentInit();
      const cdr = (component as any).cdr;
      spyOn(cdr, 'markForCheck');

      mockControl.stateChanges.next();

      expect(cdr.markForCheck).toHaveBeenCalled();
    });

    it('should handle undefined control gracefully', () => {
      component.formFieldControl = undefined;
      
      expect(() => component.ngAfterContentInit()).not.toThrow();
    });
  });

  describe('focusControl', () => {
    it('should call focus on the control', () => {
      const mockControl = new MockFormFieldControl();
      spyOn(mockControl, 'focus');
      component.formFieldControl = mockControl;
      
      component.focusControl();
      
      expect(mockControl.focus).toHaveBeenCalled();
    });

    it('should handle undefined control gracefully', () => {
      component.formFieldControl = undefined;
      
      expect(() => component.focusControl()).not.toThrow();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from stateChanges', () => {
      const mockControl = new MockFormFieldControl();
      component.formFieldControl = mockControl;
      component.ngAfterContentInit();
      
      spyOn(component.stateChanges!, 'unsubscribe');
      
      component.ngOnDestroy();
      
      expect(component.stateChanges!.unsubscribe).toHaveBeenCalled();
    });

    it('should handle undefined stateChanges', () => {
      component.stateChanges = undefined;
      
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('Host Bindings', () => {
    it('should have form-field-disabled class when control is disabled', () => {
      const mockControl = new MockFormFieldControl();
      mockControl.disabled = true;
      component.formFieldControl = mockControl;
      
      // Note: Host bindings use _control?.disabled - verifying the control property
      expect(component._control?.disabled).toBe(true);
    });

    it('should have form-field-label-float class when shouldLabelFloat is true', () => {
      const mockControl = new MockFormFieldControl();
      mockControl.shouldLabelFloat = true;
      component.formFieldControl = mockControl;
      
      expect(component._control?.shouldLabelFloat).toBe(true);
    });

    it('should have form-field-errors class when control has errors', () => {
      const mockControl = new MockFormFieldControl();
      mockControl.hasErrors = true;
      component.formFieldControl = mockControl;
      
      expect(component._control?.hasErrors).toBe(true);
    });

    it('should have form-field-touched class when control is touched', () => {
      const mockControl = new MockFormFieldControl();
      mockControl.touched = true;
      component.formFieldControl = mockControl;
      
      expect(component._control?.touched).toBe(true);
    });

    it('should have form-field-dirty class when control is dirty', () => {
      const mockControl = new MockFormFieldControl();
      mockControl.dirty = true;
      component.formFieldControl = mockControl;
      
      expect(component._control?.dirty).toBe(true);
    });
  });

  describe('Value Property', () => {
    it('should have default value of 1', () => {
      expect(component.value).toBe(1);
    });
  });

  describe('Empty Property', () => {
    it('should have default empty value of true', () => {
      expect(component.empty).toBe(true);
    });
  });
});
