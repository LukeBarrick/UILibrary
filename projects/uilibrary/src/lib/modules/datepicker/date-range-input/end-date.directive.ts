import { Directive, forwardRef } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { DateInputDirective } from './date-input.directive';

@Directive({
    selector: '[endDate]',
    providers: [
        {
            provide: UIFormFieldControl,
            useExisting: forwardRef(() => EndDateDirective)
        }
    ],
    standalone: false
})
export class EndDateDirective extends DateInputDirective { }
