import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { TogglePlaygroundComponent } from './toggle-playground.component';
import { PlaygroundModule } from '../playground.module';
import {
    expectControlDisabled,
    expectControlEnabled,
    expectControlInvalid,
    expectControlTouched,
    expectControlUntouched,
} from '../testing/form-control.helpers';
import { ToggleComponent } from '../../modules/toggle/toggle.component';
import { ToggleModule } from '../../modules/toggle/toggle.module';

describe('TogglePlaygroundComponent', () => {
    beforeEach(() => MockBuilder(TogglePlaygroundComponent, PlaygroundModule).keep(ReactiveFormsModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(TogglePlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('showOutput @Input should default to false', () => {
            expect(MockRender(TogglePlaygroundComponent, { showOutput: false }).point.componentInstance.showOutput).toBeFalse();
        });

        it('isDisabled should default to true', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expect(comp.isDisabled).toBeTrue();
        });

        it('basicToggleBinding should default to false', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expect(comp.basicToggleBinding).toBeFalse();
        });
    });

    describe('Form initialisation', () => {
        it('toggleControl should have no initial value', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expect(comp.toggleForm.get('toggleControl')?.value).toBeNull();
        });

        it('toggleWithValue should initialise to true', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expect(comp.toggleForm.get('toggleWithValue')?.value).toBeTrue();
        });

        it('toggleDisabled control should start as disabled', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expectControlDisabled(comp.toggleForm.get('toggleDisabled'));
        });

        it('toggleDisabled should have an initial value of true', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expect(comp.toggleForm.get('toggleDisabled')?.value).toBeTrue();
        });

        it('toggleError should be invalid (required) on init', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expectControlInvalid(comp.toggleForm.get('toggleError'));
        });

        it('toggleUntouched should be invalid (required) on init', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expectControlInvalid(comp.toggleForm.get('toggleUntouched'));
        });
    });

    describe('ngOnInit', () => {
        it('toggleError control should be marked as touched after init', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expectControlTouched(comp.toggleForm.get('toggleError'));
        });

        it('toggleUntouched control should NOT be marked as touched after init', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expectControlUntouched(comp.toggleForm.get('toggleUntouched'));
        });
    });

    describe('toggleDisabled()', () => {
        it('should flip isDisabled from true to false', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expect(comp.isDisabled).toBeTrue();
            comp.toggleDisabled();
            expect(comp.isDisabled).toBeFalse();
        });

        it('should flip isDisabled back to true on second call', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            comp.toggleDisabled();
            comp.toggleDisabled();
            expect(comp.isDisabled).toBeTrue();
        });
    });

    describe('toggleDisabledFormControl()', () => {
        it('should enable toggleDisabled when it is currently disabled', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            const ctrl = comp.toggleForm.get('toggleDisabled')!;
            expect(ctrl.disabled).toBeTrue();
            comp.toggleDisabledFormControl();
            expectControlEnabled(ctrl);
        });

        it('should disable toggleDisabled control when it is currently enabled', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            const ctrl = comp.toggleForm.get('toggleDisabled')!;
            ctrl.enable();
            comp.toggleDisabledFormControl();
            expectControlDisabled(ctrl);
        });
    });

    describe('stringify()', () => {
        it('should return JSON string of a boolean', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expect(comp.stringify(true)).toBe('true');
            expect(comp.stringify(false)).toBe('false');
        });

        it('should return JSON string of an object', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expect(comp.stringify({ key: 'value' })).toBe('{"key":"value"}');
        });

        it('should return JSON string of null', () => {
            const { componentInstance: comp } = MockRender(TogglePlaygroundComponent).point;
            expect(comp.stringify(null)).toBe('null');
        });
    });
});

// ─── ToggleComponent direct API tests ────────────────────────────────────────
describe('ToggleComponent', () => {
    beforeEach(() => MockBuilder(ToggleComponent, ToggleModule));

    describe('labelPosition input', () => {
        it('should default to "left"', () => {
            expect(MockRender(ToggleComponent, { labelPosition: 'left' }).point.componentInstance.labelPosition).toBe('left');
        });

        it('should accept "right"', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent, { labelPosition: 'right' }).point;
            expect(comp.labelPosition).toBe('right');
        });
    });

    describe('labelSize input', () => {
        it('should default to empty string', () => {
            expect(MockRender(ToggleComponent, { labelSize: '' }).point.componentInstance.labelSize).toBe('');
        });

        it('should accept "large"', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent, { labelSize: 'large' }).point;
            expect(comp.labelSize).toBe('large');
        });
    });

    describe('hideLabel input', () => {
        it('should default to false', () => {
            expect(MockRender(ToggleComponent, { hideLabel: false }).point.componentInstance.hideLabel).toBeFalse();
        });

        it('should accept true', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent, { hideLabel: true }).point;
            expect(comp.hideLabel).toBeTrue();
        });
    });

    describe('checked setter', () => {
        it('should set value to true', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent, { checked: true } as any).point;
            expect(comp.value).toBeTrue();
        });

        it('should set value to false', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent, { checked: false } as any).point;
            expect(comp.value).toBeFalse();
        });
    });

    describe('disabled input', () => {
        it('should default to false', () => {
            expect(MockRender(ToggleComponent, { disabled: false }).point.componentInstance.disabled).toBeFalse();
        });

        it('should accept true via setDisabledState', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent).point;
            comp.setDisabledState(true);
            expect(comp.disabled).toBeTrue();
        });
    });

    describe('handleChange()', () => {
        it('should toggle value from false to true', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent).point;
            comp.value = false;
            comp.handleChange();
            expect(comp.value).toBeTrue();
        });

        it('should toggle value from true to false', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent).point;
            comp.value = true;
            comp.handleChange();
            expect(comp.value).toBeFalse();
        });

        it('should call onChange with the new value', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent).point;
            const spy = jasmine.createSpy('onChange');
            comp.registerOnChange(spy);
            comp.value = false;
            comp.handleChange();
            expect(spy).toHaveBeenCalledWith(true);
        });

        it('should call onTouched', () => {
            const { componentInstance: comp } = MockRender(ToggleComponent).point;
            const spy = jasmine.createSpy('onTouched');
            comp.registerOnTouched(spy);
            comp.handleChange();
            expect(spy).toHaveBeenCalled();
        });
    });
});
