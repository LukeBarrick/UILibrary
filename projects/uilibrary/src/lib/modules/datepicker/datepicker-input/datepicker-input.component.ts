import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Host, HostListener, Inject, inject, Input, LOCALE_ID, OnDestroy, Optional, Self, ViewChild } from '@angular/core';
import { UIFormFieldControl } from '../../form-field/form-field-control';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { filter, Subject, Subscription, tap } from 'rxjs';
import { DATE_NOW } from '../../../core/tokens/DATE_NOW';
import { DateFnsLocaleService } from '../../../core/services/date-fns-locale.service';
import { format, parse } from 'date-fns';

@Component({
    selector: 'uilibrary-datepicker-input',
    templateUrl: './datepicker-input.component.html',
    styleUrl: './datepicker-input.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: UIFormFieldControl,
            useExisting: forwardRef(() => DatePickerInputComponent)
        }
    ],
    standalone: false
})
export class DatePickerInputComponent implements UIFormFieldControl<Date>, ControlValueAccessor, OnDestroy {
  private elRef = inject(ElementRef<DatePickerInputComponent>);
  private dateFnsLocaleService = inject(DateFnsLocaleService);
  private cdr = inject(ChangeDetectorRef);
  value: Date | string | null = null;
  displayValue: string = '';

  readonly stateChanges = new Subject<void>();
  id: string = crypto.randomUUID();
  placeholder: string = '';
  private _disabled: boolean = false;
  private _focussed: boolean = false;
  _open: boolean = false;
  @Input() editable: boolean = false;
  @Input() closeOnSelection: boolean = true;

  $dateValueChanges: Subscription | undefined = undefined;

  /**
   *
   */
  constructor(@Optional() @Self() public ngControl: NgControl,
    @Inject(LOCALE_ID) protected localeId: string,
    @Inject(DATE_NOW) protected today: Date) {
    if (ngControl) {
      ngControl.valueAccessor = this;

      this.$dateValueChanges = ngControl.valueChanges?.pipe(
        tap(() => this.removeDateFromCalendar()),
        filter(date => date instanceof Date),
        tap((date: Date) => this.addDateToCalendar(date))
      ).subscribe();
    }
  }

  @HostListener('document:mousedown', ['$event']) onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const parent = this.elRef.nativeElement.parentElement;

    if (this._open && !parent.contains(target)) {
      this._open = false;
    }
  }

  // @HostListener('document:click', ['$event']) onClickOutside2(event: Event) {
  //   const target = event.target as HTMLElement;
  //   const parent = this.elRef.nativeElement.parentElement;

  //   if (this._open && parent.contains(target)) {
  //     this.input.nativeElement.focus();;
  //   }
  // }

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: Date | string | null): void {
    if (value instanceof Date) {
      this.displayValue = format(value, 'P', { locale: this.dateFnsLocaleService.locale });
      this.addDateToCalendar(value);
    }

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

  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  get empty(): boolean {
    return this.ngControl ? !this.ngControl.control?.value : false;
  }

  get disabled() {
    return this._disabled;
  }

  get shouldLabelFloat(): boolean {
    return (!this.empty || this._focussed) || this._open;
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

  onFocus() {
    this._focussed = true;
    this._open = true;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  onBlur(event: FocusEvent) {
    const nextFocused = event.relatedTarget as HTMLElement | null;

    if (!this.elRef.nativeElement.contains(nextFocused)) {
      this.onTouched();
      this._focussed = false;
      this.stateChanges.next();
      this.cdr.markForCheck();
    }
  }

  focus(): void {
    this.input.nativeElement.focus();
    this._open = true;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  setValue(): void { return; }

  onInput(event: any): void {
    const value = event.target.value;
    const date = parse(value.trim(), 'P', new Date(), { locale: this.dateFnsLocaleService.locale });

    if (date.toString() === 'Invalid Date') {
      this.value = value;
      this.displayValue = value;
      this.onChange(value)
      this.onTouched();
    } else {
      this.handleDateInput(date);
    }
  }

  dateSelected($event: Date): void {
    this.handleDateInput($event);
  }

  selecteDate: Date | undefined = undefined;

  addDateToCalendar(value: Date): void {
    this.selecteDate = value;
  }

  removeDateFromCalendar(): void {
    this.selecteDate = undefined;
  }

  handleDateInput(value: Date): void {
    this.writeValue(value);
    this.onChange(this.value);
    this.onTouched();

    if(this.closeOnSelection) {
      this._open = false;
    }
  }

  open(): void {
    this._open = true;
    this.stateChanges.next();
    this.cdr.markForCheck();
    this.focus();
  }

  close(): void {
    this._open = false;
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  setID(id: string): void {
    this.id = id;
    this.elRef.nativeElement.id = this.id;
  }

  ngOnDestroy(): void {
    this.$dateValueChanges?.unsubscribe();
    this.stateChanges.complete();
  }
}
