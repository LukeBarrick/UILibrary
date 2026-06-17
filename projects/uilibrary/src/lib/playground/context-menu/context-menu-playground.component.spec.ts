import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { ContextMenuPlaygroundComponent } from './context-menu-playground.component';
import { PlaygroundModule } from '../playground.module';
import { TestBed } from '@angular/core/testing';
import { ContextSideMenuComponent } from '../../modules/context-menu/context-side-menu/context-side-menu.component';
import { ContextMenuModule } from '../../modules/context-menu/context-menu.module';

describe('ContextMenuPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(ContextMenuPlaygroundComponent, PlaygroundModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(ContextMenuPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('menuTrigger @ViewChild should be resolved after init', () => {
            const fixture = MockRender(ContextMenuPlaygroundComponent);
            expect(fixture.point.componentInstance.menuTrigger).toBeDefined();
        });
    });

    describe('rightClick()', () => {
        it('should call event.preventDefault()', () => {
            const fixture = MockRender(ContextMenuPlaygroundComponent);
            const comp = fixture.point.componentInstance;
            const mockEvent = new MouseEvent('contextmenu');
            spyOn(mockEvent, 'preventDefault');
            comp.menuTrigger.openMenu = jasmine.createSpy('openMenu');
            comp.rightClick(mockEvent);
            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });

        it('should call menuTrigger.openMenu() with the mouse event', () => {
            const fixture = MockRender(ContextMenuPlaygroundComponent);
            const comp = fixture.point.componentInstance;
            const mockEvent = new MouseEvent('contextmenu');
            spyOn(mockEvent, 'preventDefault');
            comp.menuTrigger.openMenu = jasmine.createSpy('openMenu');
            comp.rightClick(mockEvent);
            expect(comp.menuTrigger.openMenu).toHaveBeenCalledWith(mockEvent);
        });

        it('should pass exactly the original MouseEvent to openMenu', () => {
            const fixture = MockRender(ContextMenuPlaygroundComponent);
            const comp = fixture.point.componentInstance;
            const mockEvent = new MouseEvent('contextmenu', { clientX: 100, clientY: 200 });
            comp.menuTrigger.openMenu = jasmine.createSpy('openMenu');
            spyOn(mockEvent, 'preventDefault');
            comp.rightClick(mockEvent);
            const passedEvent = (comp.menuTrigger.openMenu as jasmine.Spy).calls.first().args[0] as MouseEvent;
            expect(passedEvent.clientX).toBe(100);
            expect(passedEvent.clientY).toBe(200);
        });
    });

    describe('Template', () => {
        it('should render at least one uilibrary-context-side-menu', () => {
            MockRender(ContextMenuPlaygroundComponent);
            const sidemenus = ngMocks.findAll('uilibrary-context-side-menu');
            expect(sidemenus.length).toBeGreaterThan(0);
        });

        it('should demonstrate a disabled uilibrary-context-side-menu', () => {
            MockRender(ContextMenuPlaygroundComponent);
            const sidemenus = ngMocks.findAll('uilibrary-context-side-menu');
            const disabledMenus = sidemenus.filter(m => ngMocks.input(m, 'disabled') === true);
            expect(disabledMenus.length).toBeGreaterThan(0);
        });
    });
});

// ─── ContextSideMenuComponent direct API tests ───────────────────────────────
describe('ContextSideMenuComponent', () => {
    beforeEach(() => MockBuilder(ContextSideMenuComponent, ContextMenuModule));

    it('should create', () => {
        const comp = TestBed.createComponent(ContextSideMenuComponent).componentInstance;
        expect(comp).toBeTruthy();
    });

    describe('disabled input', () => {
        it('should default to false', () => {
            const comp = TestBed.createComponent(ContextSideMenuComponent).componentInstance;
            expect(comp.disabled).toBeFalse();
        });

        it('should accept true', () => {
            const { componentInstance: comp } = MockRender(ContextSideMenuComponent, { disabled: true }).point;
            expect(comp.disabled).toBeTrue();
        });

        it('should accept false', () => {
            const { componentInstance: comp } = MockRender(ContextSideMenuComponent, { disabled: false }).point;
            expect(comp.disabled).toBeFalse();
        });
    });
});
