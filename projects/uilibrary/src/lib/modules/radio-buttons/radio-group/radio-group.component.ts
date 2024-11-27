import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Optional, Output, QueryList, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

@Component({
  selector: 'uilibrary-radio-group',
  templateUrl: './radio-group.component.html',
  providers: [

  ]
})
export class RadioGroupComponent implements ControlValueAccessor, AfterContentInit  {
  @ContentChildren(RadioButtonComponent) radioButtons!: QueryList<RadioButtonComponent>;
  
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if(this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

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