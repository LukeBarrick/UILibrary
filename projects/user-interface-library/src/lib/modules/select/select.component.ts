import { Component, ContentChildren, forwardRef, Input, QueryList, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOptionComponent } from './select-option/select-option.component';

@Component({
  selector: 'uilibrary-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @ContentChildren(SelectOptionComponent) customOptions: QueryList<SelectOptionComponent> | undefined;

  value: any;
  disabled: boolean = false;
  options: any[] = [];

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
    this.disabled = isDisabled;
  }

  handleChange(event: any): void {
    this.value = event;
    this.onChange(event);
    this.onTouched();
  }

  compareFn(item: any, selected: any) {
    return item.value === selected.value;
  }

  ngAfterContentInit(): void {
    if(this.customOptions != undefined) {
      this.options = this.customOptions.map(option => ({
        value: option.value,
        label: option.label
      }));
    }
  }
}
