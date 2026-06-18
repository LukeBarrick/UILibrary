import { MockBuilder, MockRender } from 'ng-mocks';

import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuModule } from './context-menu.module';

describe('ContextMenuComponent', () => {
  beforeEach(() => MockBuilder(ContextMenuComponent, ContextMenuModule));

  it('should create', () => {
    expect(MockRender(ContextMenuComponent).point.componentInstance).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with menuVisible as false', () => {
      expect(MockRender(ContextMenuComponent).point.componentInstance.menuVisible).toBe(false);
    });

    it('should initialize with menuPosition at 0,0', () => {
      expect(MockRender(ContextMenuComponent).point.componentInstance.menuPosition).toEqual({ x: 0, y: 0 });
    });

    it('should have menuTrigger undefined without projected content', () => {
      expect(MockRender(ContextMenuComponent).point.componentInstance.menuTrigger).toBeUndefined();
    });
  });

  describe('openMenu', () => {
    it('should set menuVisible to true', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.openMenu(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 }));
      expect(comp.menuVisible).toBe(true);
    });

    it('should set menuPosition from mouse event', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.openMenu(new MouseEvent('contextmenu', { clientX: 150, clientY: 250 }));
      expect(comp.menuPosition).toEqual({ x: 150, y: 250 });
    });

    it('should handle different mouse positions', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.openMenu(new MouseEvent('contextmenu', { clientX: 500, clientY: 600 }));
      expect(comp.menuPosition.x).toBe(500);
      expect(comp.menuPosition.y).toBe(600);
    });
  });

  describe('closeMenu', () => {
    it('should set menuVisible to false', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.menuVisible = true;
      comp.closeMenu(new MouseEvent('click'));
      expect(comp.menuVisible).toBe(false);
    });

    it('should close menu when it is already closed', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.menuVisible = false;
      comp.closeMenu(new MouseEvent('click'));
      expect(comp.menuVisible).toBe(false);
    });
  });

  describe('hideMenu', () => {
    it('should set menuVisible to false', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.menuVisible = true;
      comp.hideMenu();
      expect(comp.menuVisible).toBe(false);
    });

    it('should work when menu is already hidden', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.menuVisible = false;
      comp.hideMenu();
      expect(comp.menuVisible).toBe(false);
    });
  });

  describe('onOptionClick', () => {
    it('should hide the menu', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.menuVisible = true;
      comp.onOptionClick('option1');
      expect(comp.menuVisible).toBe(false);
    });

    it('should accept any option string', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.menuVisible = true;
      comp.onOptionClick('custom-option');
      expect(comp.menuVisible).toBe(false);
    });
  });

  describe('Host Listeners', () => {
    it('should hide menu on document click', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.menuVisible = true;
      comp.onGlobalClick();
      expect(comp.menuVisible).toBe(false);
    });

    it('should hide menu on escape key', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.menuVisible = true;
      comp.onEscape();
      expect(comp.menuVisible).toBe(false);
    });
  });

  describe('Menu Lifecycle', () => {
    it('should open and close menu properly', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      expect(comp.menuVisible).toBe(false);
      comp.openMenu(new MouseEvent('contextmenu', { clientX: 100, clientY: 100 }));
      expect(comp.menuVisible).toBe(true);
      comp.hideMenu();
      expect(comp.menuVisible).toBe(false);
    });

    it('should update position when reopening menu', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.openMenu(new MouseEvent('contextmenu', { clientX: 100, clientY: 100 }));
      expect(comp.menuPosition).toEqual({ x: 100, y: 100 });
      comp.openMenu(new MouseEvent('contextmenu', { clientX: 200, clientY: 300 }));
      expect(comp.menuPosition).toEqual({ x: 200, y: 300 });
    });
  });

  describe('Menu Position Tracking', () => {
    it('should track x coordinate correctly', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.openMenu(new MouseEvent('contextmenu', { clientX: 999, clientY: 0 }));
      expect(comp.menuPosition.x).toBe(999);
    });

    it('should track y coordinate correctly', () => {
      const comp = MockRender(ContextMenuComponent).point.componentInstance;
      comp.openMenu(new MouseEvent('contextmenu', { clientX: 0, clientY: 888 }));
      expect(comp.menuPosition.y).toBe(888);
    });
  });
});
