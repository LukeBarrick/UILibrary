import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'uilibrary-form-field-playground',
    templateUrl: 'form-field-playground.component.html',
    styleUrl: 'form-field-playground.component.scss',
    standalone: false
})

export class FormFieldPlaygroundComponent implements OnInit {
    formBuilder = inject(FormBuilder);

    @Input() showOutput: boolean | undefined = undefined;

    labelShouldNotFloatForm: FormGroup = this.formBuilder.group({
        emptyString: [''],
        undefined: [undefined]
    });

    labelShouldFloatForm: FormGroup = this.formBuilder.group({
        holdsValue: ['Value']
    });

    inputTypesForm: FormGroup = this.formBuilder.group({
        text: [],
        password: [],
        email: [],
        url: [],
        search: [],
        tel: [],
        number: [],
    });

     additonalInputTypesForm: FormGroup = this.formBuilder.group({
        date: [],
        datetimelocal: [],
        time: [],
        month: [],
        week: []
    })

    constructor() { }

    ngOnInit() { }

    stringify(value: any) {
        return JSON.stringify(value);
    }
}