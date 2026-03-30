import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'uilibrary-checkbox-playground',
    templateUrl: 'checkbox-playground.component.html',
    styleUrl: 'checkbox-playground.component.scss',
    standalone: false
})

export class CheckboxPlaygroundComponent implements OnInit {
    fb = inject(FormBuilder);

    @Input() showOutput: boolean = false;

    basicCheckboxBinding: boolean = false;
    basicCheckboxDisabled: boolean = false;
    isDisabled: boolean = true;

    checkboxForm: FormGroup = this.fb.group({
        checkboxControl: [],
        checkboxWithValue: [true],
        checkboxDisabled: [{ value: true, disabled: true }],
        checkboxError: [undefined, Validators.required],
        checkboxUntouched: [undefined, Validators.required]
    });

    constructor() { }

    ngOnInit() {
        this.checkboxForm.get('checkboxError')?.markAsTouched();
    }

    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    toggleDisabledFormControl() {
        const formControl = this.checkboxForm.get('checkboxDisabled');
        if (!formControl) return;
        if (formControl.disabled) {
            formControl.enable();
        } else {
            formControl.disable();
        }
    }

    stringify(value: any) {
        return JSON.stringify(value);
    }
}