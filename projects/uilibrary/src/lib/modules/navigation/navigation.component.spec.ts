import { ElementRef } from '@angular/core';
import { MockBuilder, MockRender } from 'ng-mocks';

import { NavigationComponent } from './navigation.component';
import { NavigationModule } from './navigation.module';
import { NavigationLink } from '../../core/models/navigation-link';
import { NavigationLinkType } from '../../core/enums/navigation-link-type.enum';

const emptyLinks: NavigationLink[] = [];

describe('NavigationComponent', () => {
  beforeEach(() => MockBuilder(NavigationComponent, NavigationModule));

  it('should create', () => {
    expect(MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept showRightAlignedContent input', () => {
      const { componentInstance: comp } = MockRender(NavigationComponent, { links: emptyLinks, showRightAlignedContent: false }).point;
      expect(comp.showRightAlignedContent).toBe(false);
    });

    it('should accept links input', () => {
      const testLinks: NavigationLink[] = [
        { label: 'Home', path: '/home', type: NavigationLinkType.Route },
        { label: 'About', path: '/about', type: NavigationLinkType.Route }
      ];
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      comp.links = testLinks;
      expect(comp.links).toEqual(testLinks);
    });

    it('should accept showExtraMobileMenuContent input', () => {
      const { componentInstance: comp } = MockRender(NavigationComponent, { links: emptyLinks, showExtraMobileMenuContent: false }).point;
      expect(comp.showExtraMobileMenuContent).toBe(false);
    });

    it('should accept hideRightAllignedContentOnMobile input', () => {
      const { componentInstance: comp } = MockRender(NavigationComponent, { links: emptyLinks, hideRightAllignedContentOnMobile: true }).point;
      expect(comp.hideRightAllignedContentOnMobile).toBe(true);
    });
  });

  describe('Default State', () => {
    it('should initialize with empty overflowLinks', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      expect(comp.overflowLinks).toEqual([]);
    });

    it('should have NavigationLinkType enum available', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      expect(comp.NavigationLinkType).toBeDefined();
      expect(comp.NavigationLinkType).toBe(NavigationLinkType);
    });
  });

  describe('allNavigationLinks getter', () => {
    it('should return combined links and overflowLinks', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      const mainLinks: NavigationLink[] = [{ label: 'Home', path: '/home', type: NavigationLinkType.Route }];
      const overflowLinks: NavigationLink[] = [{ label: 'About', path: '/about', type: NavigationLinkType.Route }];
      comp.links = mainLinks;
      comp.overflowLinks = overflowLinks;
      expect(comp.allNavigationLinks.length).toBe(2);
      expect(comp.allNavigationLinks).toEqual([...mainLinks, ...overflowLinks]);
    });

    it('should return only links when overflowLinks is empty', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      const mainLinks: NavigationLink[] = [{ label: 'Home', path: '/home', type: NavigationLinkType.Route }];
      comp.links = mainLinks;
      comp.overflowLinks = [];
      expect(comp.allNavigationLinks).toEqual(mainLinks);
    });
  });

  describe('goToUrl', () => {
    it('should call window.open with url and target', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      spyOn(window, 'open');
      comp.goToUrl('/test', '_blank');
      expect(window.open).toHaveBeenCalledWith('/test', '_blank');
    });

    it('should support different targets', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      spyOn(window, 'open');
      comp.goToUrl('/test', '_self');
      expect(window.open).toHaveBeenCalledWith('/test', '_self');
    });
  });

  describe('trackByFn', () => {
    it('should return the index', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      expect(comp.trackByFn(5, { label: 'Test' })).toBe(5);
    });

    it('should work with different indices', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      expect(comp.trackByFn(0, {})).toBe(0);
      expect(comp.trackByFn(10, {})).toBe(10);
      expect(comp.trackByFn(99, {})).toBe(99);
    });
  });

  describe('ngAfterViewInit', () => {
    it('should call adjustNav on init', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      spyOn<any>(comp, 'adjustNav');
      comp.ngAfterViewInit();
      expect(comp['adjustNav']).toHaveBeenCalled();
    });
  });

  describe('onResize', () => {
    it('should call adjustNav on resize', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      spyOn<any>(comp, 'adjustNav');
      comp.onResize();
      expect(comp['adjustNav']).toHaveBeenCalled();
    });
  });

  describe('adjustNav', () => {
    it('should return early if navLinks is not available', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      comp.navLinks = undefined as any;
      expect(() => comp['adjustNav']()).not.toThrow();
    });

    it('should return early if navLinks.nativeElement is not available', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      comp.navLinks = { nativeElement: null } as ElementRef;
      expect(() => comp['adjustNav']()).not.toThrow();
    });

    it('should distribute links based on available space', () => {
      const comp = MockRender(NavigationComponent, { links: emptyLinks }).point.componentInstance;
      comp.navLinks = {
        nativeElement: {
          parentElement: { offsetWidth: 1000 },
          previousElementSibling: { offsetWidth: 100 }
        }
      } as any;
      const testLinks: NavigationLink[] = [
        { label: 'Link1', path: '/link1', type: NavigationLinkType.Route },
        { label: 'Link2', path: '/link2', type: NavigationLinkType.Route }
      ];
      comp.links = testLinks;
      comp.overflowLinks = [];
      comp.showRightAlignedContent = false;
      comp['adjustNav']();
      expect(comp.links.length + comp.overflowLinks.length).toBe(testLinks.length);
    });
  });
});
