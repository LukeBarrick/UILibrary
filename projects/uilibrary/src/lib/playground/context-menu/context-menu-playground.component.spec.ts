import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { ContextMenuPlaygroundComponent } from './context-menu-playground.component';
import { PlaygroundModule } from '../playground.module';
import { MenuTrigger } from '../../modules/context-menu/menu-trigger.directive';

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
            spyOn(comp.menuTrigger, 'openMenu');
            comp.rightClick(mockEvent);
            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });

        it('should call menuTrigger.openMenu() with the mouse event', () => {
            const fixture = MockRender(ContextMenuPlaygroundComponent);
            const comp = fixture.point.componentInstance;
            const mockEvent = new MouseEvent('contextmenu');
            spyOn(mockEvent, 'preventDefault');
            spyOn(comp.menuTrigger, 'openMenu');
            comp.rightClick(mockEvent);
            expect(comp.menuTrigger.openMenu).toHaveBeenCalledWith(mockEvent);
        });

        it('should pass exactly the original MouseEvent to openMenu', () => {
            const fixture = MockRender(ContextMenuPlaygroundComponent);
            const comp = fixture.point.componentInstance;
            const mockEvent = new MouseEvent('contextmenu', { clientX: 100, clientY: 200 });
            const openMenuSpy = spyOn(comp.menuTrigger, 'openMenu');
            spyOn(mockEvent, 'preventDefault');
            comp.rightClick(mockEvent);
            const passedEvent = openMenuSpy.calls.first().args[0] as MouseEvent;
            expect(passedEvent.clientX).toBe(100);
            expect(passedEvent.clientY).toBe(200);
        });
    });
});
