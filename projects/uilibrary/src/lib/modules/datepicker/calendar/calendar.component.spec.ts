import { MockBuilder, MockRender } from 'ng-mocks';

import { CalendarComponent } from './calendar.component';
import { DatepickerModule } from '../datepicker.module';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';

describe('CalendarComponent', () => {
  beforeEach(() => MockBuilder(CalendarComponent, DatepickerModule)
    .provide({ provide: DATE_NOW, useValue: new Date() }));

  it('should create', () => {
    expect(MockRender(CalendarComponent).point.componentInstance).toBeTruthy();
  });
});
