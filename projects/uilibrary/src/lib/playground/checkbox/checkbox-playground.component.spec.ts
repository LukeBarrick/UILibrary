import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { CheckboxPlaygroundComponent } from './checkbox-playground.component';
import { PlaygroundModule } from '../playground.module';
import {
    expectControlDisabled,
    expectControlEnabled,
    expectControlInvalid,
    expectControlTouched,
    expectControlUntouched,
} from '../testing/form-control.helpers';
import { CheckboxComponent } from '../../modules/checkboxes/checkbox/checkbox.component';
import { CheckboxesModule } from '../../modules/checkboxes/checkboxes.module';

describe('CheckboxPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(CheckboxPlaygroundComponent, PlaygroundModule).keep(ReactiveFormsModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(CheckboxPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('showOutput @Input should default to false', () => {
            expect(MockRender(CheckboxPlaygroundComponent, { showOutput: false }).point.componentInstance.showOutput).toBeFalse();
        });

        it('isDisabled should default to true', () => {
            const fixture = MockRender(CheckboxPlaygroundComponent);
            expect(fixture.point.componentInstance.isDisabled).toBeTrue();
        });
    });

    describe('Form initialisation', () => {
        it('checkboxControl should have no initial value', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expect(comp.checkboxForm.get('checkboxControl')?.value).toBeNull();
        });

        it('checkboxWithValue should initialise to true', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expect(comp.checkboxForm.get('checkboxWithValue')?.value).toBeTrue();
        });

        it('checkboxDisabled control should start as disabled', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expectControlDisabled(comp.checkboxForm.get('checkboxDisabled'));
        });

        it('checkboxDisabled should have an initial value of true', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expect(comp.checkboxForm.get('checkboxDisabled')?.value).toBeTrue();
        });

        it('checkboxError should be invalid (required) on init', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expectControlInvalid(comp.checkboxForm.get('checkboxError'));
        });

        it('checkboxUntouched should be invalid (required) on init', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expectControlInvalid(comp.checkboxForm.get('checkboxUntouched'));
        });
    });

    describe('ngOnInit', () => {
        it('checkboxError control should be marked as touched after init', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expectControlTouched(comp.checkboxForm.get('checkboxError'));
        });

        it('checkboxUntouched control should NOT be marked as touched after init', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expectControlUntouched(comp.checkboxForm.get('checkboxUntouched'));
        });
    });

    describe('toggleDisabled()', () => {
        it('should flip isDisabled from true to false', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expect(comp.isDisabled).toBeTrue();
            comp.toggleDisabled();
            expect(comp.isDisabled).toBeFalse();
        });

        it('should flip isDisabled back to true on second call', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            comp.toggleDisabled();
            comp.toggleDisabled();
            expect(comp.isDisabled).toBeTrue();
        });
    });

    describe('toggleDisabledFormControl()', () => {
        it('should enable checkboxDisabled when it is disabled', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            const ctrl = comp.checkboxForm.get('checkboxDisabled')!;
            expect(ctrl.disabled).toBeTrue();
            comp.toggleDisabledFormControl();
            expectControlEnabled(ctrl);
        });

        it('should disable checkboxDisabled when it is enabled', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            const ctrl = comp.checkboxForm.get('checkboxDisabled')!;
            ctrl.enable();
            comp.toggleDisabledFormControl();
            expectControlDisabled(ctrl);
        });
    });

    describe('stringify()', () => {
        it('should return JSON string of a boolean', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expect(comp.stringify(true)).toBe('true');
            expect(comp.stringify(false)).toBe('false');
        });

        it('should return JSON string of an object', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expect(comp.stringify({ a: 1 })).toBe('{"a":1}');
        });

        it('should return JSON string of null', () => {
            const { componentInstance: comp } = MockRender(CheckboxPlaygroundComponent).point;
            expect(comp.stringify(null)).toBe('null');
        });
    });
});




describe('CheckboxComponent', () => {
    beforeEach(() => MockBuilder(CheckboxComponent, CheckboxesModule));

    describe('labelPosition input', () => {
        it('should default to "right"', () => {
            expect(MockRender(CheckboxComponent, { labelPosition: 'right' }).point.componentInstance.labelPosition).toBe('right');
        });

        it('should accept "left"', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent, { labelPosition: 'left' }).point;
            expect(comp.labelPosition).toBe('left');
        });
    });

    describe('variant input', () => {
        it('should default to "branded"', () => {
            expect(MockRender(CheckboxComponent, { variant: 'branded' }).point.componentInstance.variant).toBe('branded');
        });

        it('should accept "pass"', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent, { variant: 'pass' }).point;
            expect(comp.variant).toBe('pass');
        });

        it('should accept "fail"', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent, { variant: 'fail' }).point;
            expect(comp.variant).toBe('fail');
        });
    });

    describe('size input', () => {
        it('should default to "small"', () => {
            expect(MockRender(CheckboxComponent, { size: 'small' }).point.componentInstance.size).toBe('small');
        });

        it('should accept "large"', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent, { size: 'large' }).point;
            expect(comp.size).toBe('large');
        });
    });

    describe('hideLabel input', () => {
        it('should default to false', () => {
            expect(MockRender(CheckboxComponent, { hideLabel: false }).point.componentInstance.hideLabel).toBeFalse();
        });

        it('should accept true', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent, { hideLabel: true }).point;
            expect(comp.hideLabel).toBeTrue();
        });
    });

    describe('checked setter', () => {
        it('should set value when checked input is true', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent, { checked: true } as any).point;
            expect(comp.value).toBeTrue();
        });

        it('should set value when checked input is false', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent, { checked: false } as any).point;
            expect(comp.value).toBeFalse();
        });
    });

    describe('disabled setter', () => {
        it('should set _disabled to true', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent, { disabled: true } as any).point;
            expect(comp._disabled).toBeTrue();
        });

        it('should set _disabled to false', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent, { disabled: false } as any).point;
            expect(comp._disabled).toBeFalse();
        });

        it('disabled getter should reflect _disabled', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent).point;
            comp.setDisabledState(true);
            expect(comp.disabled).toBeTrue();
            comp.setDisabledState(false);
            expect(comp.disabled).toBeFalse();
        });
    });

    describe('handleChange()', () => {
        it('should toggle value from false to true', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent).point;
            comp.value = false;
            comp.handleChange();
            expect(comp.value).toBeTrue();
        });

        it('should toggle value from true to false', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent).point;
            comp.value = true;
            comp.handleChange();
            expect(comp.value).toBeFalse();
        });

        it('should call onChange with the new value', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent).point;
            const spy = jasmine.createSpy('onChange');
            comp.registerOnChange(spy);
            comp.value = false;
            comp.handleChange();
            expect(spy).toHaveBeenCalledWith(true);
        });

        it('should call onTouched', () => {
            const { componentInstance: comp } = MockRender(CheckboxComponent).point;
            const spy = jasmine.createSpy('onTouched');
            comp.registerOnTouched(spy);
            comp.handleChange();
            expect(spy).toHaveBeenCalled();
        });
    });
});
