import {
  Component,
  ContentChild,
  forwardRef,
  Input,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  @ContentChild('labelTemplate', { static: false })
  labelTemplate: TemplateRef<any> | null = null;
  @ContentChild('optionTemplate', { static: false })
  optionTemplate: TemplateRef<any> | null = null;

  @Input() items: any;

  @Input() ariaLabel: string = ''
  @Input() loading: boolean = false;
  @Input() loadingText: string = 'Loading...';
  @Input() multiple: boolean = false;
  @Input() maxSelectedItems: number = 1;
  @Input() hideSelected: boolean = false;
  @Input() clearSearchOnAdd: boolean = true;
  @Input() readonly: boolean = false;
  @Input() placeholder: string = '';
  @Input() notFoundText: string = 'No items found.';
  @Input() markFirst: boolean = false;
  @Input() clearOnBackspace: boolean = true;
  @Input() clearable: boolean = true;
  @Input() closeOnSelect: boolean = true;

  @Input() searchable: boolean = true;
  @Input() searchFn: ((term: string, item: any) => boolean) | undefined 
  @Input() isOpen: boolean | undefined = undefined;
  @Input() trackByFn: ((item: any) => any) | undefined;
  @Input() virtualScroll: boolean = false;
  @Input() inputAttrs: { [key: string]: string } = { ['']: '' };

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
    return item === selected;
  }
}
