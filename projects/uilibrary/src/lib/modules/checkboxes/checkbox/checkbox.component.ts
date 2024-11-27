import { Component, EventEmitter, forwardRef, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { UUIDService } from '../../../core/services/UUID.service';
import { LabelPosition } from '../../../core/enums/label-position.enum';

@Component({
  selector: 'uilibrary-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
  ],
})
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

  @Input() value: boolean = false;
  @Output() valueChange = new EventEmitter<boolean>();

  @Input() isDisabled: boolean = false;
  @Output() isDisabledChange = new EventEmitter<boolean>();

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

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleChange() {
    this.value = !this.value;
    this.onChange(this.value);
    this.valueChange.next(this.value);
    this.onTouched();
  }
}
