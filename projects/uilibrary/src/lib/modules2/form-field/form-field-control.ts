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
  private readonly _shouldLabelFloat: boolean = false;
  public get shouldLabelFloat(): boolean {
    return this._shouldLabelFloat;
  }
  public get disabled(): boolean {
    return this._disabled;
  }
}
