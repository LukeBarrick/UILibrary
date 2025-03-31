import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { UUIDService } from '../../core/services/UUID.service';
import { UIFormFieldControl } from '../form-field/form-field-control';
import { Observable } from 'rxjs';

@Directive({
  selector: '[ui-input]',
  providers: [
    {
      provide: UIFormFieldControl,
      useExisting: forwardRef(() => InputComponent),
    }
  ],
})
export class InputComponent
  implements UIFormFieldControl<string>, ControlValueAccessor, OnInit {
  ngOnInit(): void { }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly UUID: UUIDService,
    private readonly el: ElementRef<HTMLInputElement>,
    private readonly renderer: Renderer2
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  empty: boolean = false;

  id = this.UUID.generate();

  stateChanges: Observable<void> = new Observable<void>

  @Input() placeholder: string = '';
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  @Input() set disabled(disabled: boolean) {
    this.setDisabledState(disabled);
  }
  get disabled() {
    return this.el.nativeElement.disabled;
  }

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

  private _focussed: boolean = false;

  @HostListener('input', ['$event.target.value'])
  _onInput(value: any): void {
    this.onChange(value);
  }

  @HostListener('blur')
  _onBlur(): void {
    this._focussed = false;
    this.onTouched();
  }

  @HostListener('focus')
  _onFocus(): void {
    this._focussed = true;
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled)
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
