import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LabelPosition } from '../../core/enums/label-position.enum';

@Component({
    selector: 'ui-layout-playground',
    templateUrl: './layout-playground.component.html',
    styleUrl: './layout-playground.component.scss',
    standalone: false
})
export class LayoutPlaygroundComponent implements OnInit {
    private fb = inject(FormBuilder);
    LabelPosition = LabelPosition;

    countries = [
        { label: 'United Kingdom', value: 'GB' },
        { label: 'United States', value: 'US' },
        { label: 'Australia', value: 'AU' },
        { label: 'Canada', value: 'CA' },
        { label: 'Germany', value: 'DE' },
        { label: 'France', value: 'FR' },
    ];

    panelForm: FormGroup = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        country: [null],
        agreeToTerms: [false],
        receiveUpdates: [false],
    });

    submitted = false;
    formValue: any = null;

    ngOnInit(): void { }

    onSubmit(): void {
        this.panelForm.markAllAsTouched();
        if (this.panelForm.invalid) return;
        this.submitted = true;
        this.formValue = this.panelForm.value;
    }

    onCancel(): void {
        this.panelForm.reset({ agreeToTerms: false, receiveUpdates: false });
        this.submitted = false;
        this.formValue = null;
    }
}