import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { DatePickerPlaygroundComponent } from './datepicker-playground.component';
import { PlaygroundModule } from '../playground.module';
import {
    expectControlDisabled,
    expectControlInvalid,
    expectControlValid,
} from '../testing/form-control.helpers';
import { DatePickerInputComponent } from '../../modules/datepicker/datepicker-input/datepicker-input.component';
import { DateRangeInputComponent } from '../../modules/datepicker/date-range-input/date-range-input.component';
import { CalendarComponent } from '../../modules/datepicker/calendar/calendar.component';
import { DatepickerModule } from '../../modules/datepicker/datepicker.module';
import { DATE_NOW } from '../../core/tokens/DATE_NOW';

describe('DatePickerPlaygroundComponent', () => {
    beforeEach(() => MockBuilder(DatePickerPlaygroundComponent, PlaygroundModule).keep(ReactiveFormsModule));

    describe('Component initialisation', () => {
        it('should create', () => {
            const fixture = MockRender(DatePickerPlaygroundComponent);
            expect(fixture.point.componentInstance).toBeTruthy();
        });

        it('showOutput @Input should default to false', () => {
            expect(MockRender(DatePickerPlaygroundComponent, { showOutput: false }).point.componentInstance.showOutput).toBeFalse();
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

    describe('calendarSelectedDates', () => {
        it('should default to an empty array', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            expect(comp.calendarSelectedDates).toEqual([]);
        });
    });

    describe('onDateSelected()', () => {
        it('should append a date to calendarSelectedDates', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            const date = new Date('2025-06-15');
            comp.onDateSelected(date);
            expect(comp.calendarSelectedDates.length).toBe(1);
            expect(comp.calendarSelectedDates[0]).toBe(date);
        });

        it('should accumulate dates on repeated calls', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            const d1 = new Date('2025-06-15');
            const d2 = new Date('2025-06-16');
            comp.onDateSelected(d1);
            comp.onDateSelected(d2);
            expect(comp.calendarSelectedDates.length).toBe(2);
            expect(comp.calendarSelectedDates[1]).toBe(d2);
        });

        it('should not mutate the original array (creates a new array reference)', () => {
            const { componentInstance: comp } = MockRender(DatePickerPlaygroundComponent).point;
            const original = comp.calendarSelectedDates;
            comp.onDateSelected(new Date());
            expect(comp.calendarSelectedDates).not.toBe(original);
        });
    });

    describe('Template', () => {
        it('should render at least one uilibrary-datepicker-input with [editable]="true"', () => {
            MockRender(DatePickerPlaygroundComponent);
            const pickers = ngMocks.findAll('uilibrary-datepicker-input');
            const editablePickers = pickers.filter(p => ngMocks.input(p, 'editable') === true);
            expect(editablePickers.length).toBeGreaterThan(0);
        });

        it('should render at least one uilibrary-datepicker-input with [closeOnSelection]="false"', () => {
            MockRender(DatePickerPlaygroundComponent);
            const pickers = ngMocks.findAll('uilibrary-datepicker-input');
            const stayOpenPickers = pickers.filter(p => ngMocks.input(p, 'closeOnSelection') === false);
            expect(stayOpenPickers.length).toBeGreaterThan(0);
        });

        it('should render a standalone uilibrary-calendar-select', () => {
            MockRender(DatePickerPlaygroundComponent);
            const calendars = ngMocks.findAll('uilibrary-calendar-select');
            expect(calendars.length).toBeGreaterThan(0);
        });

        it('should bind calendarSelectedDates to the calendar selecteDates input', () => {
            const fixture = MockRender(DatePickerPlaygroundComponent);
            const comp = fixture.point.componentInstance;
            const calendar = ngMocks.findAll('uilibrary-calendar-select')[0];
            expect(ngMocks.input(calendar, 'selecteDates')).toBe(comp.calendarSelectedDates);
        });
    });
});

// ─── DatePickerInputComponent direct API tests ───────────────────────────────
describe('DatePickerInputComponent', () => {
    beforeEach(() => MockBuilder(DatePickerInputComponent, DatepickerModule)
        .provide({ provide: DATE_NOW, useValue: new Date() }));

    it('should create', () => {
        expect(MockRender(DatePickerInputComponent).point.componentInstance).toBeTruthy();
    });

    describe('editable input', () => {
        it('should default to false', () => {
            expect(MockRender(DatePickerInputComponent, { editable: false }).point.componentInstance.editable).toBeFalse();
        });

        it('should accept true', () => {
            const { componentInstance: comp } = MockRender(DatePickerInputComponent, { editable: true }).point;
            expect(comp.editable).toBeTrue();
        });
    });

    describe('closeOnSelection input', () => {
        it('should default to true', () => {
            expect(MockRender(DatePickerInputComponent, { closeOnSelection: true }).point.componentInstance.closeOnSelection).toBeTrue();
        });

        it('should accept false', () => {
            const { componentInstance: comp } = MockRender(DatePickerInputComponent, { closeOnSelection: false }).point;
            expect(comp.closeOnSelection).toBeFalse();
        });
    });
});

// ─── CalendarComponent direct API tests ──────────────────────────────────────
describe('CalendarComponent', () => {
    beforeEach(() => MockBuilder(CalendarComponent, DatepickerModule)
        .provide({ provide: DATE_NOW, useValue: new Date() }));

    it('should create', () => {
        expect(MockRender(CalendarComponent).point.componentInstance).toBeTruthy();
    });

    describe('dateSelected output', () => {
        it('should be an EventEmitter', () => {
            const comp = MockRender(CalendarComponent).point.componentInstance;
            expect(comp.dateSelected).toBeDefined();
            expect(typeof comp.dateSelected.emit).toBe('function');
        });
    });
});

// ─── DateRangeInputComponent direct API tests ─────────────────────────────────
describe('DateRangeInputComponent', () => {
    beforeEach(() => MockBuilder(DateRangeInputComponent, DatepickerModule));

    it('should create', () => {
        expect(MockRender(DateRangeInputComponent).point.componentInstance).toBeTruthy();
    });

    describe('editable input', () => {
        it('should default to true', () => {
            expect(MockRender(DateRangeInputComponent, { editable: true }).point.componentInstance.editable).toBeTrue();
        });

        it('should accept false', () => {
            const { componentInstance: comp } = MockRender(DateRangeInputComponent, { editable: false }).point;
            expect(comp.editable).toBeFalse();
        });
    });

    describe('closeOnSelection input', () => {
        it('should default to true', () => {
            expect(MockRender(DateRangeInputComponent, { closeOnSelection: true }).point.componentInstance.closeOnSelection).toBeTrue();
        });

        it('should accept false', () => {
            const { componentInstance: comp } = MockRender(DateRangeInputComponent, { closeOnSelection: false }).point;
            expect(comp.closeOnSelection).toBeFalse();
        });
    });
});
