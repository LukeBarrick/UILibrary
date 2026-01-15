import { AfterContentInit, Component, ContentChildren, forwardRef, Input, OnDestroy, OnInit, Optional, QueryList, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, RadioControlValueAccessor } from '@angular/forms';
import { RadioButtonComponent } from '../button/button.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'uilibrary-radio-group',
  templateUrl: './group.component.html'
})
export class RadioGroupComponent implements ControlValueAccessor, AfterContentInit, OnInit, OnDestroy {
 @ContentChildren(RadioButtonComponent) radioButtons!: QueryList<RadioButtonComponent>;
  
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

  $valueChanges: Subscription | undefined;
  $radioButtonChanges: Subscription | undefined;

  ngOnInit(): void {
    if(this.ngControl?.control) {
      this.$valueChanges = this.ngControl.control.valueChanges.subscribe(value => {
        this.radioButtons.forEach(button => {
          button.checked = button.value === value;
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.$valueChanges?.unsubscribe();
  }

  ngAfterContentInit() {
    if (this.radioButtons) {
      this.$radioButtonChanges = this.radioButtons.changes.subscribe(() => {
        this.updateRadioButtons();
      });
    }

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

          this.writeValue(this.value);
          this.onChange(this.value);
          this.onTouched();
        });
      });
    }
  }
}
