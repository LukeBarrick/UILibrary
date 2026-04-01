import { MockBuilder, MockRender } from 'ng-mocks';
import { TablePlaygroundComponent } from './table-playground.component';
import { PlaygroundModule } from '../playground.module';

describe('TablePlaygroundComponent', () => {
    beforeEach(() => MockBuilder(TablePlaygroundComponent, PlaygroundModule));

    it('should create', () => {
        const fixture = MockRender(TablePlaygroundComponent);
        expect(fixture.point.componentInstance).toBeTruthy();
    });

    it('should render content in the template', () => {
        const fixture = MockRender(TablePlaygroundComponent);
        expect(fixture.nativeElement.innerHTML).not.toBe('');
    });
});
