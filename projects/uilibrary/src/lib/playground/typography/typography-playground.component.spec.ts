import { MockBuilder, MockRender } from 'ng-mocks';
import { TypographyPlaygroundComponent } from './typography-playground.component';
import { PlaygroundModule } from '../playground.module';

describe('TypographyPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(TypographyPlaygroundComponent, PlaygroundModule));

    it('should create', () => {
        const fixture = MockRender(TypographyPlaygroundComponent);
        expect(fixture.point.componentInstance).toBeTruthy();
    });

    it('should render heading elements', () => {
        const fixture = MockRender(TypographyPlaygroundComponent);
        const headings = fixture.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        expect(headings.length).toBeGreaterThan(0);
    });

    it('should render paragraph elements', () => {
        const fixture = MockRender(TypographyPlaygroundComponent);
        const paragraphs = fixture.nativeElement.querySelectorAll('p');
        expect(paragraphs.length).toBeGreaterThan(0);
    });
});
