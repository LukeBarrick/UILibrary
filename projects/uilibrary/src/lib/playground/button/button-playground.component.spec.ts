import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { ButtonPlaygroundComponent } from './button-playground.component';
import { PlaygroundModule } from '../playground.module';
import { ButtonComponent } from '../../modules/button/button/button.component';
import { ButtonModule } from '../../modules/button/button.module';

describe('ButtonPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(ButtonPlaygroundComponent, PlaygroundModule));

    it('should create', () => {
        const fixture = MockRender(ButtonPlaygroundComponent);
        expect(fixture.point.componentInstance).toBeTruthy();
    });

    it('should render uilibrary-button elements in the template', () => {
        MockRender(ButtonPlaygroundComponent);
        const buttons = ngMocks.findAll('uilibrary-button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('should demonstrate all 6 appearance values in the template', () => {
        MockRender(ButtonPlaygroundComponent);
        const buttons = ngMocks.findAll('uilibrary-button');
        const appearances = buttons
            .map(btn => ngMocks.input(btn, 'appearance'))
            .filter(Boolean);
        const expected = ['primary', 'secondary', 'primary-success', 'primary-delete', 'secondary-success', 'secondary-delete'];
        expected.forEach(app => expect(appearances).toContain(app));
    });

    it('should demonstrate small size in the template', () => {
        MockRender(ButtonPlaygroundComponent);
        const buttons = ngMocks.findAll('uilibrary-button');
        const sizes = buttons.map(btn => ngMocks.input(btn, 'size')).filter(Boolean);
        expect(sizes).toContain('small');
    });

    it('should demonstrate the aria_label input in the template', () => {
        MockRender(ButtonPlaygroundComponent);
        const buttons = ngMocks.findAll('uilibrary-button');
        const ariaLabels = buttons
            .map(btn => ngMocks.input(btn, 'aria_label'))
            .filter(Boolean);
        expect(ariaLabels.length).toBeGreaterThan(0);
    });

    it('should demonstrate disabled buttons in the template', () => {
        MockRender(ButtonPlaygroundComponent);
        const buttons = ngMocks.findAll('uilibrary-button');
        const disabledButtons = buttons.filter(
            btn => ngMocks.input(btn, 'disabled') === true
        );
        expect(disabledButtons.length).toBeGreaterThan(0);
    });

    it('should demonstrate the icon input in the template', () => {
        MockRender(ButtonPlaygroundComponent);
        const buttons = ngMocks.findAll('uilibrary-button');
        const iconsUsed = buttons.map(btn => ngMocks.input(btn, 'icon')).filter(Boolean);
        expect(iconsUsed.length).toBeGreaterThan(0);
    });
});

describe('ButtonComponent', () => {
    beforeEach(() => MockBuilder(ButtonComponent, ButtonModule));

    describe('size input', () => {
        it('should set sizeClass to "btn-small" and iconSizeClass to "small" when size is "small"', () => {
            const { componentInstance: comp } = MockRender(ButtonComponent, { size: 'small', appearance: 'primary' }).point;
            expect(comp.sizeClass).toBe('btn-small');
            expect(comp.iconSizeClass).toBe('small');
        });

        it('should set sizeClass to "btn" when size is not "small"', () => {
            const { componentInstance: comp } = MockRender(ButtonComponent, { size: undefined, appearance: 'primary' }).point;
            expect(comp.sizeClass).toBe('btn');
        });

        it('should set sizeClass to "btn" when size is any non-small value', () => {
            const { componentInstance: comp } = MockRender(ButtonComponent, { size: 'large', appearance: 'primary' }).point;
            expect(comp.sizeClass).toBe('btn');
        });
    });

    describe('appearance input', () => {
        const cases: Array<[string, string]> = [
            ['primary',           'btn-primary'],
            ['secondary',         'btn-secondary'],
            ['primary-success',   'btn-primary success'],
            ['primary-delete',    'btn-primary delete'],
            ['secondary-success', 'btn-secondary success'],
            ['secondary-delete',  'btn-secondary delete'],
        ];

        cases.forEach(([appearance, expectedClass]) => {
            it(`should set appearanceClass to "${expectedClass}" when appearance is "${appearance}"`, () => {
                const { componentInstance: comp } = MockRender(ButtonComponent, { appearance }).point;
                expect(comp.appearanceClass).toBe(expectedClass);
            });
        });

        it('should default to "btn-primary" when no appearance is provided', () => {
            const { componentInstance: comp } = MockRender(ButtonComponent, { appearance: undefined }).point;
            expect(comp.appearanceClass).toBe('btn-primary');
        });
    });

    describe('disabled input', () => {
        it('should accept a truthy disabled value', () => {
            const { componentInstance: comp } = MockRender(ButtonComponent, { disabled: true }).point;
            expect(comp.disabled).toBeTrue();
        });

        it('should accept a falsy disabled value', () => {
            const { componentInstance: comp } = MockRender(ButtonComponent, { disabled: false }).point;
            expect(comp.disabled).toBeFalse();
        });
    });

    describe('aria_label input', () => {
        it('should store the provided aria_label value', () => {
            const { componentInstance: comp } = MockRender(ButtonComponent, { aria_label: 'Save document' }).point;
            expect(comp.aria_label).toBe('Save document');
        });
    });

    describe('icon input', () => {
        it('should store the provided icon name', () => {
            const { componentInstance: comp } = MockRender(ButtonComponent, { icon: 'icon-air' }).point;
            expect(comp.icon).toBe('icon-air');
        });

        it('should be undefined when no icon is provided', () => {
            const { componentInstance: comp } = MockRender(ButtonComponent, { icon: undefined }).point;
            expect(comp.icon).toBeUndefined();
        });
    });
});
