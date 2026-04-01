import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { RadioPlaygroundComponent } from './radio-playground.component';
import { PlaygroundModule } from '../playground.module';
import {
    expectControlDisabled,
    expectControlEnabled,
    expectControlInvalid,
    expectControlTouched,
    expectControlUntouched,
} from '../testing/form-control.helpers';
import { RadioButtonComponent } from '../../modules/radio/button/button.component';
import { RadioModule } from '../../modules/radio/radio.module';

describe('RadioPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(RadioPlaygroundComponent, PlaygroundModule).keep(ReactiveFormsModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(RadioPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('showOutput @Input should default to false', () => {
            const fixture = TestBed.createComponent(RadioPlaygroundComponent);
            expect(fixture.componentInstance.showOutput).toBeFalse();
        });

        it('radioGroupModel should default to 1', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.radioGroupModel).toBe(1);
        });

        it('isGroupDisabled should default to true', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.isGroupDisabled).toBeTrue();
        });
    });

    describe('Form initialisation', () => {
        it('radioControl should have no initial value', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.radioForm.get('radioControl')?.value).toBeNull();
        });

        it('radioWithValue should initialise to 2', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.radioForm.get('radioWithValue')?.value).toBe(2);
        });

        it('radioDisabled control should start as disabled', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expectControlDisabled(comp.radioForm.get('radioDisabled'));
        });

        it('radioDisabled should have an initial value of 1', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.radioForm.get('radioDisabled')?.value).toBe(1);
        });

        it('radioError should be invalid (required) on init', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expectControlInvalid(comp.radioForm.get('radioError'));
        });

        it('radioUntouched should be invalid (required) on init', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expectControlInvalid(comp.radioForm.get('radioUntouched'));
        });
    });

    describe('ngOnInit', () => {
        it('radioError control should be marked as touched after init', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expectControlTouched(comp.radioForm.get('radioError'));
        });

        it('radioUntouched control should NOT be marked as touched after init', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expectControlUntouched(comp.radioForm.get('radioUntouched'));
        });
    });

    describe('toggleGroupDisabled()', () => {
        it('should flip isGroupDisabled from true to false', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.isGroupDisabled).toBeTrue();
            comp.toggleGroupDisabled();
            expect(comp.isGroupDisabled).toBeFalse();
        });

        it('should flip isGroupDisabled back to true on second call', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            comp.toggleGroupDisabled();
            comp.toggleGroupDisabled();
            expect(comp.isGroupDisabled).toBeTrue();
        });
    });

    describe('toggleDisabledFormControl()', () => {
        it('should enable radioDisabled when it is currently disabled', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            const ctrl = comp.radioForm.get('radioDisabled')!;
            expect(ctrl.disabled).toBeTrue();
            comp.toggleDisabledFormControl();
            expectControlEnabled(ctrl);
        });

        it('should disable radioDisabled control when it is currently enabled', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            const ctrl = comp.radioForm.get('radioDisabled')!;
            ctrl.enable();
            comp.toggleDisabledFormControl();
            expectControlDisabled(ctrl);
        });
    });

    describe('stringify()', () => {
        it('should return JSON string of a number', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.stringify(1)).toBe('1');
        });

        it('should return JSON string of a string value', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.stringify('option-a')).toBe('"option-a"');
        });

        it('should return JSON string of null', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.stringify(null)).toBe('null');
        });
    });

    describe('lastCheckedChangeValue', () => {
        it('should be undefined initially', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            expect(comp.lastCheckedChangeValue).toBeUndefined();
        });
    });

    describe('onCheckedChange()', () => {
        it('should set lastCheckedChangeValue to true when called with true', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            comp.onCheckedChange(true);
            expect(comp.lastCheckedChangeValue).toBeTrue();
        });

        it('should set lastCheckedChangeValue to false when called with false', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            comp.onCheckedChange(false);
            expect(comp.lastCheckedChangeValue).toBeFalse();
        });

        it('should overwrite a previous value on subsequent calls', () => {
            const { componentInstance: comp } = MockRender(RadioPlaygroundComponent).point;
            comp.onCheckedChange(true);
            comp.onCheckedChange(false);
            expect(comp.lastCheckedChangeValue).toBeFalse();
        });
    });
});

// ─── RadioButtonComponent direct API tests ───────────────────────────────────
describe('RadioButtonComponent', () => {
    beforeEach(() => MockBuilder(RadioButtonComponent, RadioModule));

    describe('labelPosition input', () => {
        it('should default to "left"', () => {
            const comp = TestBed.createComponent(RadioButtonComponent).componentInstance;
            expect(comp.labelPosition).toBe('left');
        });

        it('should accept "right"', () => {
            const { componentInstance: comp } = MockRender(RadioButtonComponent, { labelPosition: 'right' }).point;
            expect(comp.labelPosition).toBe('right');
        });
    });

    describe('disabled input', () => {
        it('should default to false', () => {
            const comp = TestBed.createComponent(RadioButtonComponent).componentInstance;
            expect(comp.disabled).toBeFalse();
        });

        it('should accept true', () => {
            const { componentInstance: comp } = MockRender(RadioButtonComponent, { disabled: true }).point;
            expect(comp.disabled).toBeTrue();
        });
    });

    describe('value input', () => {
        it('should accept and store any value', () => {
            const { componentInstance: comp } = MockRender(RadioButtonComponent, { value: 'option-a' }).point;
            expect(comp.value).toBe('option-a');
        });
    });

    describe('check()', () => {
        it('should set checked to true and emit when not disabled', () => {
            const { componentInstance: comp } = MockRender(RadioButtonComponent, { disabled: false }).point;
            const emitSpy = spyOn(comp.checkedChange, 'emit');
            comp.check();
            expect(comp.checked).toBeTrue();
            expect(emitSpy).toHaveBeenCalledWith(true);
        });

        it('should not set checked or emit when disabled', () => {
            const { componentInstance: comp } = MockRender(RadioButtonComponent, { disabled: true }).point;
            const emitSpy = spyOn(comp.checkedChange, 'emit');
            comp.checked = false;
            comp.check();
            expect(comp.checked).toBeFalse();
            expect(emitSpy).not.toHaveBeenCalled();
        });
    });

    describe('checkChanged()', () => {
        it('should emit when not disabled', () => {
            const { componentInstance: comp } = MockRender(RadioButtonComponent, { disabled: false }).point;
            const emitSpy = spyOn(comp.checkedChange, 'emit');
            comp.checkChanged();
            expect(emitSpy).toHaveBeenCalled();
        });

        it('should not emit when disabled', () => {
            const { componentInstance: comp } = MockRender(RadioButtonComponent, { disabled: true }).point;
            const emitSpy = spyOn(comp.checkedChange, 'emit');
            comp.checkChanged();
            expect(emitSpy).not.toHaveBeenCalled();
        });
    });
});
