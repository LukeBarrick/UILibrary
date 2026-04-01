import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'uilibrary-radio-playground',
    templateUrl: 'radio-playground.component.html',
    styleUrl: 'radio-playground.component.scss',
    standalone: false
})

export class RadioPlaygroundComponent implements OnInit {
    fb = inject(FormBuilder);

    @Input() showOutput: boolean = false;

    radioGroupModel: any = 1;
    isGroupDisabled: boolean = true;
    lastCheckedChangeValue: boolean | undefined = undefined;

    onCheckedChange(value: boolean): void {
        this.lastCheckedChangeValue = value;
    }

    radioForm: FormGroup = this.fb.group({
        radioControl: [],
        radioWithValue: [2],
        radioDisabled: [{ value: 1, disabled: true }],
        radioError: [undefined, Validators.required],
        radioUntouched: [undefined, Validators.required]
    });

    constructor() { }

    ngOnInit() {
        this.radioForm.get('radioError')?.markAsTouched();
    }

    toggleGroupDisabled() {
        this.isGroupDisabled = !this.isGroupDisabled;
    }

    toggleDisabledFormControl() {
        const formControl = this.radioForm.get('radioDisabled');
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