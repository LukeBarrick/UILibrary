import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  Optional,
  Renderer2,
  Self,
  TemplateRef,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { UIFormFieldControl } from '../form-field/form-field-control';
import { Observable } from 'rxjs';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
    selector: 'uilibrary-select',
    templateUrl: './select.component.html',
    providers: [
        {
            provide: UIFormFieldControl,
            useExisting: forwardRef(() => SelectComponent),
        },
    ],
    standalone: false
})
export class SelectComponent
  implements UIFormFieldControl<any>, ControlValueAccessor {
  @ContentChild('labelTemplate', { static: false })
  labelTemplate: TemplateRef<any> | null = null;
  @ContentChild('optionTemplate', { static: false })
  optionTemplate: TemplateRef<any> | null = null;
  @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;

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
  @Input() useCustomTemplate: boolean = true;
  @Input() bindLabel: string = '';  
  @Input() bindValue: string = '';

  @Input() searchable: boolean = false;
  @Input() searchFn: ((term: string, item: any) => boolean) | undefined;
  @Input() trackByFn: ((item: any) => any) | undefined;
  @Input() virtualScroll: boolean = false;
  @Input() inputAttrs: { [key: string]: string } = { ['']: '' };

  value: any;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  _disabled: boolean = false;
  _open: boolean = false;

  stateChanges: Observable<void> = new Observable<void>();
  id: string = '';

 

  get empty(): boolean {
    if (!this.ngControl) {
      return false;
    }

    const control = this.ngControl.control;

    if (!control) {
      return true;
    }

    if(this.multiple) {
      return !control.value || control.value.length === 0;
    }

    return !control.value;
  }

  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  get disabled() {
    return this._disabled;
  }

  get shouldLabelFloat(): boolean {
    return !this.empty || this._focussed;
  }

  get hasErrors(): boolean {
    return this.ngControl ? !!this.ngControl.control?.invalid : false;
  }

  get hasFocus() {
    return this._focussed;
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

  focus() {
    this.ngSelect.focus();
    // this.ngSelect.open();
  }

  setValue(value: any): void { 
    this.handleInput(value);
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

  handleInput(event: any): void {
   
    this.writeValue(this.value);
    this.onChange(event);
    this.onTouched();
     console.log(this.value);
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
    }, 0);
  }

  compareFn(item: any, selected: any) {
    return item === selected;
  }
}
