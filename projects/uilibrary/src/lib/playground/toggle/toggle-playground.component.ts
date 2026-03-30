import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'uilibrary-toggle-playground',
    templateUrl: 'toggle-playground.component.html',
    styleUrl: 'toggle-playground.component.scss',
    standalone: false
})

export class TogglePlaygroundComponent implements OnInit {
    fb = inject(FormBuilder);

    @Input() showOutput: boolean = false;

    basicToggleBinding: boolean = false;
    basicToggleDisabled: boolean = false;
    isDisabled: boolean = true;

    toggleForm: FormGroup = this.fb.group({
        toggleControl: [],
        toggleWithValue: [true],
        toggleDisabled: [{ value: true, disabled: true }],
        toggleError: [undefined, Validators.required],
        toggleUntouched: [undefined, Validators.required]
    });

    constructor() { }

    ngOnInit() {
        this.toggleForm.get('toggleError')?.markAsTouched();
    }

    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    toggleDisabledFormControl() {
        const formControl = this.toggleForm.get('toggleDisabled');
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