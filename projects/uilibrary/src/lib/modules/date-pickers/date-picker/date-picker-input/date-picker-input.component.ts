import { FormatWidth, getLocaleDateFormat } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'uilibrary-date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.css'],
})
export class DatePickerInputComponent implements OnInit, ControlValueAccessor {
  public value: string | null = null;
  private friendlyValue: string | null = null;

  @Output() valueChange = new EventEmitter<string | null>();

  @Input() set isDisabled(disabled: boolean) {
    setTimeout(() => {
      this.disabled = disabled;
    }, 0);
  }
  @Output() isDisabledChange = new EventEmitter<boolean>();
  disabled: boolean = false;

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

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleChange() {
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    // @Inject(LOCALE_ID) protected localeId: string
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  public isFocused: boolean = false;

  @HostListener('focus', ['$event']) onFocus(event: FocusEvent) {
    this.isFocused = true;
    console.log('Component is focused:', this.isFocused);
  }

  @HostListener('blur', ['$event']) onBlur(event: FocusEvent) {
    this.isFocused = false;
    console.log('Component lost focus:', this.isFocused);
  }
}
