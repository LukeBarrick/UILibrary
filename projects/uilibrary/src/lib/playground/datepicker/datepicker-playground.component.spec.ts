import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { DatePickerPlaygroundComponent } from './datepicker-playground.component';
import { PlaygroundModule } from '../playground.module';
import {
    expectControlDisabled,
    expectControlInvalid,
    expectControlValid,
} from '../testing/form-control.helpers';

describe('DatePickerPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(DatePickerPlaygroundComponent, PlaygroundModule).keep(ReactiveFormsModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(DatePickerPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('showOutput @Input should default to false', () => {
            const fixture = TestBed.createComponent(DatePickerPlaygroundComponent);
            expect(fixture.componentInstance.showOutput).toBeFalse();
        });

        it('datePickerModel should be undefined initially', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expect(comp.datePickerModel).toBeUndefined();
        });

        it('startDateModel should be undefined initially', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expect(comp.startDateModel).toBeUndefined();
        });

        it('endDateModel should be undefined initially', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expect(comp.endDateModel).toBeUndefined();
        });
    });

    describe('datepickerForm initialisation', () => {
        it('datePickerControl should have no value', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expect(comp.datepickerForm.get('datePickerControl')?.value).toBeNull();
        });

        it('datePickerWithValue should initialise to a Date instance', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expect(comp.datepickerForm.get('datePickerWithValue')?.value).toBeInstanceOf(Date);
        });

        it('datePickerWithValue should be valid (satisfies required validator)', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expectControlValid(comp.datepickerForm.get('datePickerWithValue'));
        });

        it('datePickerDisabled should be disabled', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expectControlDisabled(comp.datepickerForm.get('datePickerDisabled'));
        });

        it('datePickerDisabled should have no value', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expect(comp.datepickerForm.get('datePickerDisabled')?.value).toBeUndefined();
        });

        it('startDate should be invalid (required) and have no value', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expectControlInvalid(comp.datepickerForm.get('startDate'));
            expect(comp.datepickerForm.get('startDate')?.value).toBeNull();
        });

        it('endDate should be invalid (required) and have no value', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expectControlInvalid(comp.datepickerForm.get('endDate'));
            expect(comp.datepickerForm.get('endDate')?.value).toBeNull();
        });

        it('startDateDisabled should be disabled', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expectControlDisabled(comp.datepickerForm.get('startDateDisabled'));
        });

        it('endDateDisabled should be disabled', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expectControlDisabled(comp.datepickerForm.get('endDateDisabled'));
        });
    });

    describe('stringify()', () => {
        it('should return JSON string of a Date', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            const date = new Date('2024-01-15');
            expect(comp.stringify(date)).toBe(JSON.stringify(date));
        });

        it('should return JSON string of undefined', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expect(comp.stringify(undefined)).toBeUndefined();
        });

        it('should return JSON string of null', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expect(comp.stringify(null)).toBe('null');
        });
    });
});
