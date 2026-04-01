import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FormFieldPlaygroundComponent } from './form-field-playground.component';
import { PlaygroundModule } from '../playground.module';

describe('FormFieldPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(FormFieldPlaygroundComponent, PlaygroundModule).keep(ReactiveFormsModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(FormFieldPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('showOutput @Input should default to undefined', () => {
            const fixture = TestBed.createComponent(FormFieldPlaygroundComponent);
            expect(fixture.componentInstance.showOutput).toBeUndefined();
        });
    });

    describe('Prefix and suffix property defaults', () => {
        it('prefixValue should default to undefined', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.prefixValue).toBeUndefined();
        });

        it('suffixValue should default to undefined', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.suffixValue).toBeUndefined();
        });

        it('textPrefixValue should default to a space string', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.textPrefixValue).toBe(' ');
        });

        it('textSuffixValue should default to a space string', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.textSuffixValue).toBe(' ');
        });

        it('textSuffixRightAlValue should default to a space string', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.textSuffixRightAlValue).toBe(' ');
        });
    });

    describe('labelShouldNotFloatForm', () => {
        it('emptyString control should initialise to empty string', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.labelShouldNotFloatForm.get('emptyString')?.value).toBe('');
        });

        it('undefined control should initialise to null', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.labelShouldNotFloatForm.get('undefined')?.value).toBeNull();
        });
    });

    describe('labelShouldFloatForm', () => {
        it('holdsValue control should initialise to "Value"', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.labelShouldFloatForm.get('holdsValue')?.value).toBe('Value');
        });
    });

    describe('inputTypesForm', () => {
        const expectedControls = ['text', 'password', 'email', 'url', 'search', 'tel', 'number'];

        expectedControls.forEach(controlName => {
            it(`should contain a '${controlName}' control`, () => {
                const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
                expect(comp.inputTypesForm.get(controlName)).not.toBeNull();
            });

            it(`'${controlName}' control should initialise with no value`, () => {
                const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
                expect(comp.inputTypesForm.get(controlName)?.value).toBeNull();
            });
        });
    });

    describe('additionalInputTypesForm', () => {
        const expectedControls = ['date', 'datetimelocal', 'time', 'month', 'week'];

        expectedControls.forEach(controlName => {
            it(`should contain a '${controlName}' control`, () => {
                const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
                expect(comp.additonalInputTypesForm.get(controlName)).not.toBeNull();
            });

            it(`'${controlName}' control should initialise with no value`, () => {
                const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
                expect(comp.additonalInputTypesForm.get(controlName)?.value).toBeNull();
            });
        });
    });

    describe('stringify()', () => {
        it('should return JSON string of a string value', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.stringify('test')).toBe('"test"');
        });

        it('should return JSON string of null', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.stringify(null)).toBe('null');
        });

        it('should return JSON string of an object', () => {
            const { componentInstance: comp } = MockRender(FormFieldPlaygroundComponent).point;
            expect(comp.stringify({ x: 1 })).toBe('{"x":1}');
        });
    });
});
