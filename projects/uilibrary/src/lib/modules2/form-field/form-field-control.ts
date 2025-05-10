import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, throwError } from 'rxjs';

@Directive()
export abstract class UIFormFieldControl<T> {
  value!: T | null;
  readonly stateChanges!: Observable<void>;
  readonly id!: string;
  readonly placeholder!: string;
  readonly empty!: boolean;
  readonly ngControl!: NgControl;

  focus(): void { return; };

  readonly disabled: boolean = false;
  readonly shouldLabelFloat: boolean = false;
  readonly hasErrors: boolean = false;
  readonly touched: boolean = false;
  readonly dirty: boolean = false;
}
