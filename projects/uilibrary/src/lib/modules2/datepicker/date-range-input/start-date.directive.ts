import { Directive, ElementRef, forwardRef, HostListener, inject, Optional, Renderer2, Self, ViewChild } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
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
  value: Date | null = null;

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

  writeValue(value: Date | undefined): void {
    if(!value) return;
    this.el.nativeElement.value = format(value, 'P', { locale: this.dateFnsLocaleService.locale });
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

  @HostListener('input', ['$event.target.value'])
  onInput(value: any): void {
    const date = parse(value.trim(), 'P', new Date(), { locale: this.dateFnsLocaleService.locale });
    this.onChange(date);
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

  setValue(value: Date): void {
    this.handleInput(value);
  }

  handleInput(value: Date): void {
    this.writeValue(value);
    this.onChange(this.value);
    this.onTouched();
  }

  private _onInput(event: any): void {
    const input = event.target.value;
    const date = parse(input.trim(), 'P', new Date(), { locale: this.dateFnsLocaleService.locale });
    this.handleInput(date);
  } 
}
