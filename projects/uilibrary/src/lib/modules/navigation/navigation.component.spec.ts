/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef } from '@angular/core';

import { NavigationComponent } from './navigation.component';
import { NavigationLink } from '../../core/models/navigation-link';
import { NavigationLinkType } from '../../core/enums/navigation-link-type.enum';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should have default showRightAlignedContent of true', () => {
      expect(component.showRightAlignedContent).toBe(true);
    });

    it('should accept showRightAlignedContent input', () => {
      component.showRightAlignedContent = false;
      expect(component.showRightAlignedContent).toBe(false);
    });

    it('should have default links array', () => {
      expect(component.links).toEqual([]);
    });

    it('should accept links input', () => {
      const testLinks: NavigationLink[] = [
        { label: 'Home', path: '/home', type: NavigationLinkType.Route },
        { label: 'About', path: '/about', type: NavigationLinkType.Route }
      ];
      component.links = testLinks;
      expect(component.links).toEqual(testLinks);
    });

    it('should have default showExtraMobileMenuContent of true', () => {
      expect(component.showExtraMobileMenuContent).toBe(true);
    });

    it('should accept showExtraMobileMenuContent input', () => {
      component.showExtraMobileMenuContent = false;
      expect(component.showExtraMobileMenuContent).toBe(false);
    });

    it('should have default hideRightAllignedContentOnMobile of false', () => {
      expect(component.hideRightAllignedContentOnMobile).toBe(false);
    });

    it('should accept hideRightAllignedContentOnMobile input', () => {
      component.hideRightAllignedContentOnMobile = true;
      expect(component.hideRightAllignedContentOnMobile).toBe(true);
    });
  });

  describe('Default State', () => {
    it('should initialize with empty overflowLinks', () => {
      expect(component.overflowLinks).toEqual([]);
    });

    it('should have NavigationLinkType enum available', () => {
      expect(component.NavigationLinkType).toBeDefined();
      expect(component.NavigationLinkType).toBe(NavigationLinkType);
    });
  });

  describe('allNavigationLinks getter', () => {
    it('should return combined links and overflowLinks', () => {
      const mainLinks: NavigationLink[] = [
        { label: 'Home', path: '/home', type: NavigationLinkType.Route }
      ];
      const overflowLinks: NavigationLink[] = [
        { label: 'About', path: '/about', type: NavigationLinkType.Route }
      ];
      
      component.links = mainLinks;
      component.overflowLinks = overflowLinks;
      
      const allLinks = component.allNavigationLinks;
      expect(allLinks.length).toBe(2);
      expect(allLinks).toEqual([...mainLinks, ...overflowLinks]);
    });

    it('should return only links when overflowLinks is empty', () => {
      const mainLinks: NavigationLink[] = [
        { label: 'Home', path: '/home', type: NavigationLinkType.Route }
      ];
      
      component.links = mainLinks;
      component.overflowLinks = [];
      
      const allLinks = component.allNavigationLinks;
      expect(allLinks).toEqual(mainLinks);
    });
  });

  describe('goToUrl', () => {
    it('should call window.open with url and target', () => {
      spyOn(window, 'open');
      
      component.goToUrl('/test', '_blank');
      
      expect(window.open).toHaveBeenCalledWith('/test', '_blank');
    });

    it('should support different targets', () => {
      spyOn(window, 'open');
      
      component.goToUrl('/test', '_self');
      
      expect(window.open).toHaveBeenCalledWith('/test', '_self');
    });
  });

  describe('trackByFn', () => {
    it('should return the index', () => {
      const result = component.trackByFn(5, { label: 'Test' });
      expect(result).toBe(5);
    });

    it('should work with different indices', () => {
      expect(component.trackByFn(0, {})).toBe(0);
      expect(component.trackByFn(10, {})).toBe(10);
      expect(component.trackByFn(99, {})).toBe(99);
    });
  });

  describe('ngOnInit', () => {
    it('should call adjustNav on init', () => {
      spyOn<any>(component, 'adjustNav');
      
      component.ngOnInit();
      
      expect(component['adjustNav']).toHaveBeenCalled();
    });
  });

  describe('onResize', () => {
    it('should call adjustNav on resize', () => {
      spyOn<any>(component, 'adjustNav');
      
      component.onResize();
      
      expect(component['adjustNav']).toHaveBeenCalled();
    });
  });

  describe('adjustNav', () => {
    it('should return early if navLinks is not available', () => {
      component.navLinks = undefined as any;
      
      expect(() => component['adjustNav']()).not.toThrow();
    });

    it('should return early if navLinks.nativeElement is not available', () => {
      component.navLinks = { nativeElement: null } as ElementRef;
      
      expect(() => component['adjustNav']()).not.toThrow();
    });

    it('should distribute links based on available space', () => {
      // Create mock ElementRef with proper structure
      const mockParentElement = {
        offsetWidth: 1000
      };
      
      const mockPreviousSibling = {
        offsetWidth: 100
      };
      
      const mockNativeElement = {
        parentElement: mockParentElement,
        previousElementSibling: mockPreviousSibling
      };
      
      component.navLinks = { nativeElement: mockNativeElement } as any;
      
      const testLinks: NavigationLink[] = [
        { label: 'Link1', path: '/link1', type: NavigationLinkType.Route },
        { label: 'Link2', path: '/link2', type: NavigationLinkType.Route }
      ];
      
      component.links = testLinks;
      component.overflowLinks = [];
      component.showRightAlignedContent = false;
      
      component['adjustNav']();
      
      // Should have distributed the links between main and overflow
      expect(component.links.length + component.overflowLinks.length).toBe(testLinks.length);
    });
  });
});
