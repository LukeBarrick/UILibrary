import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { UUIDService } from '../../../core/services/UUID.service';
import { LabelPosition } from '../../../core/enums/label-position.enum';

@Component({
    selector: 'uilibrary-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [],
    standalone: false
})

//TODO Form Control emit value does not work, ngModel won't emit it on its own lol
export class CheckboxComponent implements ControlValueAccessor {
  @Input() labelPosition: string = LabelPosition.Right;
  LabelPosition = LabelPosition;
  @Input() hideLabel: boolean = false;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private UUID: UUIDService
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public id = this.UUID.generate();

  @Input() variant: string = 'branded';
  @Input() size: string = 'small';

  @Input() set checked(value: boolean) {
    this.writeValue(value);
  };

  value: boolean = false;
  valueChange = new EventEmitter<boolean>();

  _disabled: boolean = false;
  @Input() set disabled(disabled: boolean) {
    this.setDisabledState(disabled);
  }
  get disabled() {
    return this._disabled;
  }

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
    this._disabled  = isDisabled;
  }

  handleChange() {
    this.value = !this.value;
    this.onChange(this.value);
    this.valueChange.next(this.value);
    this.onTouched();
  }
}
