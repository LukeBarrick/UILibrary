import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutDirection } from '../../modules/rtl-layout/rtl-layout.directive';

interface DemoItem {
    label: string;
    color: string;
}

interface SelectOption {
    id: number;
    name: string;
}

@Component({
    selector: 'uilibrary-rtl-layout-playground',
    templateUrl: 'rtl-layout-playground.component.html',
    styleUrl: 'rtl-layout-playground.component.scss',
    standalone: false,
})
export class RtlLayoutPlaygroundComponent {

    private fb = inject(FormBuilder);

    direction: LayoutDirection = 'ltr';

    get isRtl(): boolean {
        return this.direction === 'rtl';
    }

    setDirection(dir: LayoutDirection): void {
        this.direction = dir;
    }

    // FlexBox demo
    flexItems: DemoItem[] = [
        { label: 'Item 1', color: '#408467' },
        { label: 'Item 2', color: '#007EAB' },
        { label: 'Item 3', color: '#E8C557' },
        { label: 'Item 4', color: '#D63D52' },
    ];

    // Spacing demo
    spacerKeys: number[] = [0, 1, 2, 3, 4, 5];

    // §8 — Text Input + Form Field
    inputForm = this.fb.group({
        name:    [''],
        message: [''],
    });

    // §9 — Select
    countryItems: SelectOption[] = [
        { id: 1, name: 'United Kingdom' },
        { id: 2, name: 'United Arab Emirates' },
        { id: 3, name: 'Saudi Arabia' },
        { id: 5, name: 'Japan' },
    ];
    selectForm = this.fb.group({ country: [] });

    // §13 — Radio Buttons
    radioValue: string = 'a';

    // §14 — Date Picker
    datePickerModel: Date | undefined = undefined;
    startDateModel: Date | undefined = undefined;
    endDateModel: Date | undefined = undefined;

    datepickerForm: FormGroup = this.fb.group({
        singleDate:  [undefined],
        presetDate:  [new Date(), Validators.required],
        rangeStart:  [undefined],
        rangeEnd:    [undefined],
    });
}
