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
  extends UIFormFieldControl<string>
  implements ControlValueAccessor, OnInit
{
  override id = this.UUID.generate();

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void { }

  constructor(
    @Optional() @Self() public override ngControl: NgControl,
    private readonly UUID: UUIDService,
    private readonly el: ElementRef<HTMLInputElement>,
    private readonly renderer: Renderer2
  ) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  override stateChanges: Observable<void> = new Observable<void>

  @Input() override placeholder: string = '';
  @Input() override value: any;
  @Output() valueChange = new EventEmitter<any>();
  
  @Input() override set disabled(disabled: boolean) {
    this.setDisabledState(disabled);
  }
  override get disabled() {
    return this.el.nativeElement.disabled;
  }

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

  @HostListener('input', ['$event.target.value'])
   _onInput(value: any): void {
     this.onChange(value);
   }
 
   @HostListener('blur')
   _onBlur(): void {
     this.onTouched();
   }
 
   get _empty(): boolean {
     return this.ngControl ? !this.ngControl.control?.value : false;
   }
   
   override get shouldLabelFloat(): boolean {
      return !this._empty;
   }
}
