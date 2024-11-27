import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'uilibrary-select',
  templateUrl: './select.component.html',
  providers: [
 
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @ContentChild('labelTemplate', { static: false })
  labelTemplate: TemplateRef<any> | null = null;
  @ContentChild('optionTemplate', { static: false })
  optionTemplate: TemplateRef<any> | null = null;

  @Input() items: any;

  @Input() prefillFirstOption: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() isDisabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() loadingText: string = 'Loading...';
  @Input() multiple: boolean = false;
  @Input() maxSelectedItems: number = 1;
  @Input() hideSelected: boolean = false;
  @Input() clearSearchOnAdd: boolean = true;
  @Input() readonly: boolean = false;
  @Input() placeholder: string = '';
  @Input() notFoundText: string = 'No options found.';
  @Input() markFirst: boolean = false;
  @Input() clearOnBackspace: boolean = true;
  @Input() clearable: boolean = false;
  @Input() closeOnSelect: boolean = true;

  @Input() searchable: boolean = false;
  @Input() searchFn: ((term: string, item: any) => boolean) | undefined;
  @Input() isOpen: boolean | undefined = undefined;
  @Input() trackByFn: ((item: any) => any) | undefined;
  @Input() virtualScroll: boolean = false;
  @Input() inputAttrs: { [key: string]: string } = { ['']: '' };

  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  onChange: any = () => {};
  onTouched: any = () => {};

  touched = false;

  constructor(@Optional() @Self() public control: NgControl) {
    if(this.control) {
      this.control.valueAccessor = this;
    }
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
    this.value = event;
    this.onChange(event);
    this.valueChange.emit(event);
    this.onTouched();
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.prefillFirstOption && this.value == undefined) {
        if (!this.multiple) {
          this.value = this.items[0];
        } else {
          this.value = [this.items[0]];
        }
      }
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }, 0);
  }

  compareFn(item: any, selected: any) {
    return item === selected;
  }

  hasErrors(): boolean {
    if(this.control?.errors){
      return true;
    } else {
      return false;
    }
  }
}
