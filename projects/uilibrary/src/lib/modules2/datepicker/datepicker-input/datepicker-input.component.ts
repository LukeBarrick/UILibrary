import { Component, ElementRef, EventEmitter, forwardRef, Host, HostListener, Optional, Self, ViewChild } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'uilibrary2-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrl: './datepicker-input.component.css',
  providers: [
    {
      provide: UIFormFieldControl,
      useExisting: forwardRef(() => Datepicker2InputComponent) 
    }
  ]
})
export class Datepicker2InputComponent implements UIFormFieldControl<Date>, ControlValueAccessor {
  value: Date | null = null;
  
  stateChanges: Observable<void> = new Observable<void>;
  id: string = crypto.randomUUID();
  placeholder: string = '';
  private _disabled: boolean = false;
  private _focussed: boolean = false;

  /**
   *
   */
  constructor(@Optional() @Self() public ngControl: NgControl,
              private elRef: ElementRef<Datepicker2InputComponent>) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

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
    this._disabled = isDisabled;
  }

  get empty(): boolean {
    return this.ngControl ? !this.ngControl.control?.value : false;
  }

  get disabled() {
    return this._disabled;
  }

  get shouldLabelFloat(): boolean {
    return !this.empty || this._focussed;
  }

  get hasErrors() {
    return this.ngControl ? !!this.ngControl.control?.invalid : false;
  }

  get touched() {
    return this.ngControl ? !!this.ngControl.touched : false;
  }

  get dirty() {
    return this.ngControl ? !!this.ngControl.dirty : false;
  }

  onFocus() {
    this._focussed = true;
  }

  onBlur() {
    this.onTouched();
    this._focussed = false;
  }

  focus(): void {
    this.input.nativeElement.focus();
  }

  onInput(event: any): void {
    this.writeValue(event.target.value);
    this.onChange(this.value);
    this.onTouched();
  }
}
