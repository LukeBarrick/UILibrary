import { Directive, ElementRef, forwardRef, HostListener, inject, OnDestroy, Optional, Renderer2, Self, ViewChild } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, Observable, tap } from 'rxjs';
import { format, parse } from 'date-fns';
import { DateFnsLocaleService } from '../../../core/services/date-fns-locale.service';

@Directive({
  selector: '[startDate]',
  providers: [
    {
      provide: UIFormFieldControl,
      useExisting: forwardRef(() => StartDateDirective)
    }
  ]
})
export class StartDateDirective implements UIFormFieldControl<Date>, ControlValueAccessor {
  private dateFnsLocaleService = inject(DateFnsLocaleService);
  value: Date | string | null = null;

  stateChanges: Observable<void> = new Observable<void>;
  id: string = crypto.randomUUID();
  placeholder: string = '';
  private _disabled: boolean = false;
  private _focussed: boolean = false;
 
  /**
   *
   */
  constructor(@Optional() @Self() public ngControl: NgControl,
    private el: ElementRef,
    private renderer: Renderer2) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: Date | string | null): void {
    if(value instanceof Date) {
      const formattedDate = format(value, 'P', { locale: this.dateFnsLocaleService.locale });
      this.el.nativeElement.value = formattedDate;
    } else if(value !== undefined) {
      this.el.nativeElement.value = value;
    }

    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    // if (this.debounceTimer !== null) {
    //   clearTimeout(this.debounceTimer);
    // }

    // this.debounceTimer = setTimeout(() => {
    //   this.handleDebouncedInput(value);
    // }, 500);
    this.handleDebouncedInput(value);
  }

  handleDebouncedInput(value: string) {
    const date = parse(value.trim(), 'P', new Date(), { locale: this.dateFnsLocaleService.locale });
    if (date.toString() === 'Invalid Date') {
      this.handleInput(value);
    } else {
      this.handleInput(date);
    }
  }

  @HostListener('blur')
  onBlur(): void {
    this._focussed = false;
    this.onTouched();
  }

  @HostListener('focus')
  onFocus(): void {
    this._focussed = true;
  }

  get empty(): boolean {
    return this.ngControl ? !this.ngControl.control?.value : false;
  }

  get disabled() {
    return this._disabled;
  }

  get shouldLabelFloat(): boolean {
    return !this.empty || this._focussed;
  }

  get hasErrors() {
    return this.ngControl ? !!this.ngControl.control?.invalid : false;
  }

  get hasFocus() {
    return this._focussed;
  }

  get touched() {
    return this.ngControl ? !!this.ngControl.touched : false;
  }

  get dirty() {
    return this.ngControl ? !!this.ngControl.dirty : false;
  }

  focus(): void {
    this.el.nativeElement.focus();
  }

  setValue(value: Date | string | null): void {
    this.handleInput(value);
  }

  handleInput(value: Date | string | null): void {
    this.writeValue(value);
    this.onChange(this.value);
    this.onTouched();
  }
}
