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
      datePicker2: [undefined],
      datePicker3: [undefined],
      datePicker4: [undefined, [Validators.required]],
      datePicker5: [undefined],
      startDate1: [undefined, [Validators.required]],
      endDate1: [undefined, [Validators.required]],
      startDate2: [undefined],
      endDate2: [undefined],
      startDate3: [undefined],
      endDate3: [undefined],
      startDate4: [undefined],
      endDate4: [undefined],
      startDate5: [undefined],
      endDate5: [undefined]
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
    if (!this.startDateModel || !this.endDateModel) {
      if (!this.interactiveStart || !this.interactiveEnd) {
        return 0;
      }
      const diffTime = Math.abs(this.interactiveEnd.getTime() - this.interactiveStart.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    
    const start = new Date(this.startDateModel);
    const end = new Date(this.endDateModel);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
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
    this.startDateModel = today.toISOString().split('T')[0];
    this.endDateModel = today.toISOString().split('T')[0];
    this.lastDateAction = `All dates set to today (${today.toDateString()})`;
  }

  setThisWeek(): void {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today.getTime() - dayOfWeek * 24 * 60 * 60 * 1000);
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    this.interactiveStart = startOfWeek;
    this.interactiveEnd = endOfWeek;
    this.startDateModel = startOfWeek.toISOString().split('T')[0];
    this.endDateModel = endOfWeek.toISOString().split('T')[0];
    this.lastDateAction = `Date range set to this week (${startOfWeek.toDateString()} - ${endOfWeek.toDateString()})`;
  }

  setThisMonth(): void {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    this.interactiveStart = startOfMonth;
    this.interactiveEnd = endOfMonth;
    this.startDateModel = startOfMonth.toISOString().split('T')[0];
    this.endDateModel = endOfMonth.toISOString().split('T')[0];
    this.lastDateAction = `Date range set to this month (${startOfMonth.toDateString()} - ${endOfMonth.toDateString()})`;
  }

  setLastWeek(): void {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfLastWeek = new Date(today.getTime() - (dayOfWeek + 7) * 24 * 60 * 60 * 1000);
    const endOfLastWeek = new Date(startOfLastWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    this.interactiveStart = startOfLastWeek;
    this.interactiveEnd = endOfLastWeek;
    this.startDateModel = startOfLastWeek.toISOString().split('T')[0];
    this.endDateModel = endOfLastWeek.toISOString().split('T')[0];
    this.lastDateAction = `Date range set to last week (${startOfLastWeek.toDateString()} - ${endOfLastWeek.toDateString()})`;
  }

  setLastMonth(): void {
    const today = new Date();
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    this.interactiveStart = startOfLastMonth;
    this.interactiveEnd = endOfLastMonth;
    this.startDateModel = startOfLastMonth.toISOString().split('T')[0];
    this.endDateModel = endOfLastMonth.toISOString().split('T')[0];
    this.lastDateAction = `Date range set to last month (${startOfLastMonth.toDateString()} - ${endOfLastMonth.toDateString()})`;
  }

  clearDates(): void {
    this.prefilledDate = new Date();
    this.interactiveStart = null;
    this.interactiveEnd = null;
    this.startDateModel = undefined;
    this.endDateModel = undefined;
    this.datePickers2.patchValue({
      datePicker1: undefined,
      datePicker2: undefined,
      datePicker3: undefined,
      datePicker4: undefined,
      datePicker5: undefined,
      startDate1: undefined,
      endDate1: undefined,
      startDate2: undefined,
      endDate2: undefined,
      startDate3: undefined,
      endDate3: undefined,
      startDate4: undefined,
      endDate4: undefined,
      startDate5: undefined,
      endDate5: undefined
    });
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
    const debugData = {
      modelDatePicker1: this.modelDatePicker1,
      startDateModel: this.startDateModel,
      endDateModel: this.endDateModel,
      formValues: this.datePickers2.value,
      validationFormValues: this.validationForm.value,
      duration: this.calculateDuration()
    };
    console.log('Date Pickers Debug:', debugData);
    this.lastDateAction = 'Debug information logged to console';
  }

  logFormState(): void {
    this.debugInfo = JSON.stringify({
      datePickers2: {
        value: this.datePickers2.value,
        valid: this.datePickers2.valid,
        pristine: this.datePickers2.pristine,
        dirty: this.datePickers2.dirty,
        errors: this.getFormErrors(this.datePickers2)
      },
      validationForm: {
        value: this.validationForm.value,
        valid: this.validationForm.valid,
        pristine: this.validationForm.pristine,
        dirty: this.validationForm.dirty,
        errors: this.getFormErrors(this.validationForm)
      },
      modelValues: {
        modelDatePicker1: this.modelDatePicker1,
        startDateModel: this.startDateModel,
        endDateModel: this.endDateModel,
        interactiveStart: this.interactiveStart,
        interactiveEnd: this.interactiveEnd,
        duration: this.calculateDuration()
      }
    }, null, 2);
    this.lastDateAction = 'Form state logged';
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