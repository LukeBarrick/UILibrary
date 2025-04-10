import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnInit, Optional, Output, Renderer2, Self, TemplateRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { UIFormFieldControl } from '../form-field/form-field-control';
import { Observable } from 'rxjs';


@Component({
  selector: 'uilibrary2-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: UIFormFieldControl,
      useExisting: forwardRef(() => Select2Component),
    }
  ],
})
export class Select2Component 
  implements UIFormFieldControl<string>,  ControlValueAccessor {
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

  value: any;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl,
              private readonly el: ElementRef<HTMLInputElement>,
              private readonly renderer: Renderer2) {
    if(this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  _disabled: boolean = false;
  empty: boolean = false;

  stateChanges: Observable<void> = new Observable<void>;
  id: string ='';
  
  @Input() disabled: boolean = false;

  get _empty(): boolean {
    return this.ngControl ? !this.ngControl.control?.value : false;
  }

  get shouldLabelFloat(): boolean {
    return !this._empty || this._focussed;
  }

  get hasErrors(): boolean {
    return this.ngControl ? !!this.ngControl.control?.invalid : false;
  }

  get touched(): boolean {
    return this.ngControl ? !!this.ngControl.touched : false;
  }

  get dirty(): boolean {
    return this.ngControl ? !!this.ngControl.dirty : false;
  }

  private _focussed: boolean = false;

  _onInput(value: any): void {
    this.onChange(value);
  }

  _onBlur(): void {
    this._focussed = false;
    this.onTouched();
  }

  _onFocus(): void {
    this._focussed = true;
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

  setDisabledState(disabled: boolean): void {
    this._disabled = disabled;
  }

  handleChange(event: any): void {
    this.value = event;
    this.onChange(event);
    // this.valueChange.emit(event);
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
      // this.valueChange.emit(this.value);
    }, 0);
  }

  compareFn(item: any, selected: any) {
    return item === selected;
  }
}
