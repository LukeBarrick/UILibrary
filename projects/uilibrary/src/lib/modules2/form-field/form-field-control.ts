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
  readonly shouldLabelFloat!: boolean;
  readonly ngControl!: NgControl;
  private readonly _disabled!: boolean;
  public get disabled(): boolean {
    return this._disabled;
  }
}
