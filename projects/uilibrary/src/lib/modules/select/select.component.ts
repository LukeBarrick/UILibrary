import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  TemplateRef,
  ViewChild,
  forwardRef,
  isDevMode
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { UIFormFieldControl } from '../form-field/form-field-control';
import { Subject } from 'rxjs';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'uilibrary-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: UIFormFieldControl,
      useExisting: forwardRef(() => SelectComponent),
    },
  ],
  standalone: false
})
export class SelectComponent
  implements UIFormFieldControl<any>, ControlValueAccessor, AfterContentInit, OnDestroy {
  @ContentChild('labelTemplate', { static: false })
  labelTemplate: TemplateRef<any> | null = null;
  @ContentChild('optionTemplate', { static: false })
  optionTemplate: TemplateRef<any> | null = null;
  @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;

  @Input() items: any;

  @Input() ariaLabel: string = '';
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

  @Input() onScroll?: (end: any) => void;
  @Input() scrollToEnd?: () => void;

  _onScroll(end: any) {
    if(this.onScroll) 
      this.onScroll(end);
  }

  _scrollToEnd() {
    if(this.scrollToEnd)
      this.scrollToEnd();
  }

  value: any;

  onChange: any = () => { };
  onTouched: any = () => { };

  ngAfterContentInit(): void {
    if (isDevMode() && this.useCustomTemplate && (!this.labelTemplate || !this.optionTemplate)) {
      console.warn('Warning: You are currently using a select field with a custom template but providing no templateRef for either LabelTemplate or OptionTemplate. To use without custom templates and use the predefined one, set [useCustomTemplate]="false."')
    } else if (isDevMode() && !this.useCustomTemplate && (this.labelTemplate || this.optionTemplate)) {
      console.warn('Warning: You are currently using a select field without a custom template but are providing a templateRef for either LabelTemplate or OptionTemplate. To use with custom templates, set [useCustomTemplate]="true" and define an templateRef for LabelTemplate & OptionTemplate.')
    }
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly cdr: ChangeDetectorRef,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  _disabled: boolean = false;
  _open: boolean = false;

  readonly stateChanges = new Subject<void>();
  id: string = '';

  get empty(): boolean {
    if (!this.ngControl) {
      return false;
    }

    const control = this.ngControl.control;

    if (!control) {
      return true;
    }

    if (this.multiple) {
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
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  _onFocus(): void {
    this._focussed = true;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  focus() {
    this.ngSelect.focus();
  }

  setValue(value: any): void {
    this.handleInput(value);
  }

  writeValue(value: any): void {
    this.value = value;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = disabled;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  handleInput(event: any): void {
    this.writeValue(this.value);
    this.onChange(event);
    this.onTouched();
  }

  @Input() compareWith: ((a: any, b: any) => boolean) | undefined = undefined;

  defaultCompareFn(item: any, selected: any) {
    //Order keys before compare.
    //Currently sensitive to key ordering differences.
    return JSON.stringify(item) === JSON.stringify(selected);
  }

  setID(id: string): void {
    this.id = id;
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}