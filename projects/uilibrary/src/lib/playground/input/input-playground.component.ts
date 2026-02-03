import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'uilibrary-input-playground',
    templateUrl: 'input-playground.component.html',
    styleUrl: 'input-playground.component.scss',
    standalone: false
})

export class InputPlaygroundComponent implements OnInit {
    fb = inject(FormBuilder);

    @Input() showOutput: boolean = false;
    
    basicInputBinding: string = 'Basic Input (Binding)';
    basicInputPlaceholder: string = '';
    basicInputDisabled: string = '';
    isDisabled: boolean = true;
    basicInputError: string = '';
    hasError: boolean = true;

    formControlInputForm: FormGroup = this.fb.group({
        formControlInput: [],
        formControlInputWithValue: ['Form Control Input (Preset Value)'],
        formControlInputDisabled: [{ value: '', disabled: true }],
        formControlInputError: [undefined, Validators.required],
        formControlInputUntouched: [undefined, Validators.required]
    });

    constructor() { }

    ngOnInit() {
        const errorFormControl = this.formControlInputForm.get('formControlInputError');
        if(!errorFormControl) return;
        errorFormControl?.markAsTouched();
     }

    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    toggleDisabledFormControl() {
       const formControl = this.formControlInputForm.get('formControlInputDisabled');

       if(!formControl) return;

       if(formControl.disabled) {
        formControl.enable();
       } else {
        formControl.disable();
       }
    }

    stringify(value: string) {
        return JSON.stringify(value);
    }
}