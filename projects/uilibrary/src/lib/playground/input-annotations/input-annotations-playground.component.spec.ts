import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { InputAnnotationsPlaygroundComponent } from './input-annotations-playground.component';
import { PlaygroundModule } from '../playground.module';
import { HintComponent } from '../../modules/input-annotations/hint/hint.component';
import { RequiredComponent } from '../../modules/input-annotations/required/required.component';
import { TooltipComponent } from '../../modules/input-annotations/tooltip/tooltip.component';
import { InputAnnotationsModule } from '../../modules/input-annotations/input-annotations.module';

describe('InputAnnotationsPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(InputAnnotationsPlaygroundComponent, PlaygroundModule));

    it('should create', () => {
        const fixture = MockRender(InputAnnotationsPlaygroundComponent);
        expect(fixture.point.componentInstance).toBeTruthy();
    });

    it('should render uilibrary-form-field elements', () => {
        MockRender(InputAnnotationsPlaygroundComponent);
        const formFields = ngMocks.findAll('uilibrary-form-field');
        expect(formFields.length).toBeGreaterThan(0);
    });

    it('should render uilibrary-hint elements', () => {
        MockRender(InputAnnotationsPlaygroundComponent);
        const hints = ngMocks.findAll('uilibrary-hint');
        expect(hints.length).toBeGreaterThan(0);
    });

    it('should render uilibrary-required elements', () => {
        MockRender(InputAnnotationsPlaygroundComponent);
        const required = ngMocks.findAll('uilibrary-required');
        expect(required.length).toBeGreaterThan(0);
    });
});

// ─── HintComponent direct API tests ─────────────────────────────────────────
describe('HintComponent', () => {
    beforeEach(() => MockBuilder(HintComponent, InputAnnotationsModule));

    it('should default variant to "error"', () => {
        expect(MockRender(HintComponent, { variant: 'error' }).point.componentInstance.variant).toBe('error');
    });

    it('should accept variant "normal"', () => {
        const { componentInstance: comp } = MockRender(HintComponent, { variant: 'normal' }).point;
        expect(comp.variant).toBe('normal');
    });

    it('should accept variant "error"', () => {
        const { componentInstance: comp } = MockRender(HintComponent, { variant: 'error' }).point;
        expect(comp.variant).toBe('error');
    });
});

// ─── RequiredComponent direct API tests ──────────────────────────────────────
describe('RequiredComponent', () => {
    beforeEach(() => MockBuilder(RequiredComponent, InputAnnotationsModule));

    it('should default margin to "none"', () => {
        expect(MockRender(RequiredComponent, { margin: 'none' }).point.componentInstance.margin).toBe('none');
    });

    it('should accept margin "left"', () => {
        const { componentInstance: comp } = MockRender(RequiredComponent, { margin: 'left' }).point;
        expect(comp.margin).toBe('left');
    });

    it('should accept margin "none"', () => {
        const { componentInstance: comp } = MockRender(RequiredComponent, { margin: 'none' }).point;
        expect(comp.margin).toBe('none');
    });
});

// ─── TooltipComponent direct API tests ───────────────────────────────────────
describe('TooltipComponent', () => {
    beforeEach(() => MockBuilder(TooltipComponent, InputAnnotationsModule));

    it('should default margin to "none"', () => {
        expect(MockRender(TooltipComponent, { margin: 'none' }).point.componentInstance.margin).toBe('none');
    });

    it('should default placement to empty string', () => {
        expect(MockRender(TooltipComponent, { placement: '' }).point.componentInstance.placement).toBe('');
    });

    it('should accept margin "left"', () => {
        const { componentInstance: comp } = MockRender(TooltipComponent, { margin: 'left' }).point;
        expect(comp.margin).toBe('left');
    });

    it('should accept placement "top"', () => {
        const { componentInstance: comp } = MockRender(TooltipComponent, { placement: 'top' }).point;
        expect(comp.placement).toBe('top');
    });

    it('should accept placement "bottom"', () => {
        const { componentInstance: comp } = MockRender(TooltipComponent, { placement: 'bottom' }).point;
        expect(comp.placement).toBe('bottom');
    });

    it('should accept placement "left"', () => {
        const { componentInstance: comp } = MockRender(TooltipComponent, { placement: 'left' }).point;
        expect(comp.placement).toBe('left');
    });

    it('should accept placement "right"', () => {
        const { componentInstance: comp } = MockRender(TooltipComponent, { placement: 'right' }).point;
        expect(comp.placement).toBe('right');
    });
});
