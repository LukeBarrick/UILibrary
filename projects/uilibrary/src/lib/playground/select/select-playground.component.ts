import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'uilibrary-select-playground',
    templateUrl: 'select-playground.component.html',
    styleUrl: 'select-playground.component.scss',
    standalone: false
})

export class SelectPlaygroundComponent implements OnInit {
    fb = inject(FormBuilder);

    @Input() showOutput: boolean = false;

    items: Item[] = [
        { id: 1, value: "Item 1" },
        { id: 2, value: "Item 2" },
        { id: 3, value: "Item 3" }
    ]

    selectModel = { id: 1, value: 'Item 1' };
    basicSelectBinding = this.items[0];
    basicSelectDisabled: Item | undefined;
    basicSelectIsDisabled: boolean = true;
    customTemplateBindingDisabled: Item | undefined;
    customTemplateBindingIsDisabled: boolean = true;
    basicSelectError: Item | undefined = undefined;
    clearable = this.items[0];

    multiSelectBinding: Item[] = [];
    multiSelectBindingPreset: Item[] = [this.items[0], this.items[1]];
    multiSelectBindingIsDisabled: boolean = true;
    multiSelectBindingDisabled: Item[] = [];
    multiSelectBindingError: Item[] | undefined = undefined;

    customMultiSelectBinding: Item[] = [];
    customMultiSelectBindingPreset: Item[] = [this.items[0], this.items[1]];
    customMultiSelectBindingIsDisabled: boolean = true;
    customMultiSelectBindingDisabled: Item[] = [];
    customMultiSelectBindingError: Item[] | undefined = undefined;

    formControlSelectForm: FormGroup = this.fb.group({
        formControlSelect: [],
        formControlSelectWithValue: [this.items[0]],
        formControlSelectDisabled: [{ value: '', disabled: true }],
        formControlSelectError: [undefined, Validators.required],
        formControlSelectUntouched: [undefined, Validators.required]
    });

    customTemplateFormControlSelectForm: FormGroup = this.fb.group({
        customFormControlSelect: [],
        customFormControlSelectWithValue: [this.items[0]],
        customFormControlSelectDisabled: [{ value: '', disabled: true }],
        customFormControlSelectError: [undefined, Validators.required],
        customFormControlSelectUntouched: [undefined, Validators.required]
    });

    formControlSelectErrorForm: FormGroup = this.fb.group({
        formControlSelectError: [undefined, Validators.required]
    });

    multiSelectDefaultForm: FormGroup = this.fb.group({
        multiSelectControl: [[]],
        multiSelectWithValue: [[this.items[0], this.items[1]]],
        multiSelectDisabled: [{ value: [this.items[0]], disabled: true }],
        multiSelectError: [undefined, Validators.required],
        multiSelectUntouched: [undefined, Validators.required]
    });

    multiSelectCustomForm: FormGroup = this.fb.group({
        customMultiSelectControl: [[]],
        customMultiSelectWithValue: [[this.items[0], this.items[1]]],
        customMultiSelectDisabled: [{ value: [this.items[0]], disabled: true }],
        customMultiSelectError: [undefined, Validators.required],
        customMultiSelectUntouched: [undefined, Validators.required]
    });

    constructor() { }

    ngOnInit() {
        const errorFormControl = this.formControlSelectForm.get('formControlSelectError');
        const customFormControl = this.customTemplateFormControlSelectForm.get('customFormControlSelectError');

        customFormControl?.markAsTouched();
        errorFormControl?.markAsTouched();

        this.multiSelectDefaultForm.get('multiSelectError')?.markAsTouched();
        this.multiSelectCustomForm.get('customMultiSelectError')?.markAsTouched();
    }

    stringify(value: any) {
        return JSON.stringify(value);
    }

    exampleCompareFn(item: any, selected: any) {
        return item.id === selected.id;
    }

    toggleBindingDisabled() {
        this.basicSelectIsDisabled = !this.basicSelectIsDisabled;
    }

    toggleCustomTemplateBindingDisabled() {
        this.customTemplateBindingIsDisabled = !this.customTemplateBindingIsDisabled;
    }

    toggleCustomDisabledFormControl() {
       const formControl = this.customTemplateFormControlSelectForm.get('customFormControlSelectDisabled');

       if(!formControl) return;

       if(formControl.disabled) {
        formControl.enable();
       } else {
        formControl.disable();
       }
    }

     toggleDisabledFormControl() {
       const formControl = this.formControlSelectForm.get('formControlSelectDisabled');

       if(!formControl) return;

       if(formControl.disabled) {
        formControl.enable();
       } else {
        formControl.disable();
       }
    }

    toggleMultiSelectBindingDisabled() {
        this.multiSelectBindingIsDisabled = !this.multiSelectBindingIsDisabled;
    }

    toggleCustomMultiSelectBindingDisabled() {
        this.customMultiSelectBindingIsDisabled = !this.customMultiSelectBindingIsDisabled;
    }

    toggleMultiSelectDisabledFormControl() {
        const formControl = this.multiSelectDefaultForm.get('multiSelectDisabled');
        if (!formControl) return;
        if (formControl.disabled) {
            formControl.enable();
        } else {
            formControl.disable();
        }
    }

    toggleCustomMultiSelectDisabledFormControl() {
        const formControl = this.multiSelectCustomForm.get('customMultiSelectDisabled');
        if (!formControl) return;
        if (formControl.disabled) {
            formControl.enable();
        } else {
            formControl.disable();
        }
    }
}

export interface Item {
    id: number,
    value: string
}