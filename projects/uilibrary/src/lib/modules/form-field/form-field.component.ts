import {
  AfterContentChecked,
  Component,
  ContentChild,
  Input,
  OnDestroy,
} from '@angular/core';
import { UIFormFieldControl } from './form-field-control';
import { Subscription } from 'rxjs';
import { UIPrefix } from './directives/UIPrefix';
import { UISuffix } from './directives/UISuffix';
import { id } from 'date-fns/locale';

@Component({
    selector: 'uilibrary-form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.css'],
    host: {
        '[class.form-field-disabled]': '_control?.disabled',
        '[class.form-field-label-float]': 'labelFloatOverride || _control?.shouldLabelFloat',
        '[class.form-field-errors]': '_control?.hasErrors',
        '[class.form-field-touched]': '_control?.touched',
        '[class.form-field-dirty]': '_control?.dirty',
    },
    standalone: false
})
export class FormFieldComponent implements AfterContentChecked, OnDestroy {
  uuid = self.crypto.randomUUID();

  @ContentChild(UIFormFieldControl) formFieldControl:
    | UIFormFieldControl<any>
    | undefined;
  @ContentChild(UIPrefix) prefix: UIPrefix | undefined;
  @ContentChild(UISuffix) suffix: UISuffix | undefined;

  @Input() labelFloatOverride: boolean | undefined;

  value: any = 1;
  stateChanges: Subscription | undefined;
  empty: boolean = true;

  constructor() {}

  ngOnDestroy(): void {
    this.stateChanges?.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.initialiseControl();
  }

  get _control() {
    return this.formFieldControl;
  }

  get _prefix() {
    return this.prefix;
  }

  get _suffix() {
    return this.suffix;
  }

  private initialiseControl(): void {
    if (this._control != undefined) {
      this.stateChanges = this._control.stateChanges.subscribe({});
      this._control.setID(this.uuid);
    }
  }

  public focusControl() {
    this._control?.focus();
  }
}
