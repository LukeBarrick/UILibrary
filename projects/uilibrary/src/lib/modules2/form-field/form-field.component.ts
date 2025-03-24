import { AfterContentChecked, Component, ContentChild, OnInit } from '@angular/core';
import { UIFormFieldControl } from './form-field-control';
import { Subscription } from 'rxjs';

@Component({
  selector: 'uilibrary2-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  host: {
    '[class.form-field-disabled]': '_control.disabled',
    '[class.form-field-label-float]': '_control.shouldLabelFloat'
  }
})

export class FormFieldComponent implements AfterContentChecked, OnInit {
  @ContentChild(UIFormFieldControl) formFieldControl: UIFormFieldControl<any> | undefined;

  value: any = 1;
  stateChanges: Subscription | undefined;
  empty: boolean = true;

  constructor() { }

  ngAfterContentChecked(): void {
    this.initialiseControl();
  }

  ngOnInit(): void {
    
  }

  get _control() {
    return this.formFieldControl;
  }

  private initialiseControl(): void {
    if(this._control != undefined) {
      this.stateChanges = this._control.stateChanges.subscribe({})
    }
  }
}
