import { Directive, ElementRef, forwardRef, HostListener, inject, Input, OnDestroy, Optional, Renderer2, Self } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { format, parse } from 'date-fns';
import { DateFnsLocaleService } from '../../../core/services/date-fns-locale.service';

@Directive({
    selector: '[ui-date-input]',
    providers: [
        {
            provide: UIFormFieldControl,
            useExisting: forwardRef(() => DateInputDirective)
        }
    ],
    standalone: false
})
export class DateInputDirective implements UIFormFieldControl<Date>, ControlValueAccessor, OnDestroy {
  private dateFnsLocaleService = inject(DateFnsLocaleService);
  value: Date | string | null = null;

  readonly stateChanges = new Subject<void>();
  id: string = crypto.randomUUID();
  placeholder: string = '';
  private _focussed: boolean = false;

  @Input() set disabled(disabled: boolean) {
    this.setDisabledState(disabled);
  }

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

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
    this.stateChanges.next();
  }
  
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    //Debounce or handle via regex checked completness?
    //Regex probably more UI friendly option
    const date = parse(value.trim(), 'P', new Date(), { locale: this.dateFnsLocaleService.locale });
    if (date.toString() === 'Invalid Date') {
      this.handleInput(value);
    } else {
      this.handleInput(date);
    }
    this.stateChanges.next();
  }

  @HostListener('blur')
  onBlur(): void {
    this._focussed = false;
    this.onTouched();
    this.stateChanges.next();
  }

  @HostListener('focus')
  onFocus(): void {
    this._focussed = true;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return this.ngControl ? !this.ngControl.control?.value : false;
  }

  get disabled() {
    return this.el.nativeElement.disabled;
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

  setID(id: string): void {
    this.id = id;
    this.el.nativeElement.id = this.id;
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}