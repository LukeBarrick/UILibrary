import { Directive, InputSignal, InputSignalWithTransform, ModelSignal } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { ValidationError, WithOptionalField } from '@angular/forms/signals'

@Directive()
export abstract class UIFormFieldControl<T> {
  readonly value!: T | string | null;
  readonly stateChanges!: Observable<void>;
  readonly id!: string;
  readonly placeholder!: string;
  readonly empty!: boolean;
  readonly ngControl!: NgControl;

  focus(): void { return; };
  setValue(value: T | null): void { return; }

  readonly disabled: boolean = false;
  readonly shouldLabelFloat: boolean = false;
  readonly hasErrors: boolean = false;
  readonly hasFocus: boolean = false;
  readonly touched: boolean = false;
  readonly dirty: boolean = false;
}
