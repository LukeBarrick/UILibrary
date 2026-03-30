import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'uilibrary-datepicker-playground',
    templateUrl: 'datepicker-playground.component.html',
    styleUrl: 'datepicker-playground.component.scss',
    standalone: false
})

export class DatePickerPlaygroundComponent implements OnInit {
    fb = inject(FormBuilder);

    @Input() showOutput: boolean = false;

    datePickerModel: Date | undefined = undefined;
    startDateModel: Date | undefined = undefined;
    endDateModel: Date | undefined = undefined;

    datepickerForm: FormGroup = this.fb.group({
        datePickerControl: [],
        datePickerWithValue: [new Date(), Validators.required],
        datePickerDisabled: [{ value: undefined, disabled: true }],
        startDate: [undefined, Validators.required],
        endDate: [undefined, Validators.required],
        startDateDisabled: [{ value: undefined, disabled: true }],
        endDateDisabled: [{ value: undefined, disabled: true }]
    });

    constructor() { }

    ngOnInit() { }

    stringify(value: any) {
        return JSON.stringify(value);
    }
}