import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-datepicker-showcase',
  templateUrl: './datepicker-showcase.component.html',
  styleUrls: ['./datepicker-showcase.component.css']
})
export class DatepickerShowcaseComponent implements OnInit {
  datePickers2: FormGroup;
  validationForm: FormGroup;
  
  modelDatePicker1: Date = new Date();
  startDateModel: string | undefined = undefined;
  endDateModel: string | undefined = undefined;
  
  prefilledDate: Date = new Date();
  interactiveStart: Date | null = null;
  interactiveEnd: Date | null = null;
  
  lastDateAction: string = '';
  validationErrors: string[] = [];
  debugInfo: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.datePickers2 = this.formBuilder.group({
      datePicker1: [undefined, [Validators.required]],
      startDate1: [undefined, [Validators.required]],
      endDate1: [undefined, [Validators.required]],
      datePicker4: [undefined, [Validators.required]]
    });

    this.validationForm = this.formBuilder.group({
      requiredDate: ['', Validators.required],
      futureDate: ['', [Validators.required, this.futureDateValidator]],
      validatedStartDate: [''],
      validatedEndDate: ['']
    });
  }

  ngOnInit(): void {
    // Initialize with current date
    const today = new Date();
    this.prefilledDate = today;
    this.interactiveStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    this.interactiveEnd = today;
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { pastDate: true };
  }

  calculateDuration(): number {
    if(this.interactiveStart instanceof Date && this.interactiveEnd instanceof Date)
      return 0;

    if (this.interactiveStart && this.interactiveEnd) {
      const diffTime = Math.abs(this.interactiveEnd.getTime() - this.interactiveStart.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  }

  isRangeValid(): boolean {
    if (!this.interactiveStart || !this.interactiveEnd) return false;
    return this.interactiveStart <= this.interactiveEnd;
  }

  get dateRangeInvalid(): boolean {
    const start = this.validationForm.get('validatedStartDate')?.value;
    const end = this.validationForm.get('validatedEndDate')?.value;
    if (!start || !end) return false;
    return new Date(start) > new Date(end);
  }

  setToday(): void {
    const today = new Date();
    this.prefilledDate = today;
    this.interactiveStart = today;
    this.interactiveEnd = today;
    this.lastDateAction = 'All dates set to today';
  }

  setThisWeek(): void {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today.getTime() - dayOfWeek * 24 * 60 * 60 * 1000);
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    this.interactiveStart = startOfWeek;
    this.interactiveEnd = endOfWeek;
    this.lastDateAction = `Date range set to this week (${startOfWeek.toDateString()} - ${endOfWeek.toDateString()})`;
  }

  setThisMonth(): void {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    this.interactiveStart = startOfMonth;
    this.interactiveEnd = endOfMonth;
    this.lastDateAction = `Date range set to this month (${startOfMonth.toDateString()} - ${endOfMonth.toDateString()})`;
  }

  clearDates(): void {
    this.prefilledDate = new Date();
    this.interactiveStart = null;
    this.interactiveEnd = null;
    this.startDateModel = undefined;
    this.endDateModel = undefined;
    this.lastDateAction = 'All dates cleared';
  }

  validateForm(): void {
    this.validationForm.markAllAsTouched();
    this.validationErrors = [];

    if (this.validationForm.get('requiredDate')?.hasError('required')) {
      this.validationErrors.push('Required date field is empty');
    }

    if (this.validationForm.get('futureDate')?.hasError('required')) {
      this.validationErrors.push('Future date field is required');
    }

    if (this.validationForm.get('futureDate')?.hasError('pastDate')) {
      this.validationErrors.push('Future date must be today or later');
    }

    if (this.dateRangeInvalid) {
      this.validationErrors.push('End date must be after start date');
    }

    if (this.validationErrors.length === 0) {
      this.validationErrors = [];
      this.lastDateAction = 'Form validation passed successfully!';
    }
  }

  resetValidationForm(): void {
    this.validationForm.reset();
    this.validationErrors = [];
    this.lastDateAction = 'Validation form reset';
  }

  debugDatePickers(): void {
    console.log('Date Pickers Debug:', {
      modelDatePicker1: this.modelDatePicker1,
      startDateModel: this.startDateModel,
      endDateModel: this.endDateModel,
      formValues: this.datePickers2.value,
      validationFormValues: this.validationForm.value
    });
    this.lastDateAction = 'Debug information logged to console';
  }

  logFormState(): void {
    this.debugInfo = JSON.stringify({
      datePickers2: {
        value: this.datePickers2.value,
        valid: this.datePickers2.valid,
        errors: this.getFormErrors(this.datePickers2)
      },
      validationForm: {
        value: this.validationForm.value,
        valid: this.validationForm.valid,
        errors: this.getFormErrors(this.validationForm)
      },
      modelValues: {
        modelDatePicker1: this.modelDatePicker1,
        startDateModel: this.startDateModel,
        endDateModel: this.endDateModel,
        interactiveStart: this.interactiveStart,
        interactiveEnd: this.interactiveEnd
      }
    }, null, 2);
  }

  private getFormErrors(form: FormGroup): any {
    const errors: any = {};
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  stringify(value: any): string {
    return JSON.stringify(value, null, 2);
  }
}