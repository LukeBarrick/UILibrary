import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerInputComponent } from './datepicker-input.component';

describe('DatepickerInputComponent', () => {
  let component: DatePickerInputComponent;
  let fixture: ComponentFixture<DatePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatePickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
