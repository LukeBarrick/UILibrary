import { MockBuilder, MockRender } from 'ng-mocks';
import { KeyboardNavigationPlaygroundComponent } from './keyboard-navigation-playground.component';
import { PlaygroundModule } from '../playground.module';

describe('KeyboardNavigationPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(KeyboardNavigationPlaygroundComponent, PlaygroundModule));

    it('should create', () => {
        const fixture = MockRender(KeyboardNavigationPlaygroundComponent);
        expect(fixture.point.componentInstance).toBeTruthy();
    });

    it('should render content in the template', () => {
        const fixture = MockRender(KeyboardNavigationPlaygroundComponent);
        expect(fixture.nativeElement.innerHTML).not.toBe('');
    });
});
