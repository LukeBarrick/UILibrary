/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept size input', () => {
      component.size = 'small';
      expect(component.size).toBe('small');
    });

    it('should accept appearance input', () => {
      component.appearance = 'primary';
      expect(component.appearance).toBe('primary');
    });

    it('should accept disabled input', () => {
      component.disabled = true;
      expect(component.disabled).toBe(true);
    });

    it('should accept aria_label input', () => {
      component.aria_label = 'Test Button';
      expect(component.aria_label).toBe('Test Button');
    });

    it('should accept icon input', () => {
      component.icon = 'home';
      expect(component.icon).toBe('home');
    });
  });

  describe('Size Configuration', () => {
    it('should set btn-small class for small size', () => {
      component.size = 'small';
      component.ngOnInit();
      
      expect(component.sizeClass).toBe('btn-small');
      expect(component.iconSizeClass).toBe('small');
    });

    it('should set btn class for non-small sizes', () => {
      component.size = 'large';
      component.ngOnInit();
      
      expect(component.sizeClass).toBe('btn');
    });

    it('should default to btn class when size is undefined', () => {
      component.size = undefined;
      component.ngOnInit();
      
      expect(component.sizeClass).toBe('btn');
    });

    it('should not set iconSizeClass for non-small sizes', () => {
      component.size = 'large';
      component.ngOnInit();
      
      expect(component.iconSizeClass).toBeUndefined();
    });
  });

  describe('Appearance Configuration', () => {
    it('should set btn-primary class for primary appearance', () => {
      component.appearance = 'primary';
      component.ngOnInit();
      
      expect(component.appearanceClass).toBe('btn-primary');
    });

    it('should set btn-secondary class for secondary appearance', () => {
      component.appearance = 'secondary';
      component.ngOnInit();
      
      expect(component.appearanceClass).toBe('btn-secondary');
    });

    it('should set btn-primary success class for primary-success appearance', () => {
      component.appearance = 'primary-success';
      component.ngOnInit();
      
      expect(component.appearanceClass).toBe('btn-primary success');
    });

    it('should set btn-primary delete class for primary-delete appearance', () => {
      component.appearance = 'primary-delete';
      component.ngOnInit();
      
      expect(component.appearanceClass).toBe('btn-primary delete');
    });

    it('should set btn-secondary success class for secondary-success appearance', () => {
      component.appearance = 'secondary-success';
      component.ngOnInit();
      
      expect(component.appearanceClass).toBe('btn-secondary success');
    });

    it('should set btn-secondary delete class for secondary-delete appearance', () => {
      component.appearance = 'secondary-delete';
      component.ngOnInit();
      
      expect(component.appearanceClass).toBe('btn-secondary delete');
    });

    it('should default to btn-primary class when appearance is undefined', () => {
      component.appearance = undefined;
      component.ngOnInit();
      
      expect(component.appearanceClass).toBe('btn-primary');
    });

    it('should default to btn-primary class when appearance is invalid', () => {
      component.appearance = 'invalid-appearance';
      component.ngOnInit();
      
      expect(component.appearanceClass).toBe('btn-primary');
    });
  });

  describe('ngOnInit', () => {
    it('should configure both size and appearance', () => {
      component.size = 'small';
      component.appearance = 'secondary';
      component.ngOnInit();
      
      expect(component.sizeClass).toBe('btn-small');
      expect(component.appearanceClass).toBe('btn-secondary');
    });

    it('should initialize with default values when no inputs provided', () => {
      component.ngOnInit();
      
      expect(component.sizeClass).toBe('btn');
      expect(component.appearanceClass).toBe('btn-primary');
    });
  });

  describe('Default Values', () => {
    it('should have undefined size class before initialization', () => {
      expect(component.sizeClass).toBeUndefined();
    });

    it('should have undefined appearance class before initialization', () => {
      expect(component.appearanceClass).toBeUndefined();
    });

    it('should have undefined icon size class before initialization', () => {
      expect(component.iconSizeClass).toBeUndefined();
    });
  });

  describe('Icon Integration', () => {
    it('should set small icon size when button is small', () => {
      component.size = 'small';
      component.icon = 'home';
      component.ngOnInit();
      
      expect(component.iconSizeClass).toBe('small');
    });

    it('should not set icon size class for large buttons', () => {
      component.size = 'large';
      component.icon = 'home';
      component.ngOnInit();
      
      expect(component.iconSizeClass).toBeUndefined();
    });
  });
});
