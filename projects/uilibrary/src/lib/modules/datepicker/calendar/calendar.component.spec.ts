import { MockBuilder, MockRender } from 'ng-mocks';

import { CalendarComponent } from './calendar.component';
import { DatepickerModule } from '../datepicker.module';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';

describe('CalendarComponent', () => {
  describe('creation', () => {
    beforeEach(() => MockBuilder(CalendarComponent, DatepickerModule)
      .provide({ provide: DATE_NOW, useValue: new Date() }));

    it('should create', () => {
      expect(MockRender(CalendarComponent).point.componentInstance).toBeTruthy();
    });
  });

  describe('ngOnInit — initial calendar view', () => {
    const TODAY = new Date(2025, 5, 15); // 15 June 2025

    beforeEach(() => MockBuilder(CalendarComponent, DatepickerModule)
      .provide({ provide: DATE_NOW, useValue: TODAY }));

    it('defaults to today when no selecteDates input is provided', () => {
      const comp = MockRender(CalendarComponent).point.componentInstance;
      expect(comp.selectedMonth).toBe(TODAY.getMonth());
      expect(comp.selectedYear).toBe(TODAY.getFullYear());
    });

    it('defaults to today when selecteDates is an empty array', () => {
      const comp = MockRender(CalendarComponent, { selecteDates: [] }).point.componentInstance;
      expect(comp.selectedMonth).toBe(TODAY.getMonth());
      expect(comp.selectedYear).toBe(TODAY.getFullYear());
    });

    it('navigates to the month of a single Date input', () => {
      const date = new Date(2023, 0, 10); // January 2023
      const comp = MockRender(CalendarComponent, { selecteDates: date }).point.componentInstance;
      expect(comp.selectedMonth).toBe(0);
      expect(comp.selectedYear).toBe(2023);
    });

    it('navigates to the earliest date when an array with one date is provided', () => {
      const date = new Date(2023, 0, 10); // January 2023
      const comp = MockRender(CalendarComponent, { selecteDates: [date] }).point.componentInstance;
      expect(comp.selectedMonth).toBe(0);
      expect(comp.selectedYear).toBe(2023);
    });

    it('navigates to the earliest date when an array of multiple dates is provided (earliest first)', () => {
      const earliest = new Date(2023, 0, 10); // January 2023
      const later   = new Date(2024, 6, 20); // July 2024
      const comp = MockRender(CalendarComponent, { selecteDates: [earliest, later] }).point.componentInstance;
      expect(comp.selectedMonth).toBe(0);
      expect(comp.selectedYear).toBe(2023);
    });

    it('navigates to selecteDates[0] when the array is not sorted (documents first-element semantics)', () => {
      const later   = new Date(2024, 6, 20); // July 2024
      const earlier = new Date(2023, 0, 10); // January 2023
      const comp = MockRender(CalendarComponent, { selecteDates: [later, earlier] }).point.componentInstance;
      expect(comp.selectedMonth).toBe(6);
      expect(comp.selectedYear).toBe(2024);
    });
  });
});
