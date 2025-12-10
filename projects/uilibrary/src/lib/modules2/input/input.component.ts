import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Optional,
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
  implements UIFormFieldControl<string>, ControlValueAccessor, AfterViewInit {
  ngAfterViewInit(): void { }

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

  private _focussed: boolean = false;
  empty: boolean = false;

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

  focus() {
    this.el.nativeElement.focus();
  }

  setValue(value: string): void { 
    this.handleInput(value); 
  }

  //Randomly generated ID auto-assigned to input on instantiation.
  id = this.UUID.generate();

  //State changes
  //Used to hand data to parent consumers via subscription.
  stateChanges: Observable<void> = new Observable<void>

  //Placeholder
  //Not required as an input as we *should*  directly expose the input here.
  placeholder: string = '';

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

  get hasFocus() {
    return this._focussed;
  }

  get touched(): boolean {
    return this.ngControl ? !!this.ngControl.touched : false;
  }

  get dirty(): boolean {
    return this.ngControl ? !!this.ngControl.dirty : false;
  }

  value: any;
  valueChange = new EventEmitter<any>();

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

  handleInput(value: string): void {
    this.writeValue(value);
    this.onChange(this.value);
    this.onTouched();
  }
}
