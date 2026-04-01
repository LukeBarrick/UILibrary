import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { IconPlaygroundComponent } from './icon-playground.component';
import { PlaygroundModule } from '../playground.module';
import { IconComponent } from '../../modules/icon/icon.component';
import { IconModule } from '../../modules/icon/icon.module';

describe('IconPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(IconPlaygroundComponent, PlaygroundModule));

    it('should create', () => {
        const fixture = MockRender(IconPlaygroundComponent);
        expect(fixture.point.componentInstance).toBeTruthy();
    });

    it('should render uilibrary-icon elements in the template', () => {
        MockRender(IconPlaygroundComponent);
        const icons = ngMocks.findAll('uilibrary-icon');
        expect(icons.length).toBeGreaterThan(0);
    });

    it('should pass a name input to each icon', () => {
        MockRender(IconPlaygroundComponent);
        const icons = ngMocks.findAll('uilibrary-icon');
        icons.forEach(icon => {
            const name = ngMocks.input(icon, 'name');
            expect(name).toBeTruthy();
        });
    });

    it('should demonstrate all 3 size values in the template', () => {
        MockRender(IconPlaygroundComponent);
        const icons = ngMocks.findAll('uilibrary-icon');
        const sizes = icons.map(i => ngMocks.input(i, 'size')).filter(Boolean);
        expect(sizes).toContain('small');
        expect(sizes).toContain('medium');
        expect(sizes).toContain('large');
    });

    it('should demonstrate all appearance values in the template', () => {
        MockRender(IconPlaygroundComponent);
        const icons = ngMocks.findAll('uilibrary-icon');
        const appearances = icons.map(i => ngMocks.input(i, 'appearance')).filter(Boolean);
        const expected = ['primary', 'secondary', 'tertiary', 'light-gray', 'dark-gray', 'custom'];
        expected.forEach(app => expect(appearances).toContain(app));
    });
});

describe('IconComponent', () => {
    beforeEach(() => MockBuilder(IconComponent, IconModule));

    describe('size input', () => {
        it('should set width=30 and height=30 for size small', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { size: 'small', name: 'icon-air' }).point;
            expect(comp.width).toBe(30);
            expect(comp.height).toBe(30);
        });

        it('should set width=40 and height=40 for size medium', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { size: 'medium', name: 'icon-air' }).point;
            expect(comp.width).toBe(40);
            expect(comp.height).toBe(40);
        });

        it('should set width=80 and height=80 for size large', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { size: 'large', name: 'icon-air' }).point;
            expect(comp.width).toBe(80);
            expect(comp.height).toBe(80);
        });

        it('should default to width=40 and height=40 when no size is provided', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { size: undefined, name: 'icon-air' }).point;
            expect(comp.width).toBe(40);
            expect(comp.height).toBe(40);
        });
    });

    describe('appearance input', () => {
        it('should set fillColor to var(--primary) for primary', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'primary', name: 'icon-air' }).point;
            expect(comp.fillColor).toBe('var(--primary)');
        });

        it('should set fillColor to var(--secondary) for secondary', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'secondary', name: 'icon-air' }).point;
            expect(comp.fillColor).toBe('var(--secondary)');
        });

        it('should set fillColor to var(--tertiary) for tertiary', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'tertiary', name: 'icon-air' }).point;
            expect(comp.fillColor).toBe('var(--tertiary)');
        });

        it('should set fillColor to var(--light-gray) for light-gray', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'light-gray', name: 'icon-air' }).point;
            expect(comp.fillColor).toBe('var(--light-gray)');
        });

        it('should set fillColor to var(--dark-gray) for dark-gray', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'dark-gray', name: 'icon-air' }).point;
            expect(comp.fillColor).toBe('var(--dark-gray)');
        });

        it('should set fillColor to currentColor for custom', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { appearance: 'custom', name: 'icon-air' }).point;
            expect(comp.fillColor).toBe('currentColor');
        });

        it('should default fillColor to var(--secondary) when no appearance is provided', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { appearance: undefined, name: 'icon-air' }).point;
            expect(comp.fillColor).toBe('var(--secondary)');
        });
    });

    describe('name input', () => {
        it('should store the provided icon name', () => {
            const { componentInstance: comp } = MockRender(IconComponent, { name: 'icon-accommodation' }).point;
            expect(comp.name).toBe('icon-accommodation');
        });
    });
});
