import { Component, EventEmitter, forwardRef, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { UUIDService } from '../../../core/services/UUID.service';

@Component({
  selector: 'uilibrary-textarea',
  templateUrl: './text-area.component.html',
  providers: [
  
  ]
})
export class TextAreaComponent implements ControlValueAccessor {
  public id = this.UUID.generate();

  constructor(@Optional() @Self() public ngControl: NgControl,
              private UUID: UUIDService) {
                if(this.ngControl) {
                  this.ngControl.valueAccessor = this;
                }
              }

  @Input() autocomplete?: string = 'off';
  @Input() placeholder: string = '';
  @Input() isDisabled: boolean = false;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  onChange: any = () => {};
  onTouched: any = () => {};

  touched = false;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.onTouched();
  }
}
