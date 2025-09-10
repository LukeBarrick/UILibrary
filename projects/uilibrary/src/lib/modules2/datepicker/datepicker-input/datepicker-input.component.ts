import { Component, ElementRef, EventEmitter, forwardRef, Host, HostListener, Inject, inject, LOCALE_ID, Optional, Self, ViewChild } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';

@Component({
  selector: 'uilibrary2-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrl: './datepicker-input.component.css',
  providers: [
    {
      provide: UIFormFieldControl,
      useExisting: forwardRef(() => Datepicker2InputComponent) 
    }
  ]
})
export class Datepicker2InputComponent implements UIFormFieldControl<Date>, ControlValueAccessor {
  private elRef = inject(ElementRef<Datepicker2InputComponent>);
  value: Date | null = null;
  
  stateChanges: Observable<void> = new Observable<void>;
  id: string = crypto.randomUUID();
  placeholder: string = '';
  private _disabled: boolean = false;
  private _focussed: boolean = false;
  isOpen: boolean = false;

  /**
   *
   */
  constructor(@Optional() @Self() public ngControl: NgControl,
              @Inject(LOCALE_ID) protected localeId: string,
              @Inject(DATE_NOW) protected today: Date) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

   @HostListener('document:click', ['$event']) onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const parent = this.elRef.nativeElement.parentElement;

    if (this.isOpen && !parent.contains(target)) {
      this.isOpen = false;
    } else if (this.isOpen) {
      this.input.nativeElement.focus();
    }
  }

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

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
    this._disabled = isDisabled;
  }

  get empty(): boolean {
    return this.ngControl ? !this.ngControl.control?.value : false;
  }

  get disabled() {
    return this._disabled;
  }

  get shouldLabelFloat(): boolean {
    return (!this.empty || this._focussed) || this.isOpen;
  }

  get hasErrors() {
    return this.ngControl ? !!this.ngControl.control?.invalid : false;
  }

  get touched() {
    return this.ngControl ? !!this.ngControl.touched : false;
  }

  get dirty() {
    return this.ngControl ? !!this.ngControl.dirty : false;
  }

  onFocus() {
    this._focussed = true;
    this.isOpen = true;
  }

  onBlur(event: FocusEvent) {
    const nextFocused = event.relatedTarget as HTMLElement | null;

    if(!this.elRef.nativeElement.contains(nextFocused)) {
      this.onTouched();
      this._focussed = false;
    }
  }

  focus(): void {
    this.input.nativeElement.focus();
    this.isOpen = true;
  }

  onInput(event: any): void {
    this.writeValue(event.target.value);
    this.onChange(this.value);
    this.onTouched();
  }
}
