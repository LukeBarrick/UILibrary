/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RadioButtonComponent } from './button.component';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonComponent);
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

  it('should have default disabled state of false', () => {
    expect(component.disabled).toBe(false);
  });

  it('should have default labelPosition of left', () => {
    expect(component.labelPosition).toBe('left');
  });

  describe('Input Properties', () => {
    it('should accept value input', () => {
      const testValue = 'option1';
      component.value = testValue;
      expect(component.value).toBe(testValue);
    });

    it('should accept checked input', () => {
      component.checked = true;
      expect(component.checked).toBe(true);
    });

    it('should accept disabled input', () => {
      component.disabled = true;
      expect(component.disabled).toBe(true);
    });

    it('should accept labelPosition input', () => {
      component.labelPosition = 'right';
      expect(component.labelPosition).toBe('right');
    });
  });

  describe('check method', () => {
    it('should set checked to true when not disabled', () => {
      component.disabled = false;
      component.checked = false;
      
      component.check();
      
      expect(component.checked).toBe(true);
    });

    it('should emit checkedChange when checked', () => {
      spyOn(component.checkedChange, 'emit');
      component.disabled = false;
      
      component.check();
      
      expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should not change checked state when disabled', () => {
      component.disabled = true;
      component.checked = false;
      
      component.check();
      
      expect(component.checked).toBe(false);
    });

    it('should not emit checkedChange when disabled', () => {
      spyOn(component.checkedChange, 'emit');
      component.disabled = true;
      
      component.check();
      
      expect(component.checkedChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('checkChanged method', () => {
    it('should emit checkedChange when not disabled', () => {
      spyOn(component.checkedChange, 'emit');
      component.disabled = false;
      
      component.checkChanged();
      
      expect(component.checkedChange.emit).toHaveBeenCalled();
    });

    it('should not emit checkedChange when disabled', () => {
      spyOn(component.checkedChange, 'emit');
      component.disabled = true;
      
      component.checkChanged();
      
      expect(component.checkedChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('Output Events', () => {
    it('should have checkedChange output', () => {
      expect(component.checkedChange).toBeDefined();
    });

    it('should emit boolean value on checkedChange', (done) => {
      component.checkedChange.subscribe((value: boolean) => {
        expect(typeof value).toBe('boolean');
        done();
      });
      
      component.check();
    });
  });
});
