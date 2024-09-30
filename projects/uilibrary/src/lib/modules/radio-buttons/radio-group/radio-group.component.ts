import { AfterContentInit, Component, ContentChildren, EventEmitter, forwardRef, Input, OnInit, Output, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

@Component({
  selector: 'uilibrary-radio-group',
  templateUrl: './radio-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true 
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor, AfterContentInit  {
  @ContentChildren(RadioButtonComponent) radioButtons!: QueryList<RadioButtonComponent>;
  
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  private _isDisabled: boolean = false;

  @Input() set isDisabled (disabled: boolean) {
    setTimeout(() => {
      this.radioButtons.forEach(button => button.disabled = disabled);
    }, 0)
  };
  @Output() isDisabledChange = new EventEmitter<boolean>();

  onChange: any = () => {};
  onTouched: any = () => {};

  ngAfterContentInit() {
    setTimeout(() => {
      this.updateRadioButtons();
    }, 0)
  }

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
    if (this.radioButtons) {
      this._isDisabled = isDisabled;
      this.radioButtons.forEach(button => button.disabled = this._isDisabled);
    }
  }

  private updateRadioButtons(): void {
    if (this.radioButtons) {
      this.radioButtons.forEach(button => {
        button.selected = button.value === this.value;
        button.select.subscribe(() => {
          this.value = button.value;
          this.radioButtons.forEach(radio => radio.selected = radio.value === this.value);
          this.onChange(this.value);
          this.onTouched();
          this.valueChange.emit(this.value);
        });
      });
    }
  }
}