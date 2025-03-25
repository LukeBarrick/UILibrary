import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Directive()
export abstract class UIFormFieldControl<T> {
  value!: T | null;
  readonly stateChanges!: Observable<void>;
  readonly id!: string;
  readonly placeholder!: string;
  readonly empty!: boolean;
  readonly ngControl!: NgControl;
  private readonly _disabled!: boolean;
  public get disabled(): boolean {
    return this._disabled;
  }
  private readonly _shouldLabelFloat: boolean = false;
  public get shouldLabelFloat(): boolean {
    return this._shouldLabelFloat;
  }
  private readonly _hasErrors: boolean = false;
  public get hasErrors(): boolean {
    return this._hasErrors;
  }
  private readonly _touched: boolean = false;
  public get touched(): boolean {
    return this._touched;
  }
}
