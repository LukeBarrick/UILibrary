import { AfterContentInit, Component, ContentChildren, Input, Optional, QueryList, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { RadioButton2Component } from '../button/button.component';

@Component({
  selector: 'uilibrary2-radio-group',
  templateUrl: './group.component.html'
})
export class RadioGroup2Component implements ControlValueAccessor, AfterContentInit {
 @ContentChildren(RadioButton2Component) radioButtons!: QueryList<RadioButton2Component>;
  
  value: any;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if(this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  private _disabled: boolean = false;

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    setTimeout(() => {
      this.radioButtons.forEach(button => button.disabled = disabled);
    }, 0)
  };

  onChange: any = () => {};
  onTouched: any = () => {};

  ngAfterContentInit() {
    setTimeout(() => {
      this.updateRadioButtons();
    }, 0);
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
      this._disabled = isDisabled;
      this.radioButtons.forEach(button => button.disabled = this._disabled);
    }
  }

  private updateRadioButtons(): void {
    if (this.radioButtons) {
      this.radioButtons.forEach(button => {
        const isChecked = button.value === this.value;
        button.checked = isChecked

        button.checkedChange.subscribe(() => {
          this.value = button.value;

          this.radioButtons.forEach(radio => radio.checked = false);
          button.checked = true;

          this.onChange(this.value);
          this.onTouched();
        });
      });
    }
  }
}
