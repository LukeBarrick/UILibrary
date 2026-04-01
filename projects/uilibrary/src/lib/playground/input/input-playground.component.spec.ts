import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { InputPlaygroundComponent } from './input-playground.component';
import { PlaygroundModule } from '../playground.module';
import {
    expectControlDisabled,
    expectControlEnabled,
    expectControlInvalid,
    expectControlTouched,
    expectControlUntouched,
} from '../testing/form-control.helpers';

describe('InputPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(InputPlaygroundComponent, PlaygroundModule).keep(ReactiveFormsModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(InputPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('showOutput @Input should default to false', () => {
            const fixture = TestBed.createComponent(InputPlaygroundComponent);
            expect(fixture.componentInstance.showOutput).toBeFalse();
        });

        it('isDisabled should default to true', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expect(comp.isDisabled).toBeTrue();
        });

        it('basicInputBinding should default to preset string', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expect(comp.basicInputBinding).toBe('Basic Input (Binding)');
        });

        it('hasError should default to true', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expect(comp.hasError).toBeTrue();
        });
    });

    describe('Form initialisation', () => {
        it('formControlInput should have no initial value', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expect(comp.formControlInputForm.get('formControlInput')?.value).toBeNull();
        });

        it('formControlInputWithValue should initialise to preset string', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expect(comp.formControlInputForm.get('formControlInputWithValue')?.value)
                .toBe('Form Control Input (Preset Value)');
        });

        it('formControlInputDisabled control should start as disabled', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expectControlDisabled(comp.formControlInputForm.get('formControlInputDisabled'));
        });

        it('formControlInputDisabled should have an initial value of empty string', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expect(comp.formControlInputForm.get('formControlInputDisabled')?.value).toBe('');
        });

        it('formControlInputError should be invalid (required) on init', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expectControlInvalid(comp.formControlInputForm.get('formControlInputError'));
        });

        it('formControlInputUntouched should be invalid (required) on init', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expectControlInvalid(comp.formControlInputForm.get('formControlInputUntouched'));
        });
    });

    describe('ngOnInit', () => {
        it('formControlInputError should be marked as touched after init', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expectControlTouched(comp.formControlInputForm.get('formControlInputError'));
        });

        it('formControlInputUntouched should NOT be marked as touched after init', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expectControlUntouched(comp.formControlInputForm.get('formControlInputUntouched'));
        });
    });

    describe('toggleDisabled()', () => {
        it('should flip isDisabled from true to false', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expect(comp.isDisabled).toBeTrue();
            comp.toggleDisabled();
            expect(comp.isDisabled).toBeFalse();
        });

        it('should flip isDisabled back to true on second call', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            comp.toggleDisabled();
            comp.toggleDisabled();
            expect(comp.isDisabled).toBeTrue();
        });
    });

    describe('toggleDisabledFormControl()', () => {
        it('should enable formControlInputDisabled when it is currently disabled', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            const ctrl = comp.formControlInputForm.get('formControlInputDisabled')!;
            expect(ctrl.disabled).toBeTrue();
            comp.toggleDisabledFormControl();
            expectControlEnabled(ctrl);
        });

        it('should disable formControlInputDisabled when it is currently enabled', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            const ctrl = comp.formControlInputForm.get('formControlInputDisabled')!;
            ctrl.enable();
            comp.toggleDisabledFormControl();
            expectControlDisabled(ctrl);
        });
    });

    describe('stringify()', () => {
        it('should return JSON string of a string value', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expect(comp.stringify('hello')).toBe('"hello"');
        });

        it('should return JSON string of an empty string', () => {
            const { componentInstance: comp } = MockRender(InputPlaygroundComponent).point;
            expect(comp.stringify('')).toBe('""');
        });
    });
});
