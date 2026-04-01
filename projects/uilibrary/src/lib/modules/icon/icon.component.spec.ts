/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IconComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    // Don't call detectChanges in beforeEach - tests that need ngOnInit call it manually
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept name input', () => {
      component.name = 'home';
      expect(component.name).toBe('home');
    });

    it('should accept size input', () => {
      component.size = 'large';
      expect(component.size).toBe('large');
    });

    it('should accept appearance input', () => {
      component.appearance = 'primary';
      expect(component.appearance).toBe('primary');
    });
  });

  describe('Size Configuration', () => {
    it('should set small size dimensions', () => {
      component.size = 'small';
      component.ngOnInit();
      
      expect(component.width).toBe(30);
      expect(component.height).toBe(30);
    });

    it('should set medium size dimensions', () => {
      component.size = 'medium';
      component.ngOnInit();
      
      expect(component.width).toBe(40);
      expect(component.height).toBe(40);
    });

    it('should set large size dimensions', () => {
      component.size = 'large';
      component.ngOnInit();
      
      expect(component.width).toBe(80);
      expect(component.height).toBe(80);
    });

    it('should default to medium size when size is undefined', () => {
      component.size = undefined;
      component.ngOnInit();
      
      expect(component.width).toBe(40);
      expect(component.height).toBe(40);
    });

    it('should default to medium size when size is invalid', () => {
      component.size = 'invalid-size';
      component.ngOnInit();
      
      expect(component.width).toBe(40);
      expect(component.height).toBe(40);
    });
  });

  describe('Appearance Configuration', () => {
    it('should set primary appearance color', () => {
      component.appearance = 'primary';
      component.ngOnInit();
      
      expect(component.fillColor).toBe('var(--primary)');
    });

    it('should set secondary appearance color', () => {
      component.appearance = 'secondary';
      component.ngOnInit();
      
      expect(component.fillColor).toBe('var(--secondary)');
    });

    it('should set tertiary appearance color', () => {
      component.appearance = 'tertiary';
      component.ngOnInit();
      
      expect(component.fillColor).toBe('var(--tertiary)');
    });

    it('should set light-gray appearance color', () => {
      component.appearance = 'light-gray';
      component.ngOnInit();
      
      expect(component.fillColor).toBe('var(--light-gray)');
    });

    it('should set dark-gray appearance color', () => {
      component.appearance = 'dark-gray';
      component.ngOnInit();
      
      expect(component.fillColor).toBe('var(--dark-gray)');
    });

    it('should set custom appearance color to currentColor', () => {
      component.appearance = 'custom';
      component.ngOnInit();
      
      expect(component.fillColor).toBe('currentColor');
    });

    it('should default to secondary appearance when appearance is undefined', () => {
      component.appearance = undefined;
      component.ngOnInit();
      
      expect(component.fillColor).toBe('var(--secondary)');
    });

    it('should default to secondary appearance when appearance is invalid', () => {
      component.appearance = 'invalid-appearance';
      component.ngOnInit();
      
      expect(component.fillColor).toBe('var(--secondary)');
    });
  });

  describe('ngOnInit', () => {
    it('should initialize both size and appearance', () => {
      component.size = 'large';
      component.appearance = 'primary';
      component.ngOnInit();
      
      expect(component.width).toBe(80);
      expect(component.height).toBe(80);
      expect(component.fillColor).toBe('var(--primary)');
    });

    it('should initialize with default values when no inputs provided', () => {
      component.ngOnInit();
      
      expect(component.width).toBe(40);
      expect(component.height).toBe(40);
      expect(component.fillColor).toBe('var(--secondary)');
    });
  });

  describe('Default Values', () => {
    it('should have default width of 0 before initialization', () => {
      expect(component.width).toBe(0);
    });

    it('should have default height of 0 before initialization', () => {
      expect(component.height).toBe(0);
    });

    it('should have default fillColor of empty string before initialization', () => {
      expect(component.fillColor).toBe('');
    });
  });
});
