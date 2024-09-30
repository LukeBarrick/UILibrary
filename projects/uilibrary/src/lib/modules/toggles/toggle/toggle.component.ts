import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UUIDService } from '../../../core/services/UUID.service';
import { LabelPosition } from '../../../core/enums/label-position.enum';

@Component({
  selector: 'uilibrary-toggle',
  templateUrl: './toggle.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  public id = this.UUID.generate();

  constructor(private UUID: UUIDService) {}

  @Input() labelSize: string = '';
  @Input() labelPosition: string = LabelPosition.Left;
  LabelPosition = LabelPosition;
  @Input() hideLabel: boolean = false;

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
    this.onTouched()
  }
}
