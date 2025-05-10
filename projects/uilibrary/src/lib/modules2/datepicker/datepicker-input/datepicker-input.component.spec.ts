import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datepicker2InputComponent } from './datepicker-input.component';

describe('DatepickerInputComponent', () => {
  let component: Datepicker2InputComponent;
  let fixture: ComponentFixture<Datepicker2InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datepicker2InputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Datepicker2InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
