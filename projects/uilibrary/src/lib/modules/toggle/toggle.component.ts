import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { LabelPosition } from '../../core/enums/label-position.enum';

@Component({
  selector: 'uilibrary-toggle',
  templateUrl: './toggle.component.html',
})
//Should probably bring checkbox, toggle & radio buttons under a single interface
export class ToggleComponent implements ControlValueAccessor {
  public id = crypto.randomUUID();

  constructor(@Optional() @Self() ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  LabelPosition = LabelPosition;

  @Input() labelSize: string = '';
  @Input() labelPosition: string = LabelPosition.Left;
  @Input() hideLabel: boolean = false;

  @Input() set checked(value: boolean) {
    this.value = value;
  };

  value: boolean = false;

  @Input() disabled: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange() {
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched()
  }
}
