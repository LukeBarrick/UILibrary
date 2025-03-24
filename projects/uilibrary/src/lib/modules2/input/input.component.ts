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
  extends UIFormFieldControl<any>
  implements ControlValueAccessor, OnInit
{
  override id = this.UUID.generate();

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    console.log('yoohoo');
  }

  constructor(
    @Optional() @Self() public override ngControl: NgControl,
    private UUID: UUIDService,
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
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
      this.renderer.setProperty(this.el.nativeElement, 'disabled', disabled)
  }
  override get disabled() {
    return this.el.nativeElement.disabled;
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

  setDisabledState(isDisabled: boolean): void {
    console.log('disabled: ' + isDisabled)
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled)
  }

  @HostListener('input', ['$event.target.value'])
   _onInput(value: any): void {
     this.onChange(value);
   }
 
   @HostListener('blur')
   _onBlur(): void {
     this.onTouched();
   }
}
