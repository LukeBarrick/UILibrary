import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  Optional,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { UUIDService } from '../../core/services/UUID.service';
import { UIFormFieldControl } from '../form-field/form-field-control';
import { Subject } from 'rxjs';

@Directive({
    selector: '[ui-input]',
    providers: [
        {
            provide: UIFormFieldControl,
            useExisting: forwardRef(() => InputComponent),
        }
    ],
    standalone: false
})
export class InputComponent
  implements UIFormFieldControl<string>, ControlValueAccessor, OnDestroy {
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

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.handleInput(target.value);
      this.onChange(target.value);
      this.stateChanges.next();
    }
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

  focus() {
    this.el.nativeElement.focus();
  }

  setValue(value: string): void { 
    this.handleInput(value); 
  }

  id = this.UUID.generate();

  stateChanges = new Subject<void>();

  placeholder: string = '';

  _disabled: boolean | undefined = undefined;
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
    this.stateChanges.next();
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
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
    this.stateChanges.next();
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value ?? '';
    this.stateChanges.next();
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

  setID(id: string): void {
    this.id = id;
    this.el.nativeElement.id = this.id;
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}
