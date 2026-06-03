import { Injectable } from '@angular/core';
import { UiModalOptions } from './modal-options';
import { UiModalRef } from './modal-ref';

/**
 * A reference to the currently active (open) modal.
 *
 * Instances of this class can be injected into your component when it is used
 * as modal content. Use it to close or dismiss the modal from within the
 * content component.
 *
 * @example
 * constructor(private activeModal: UiActiveModal) {}
 *
 * save() { this.activeModal.close(this.form.value); }
 * cancel() { this.activeModal.dismiss(); }
 */
@Injectable()
export class UiActiveModal {
  /** @internal Set by UiModalService before the content component is instantiated. */
  _modalRef!: UiModalRef;

  /**
   * Closes the modal with an optional result value.
   * The UiModalRef.result Promise will resolve with the provided value.
   */
  close(result?: any): void {
    this._modalRef.close(result);
  }

  /**
   * Dismisses the modal with an optional reason value.
   * The UiModalRef.result Promise will reject with the provided reason.
   */
  dismiss(reason?: any): void {
    this._modalRef.dismiss(reason);
  }

  /**
   * Updates options of the currently open modal.
   */
  update(options: Partial<UiModalOptions>): void {
    this._modalRef.update(options);
  }
}
