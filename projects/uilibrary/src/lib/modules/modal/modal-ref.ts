import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UiModalOptions } from './modal-options';

/**
 * A reference to a newly opened modal returned by UiModalService.open().
 *
 * Use this to listen for close/dismiss events, access the content component
 * instance, or programmatically close/dismiss the modal.
 */
export class UiModalRef {
  private readonly _close$ = new Subject<any>();
  private readonly _dismiss$ = new Subject<any>();
  private readonly _shown$ = new Subject<void>();
  private readonly _hidden$ = new Subject<void>();

  private _closing = false;

  /**
   * The instance of the component used for modal content.
   * Undefined when a TemplateRef is used as content, or before the modal has rendered.
   */
  componentInstance: any;

  /**
   * Observable that emits when the modal is closed via .close().
   * Emits the result passed to .close().
   */
  readonly closed: Observable<any> = this._close$.asObservable();

  /**
   * Observable that emits when the modal is dismissed via .dismiss().
   * Emits the reason passed to .dismiss() (or a UiModalDismissReason constant).
   */
  readonly dismissed: Observable<any> = this._dismiss$.asObservable();

  /**
   * Observable that emits once when the modal is fully visible and the open
   * animation has finished. Completes after emitting.
   */
  readonly shown: Observable<void> = this._shown$.pipe(take(1));

  /**
   * Observable that emits once when both the modal and backdrop are fully hidden
   * and removed from the DOM. Completes after emitting.
   */
  readonly hidden: Observable<void> = this._hidden$.pipe(take(1));

  /**
   * Promise that resolves with the result when the modal is closed, or rejects
   * with the reason when the modal is dismissed.
   */
  readonly result: Promise<any>;

  /** Internal: Subject to notify UiModalComponent to start close animation. */
  readonly _closeRequest$ = new Subject<{ result: any; type: 'close' | 'dismiss' }>();

  /** Internal: Subject to notify UiModalComponent of option updates. */
  readonly _optionUpdates$ = new Subject<Partial<UiModalOptions>>();

  constructor(private _overlayRef: OverlayRef) {
    this.result = new Promise<any>((resolve, reject) => {
      this._close$.subscribe(resolve);
      this._dismiss$.subscribe(reject);
    });
    // Prevent unhandled promise rejection warnings when the consumer doesn't
    // attach a .catch() handler.
    this.result.catch(() => {});
  }

  /**
   * Closes the modal with an optional result value.
   * The result Promise will resolve with the provided value.
   */
  close(result?: any): void {
    if (this._closing) { return; }
    this._closing = true;
    this._closeRequest$.next({ result, type: 'close' });
  }

  /**
   * Dismisses the modal with an optional reason value.
   * The result Promise will reject with the provided reason.
   */
  dismiss(reason?: any): void {
    if (this._closing) { return; }
    this._closing = true;
    this._closeRequest$.next({ result: reason, type: 'dismiss' });
  }

  /**
   * Updates options of an opened modal dynamically.
   */
  update(options: Partial<UiModalOptions>): void {
    this._optionUpdates$.next(options);
  }

  /** @internal Called by UiModalComponent once content has initialized. */
  _setComponentInstance(instance: any): void {
    this.componentInstance = instance;
  }

  /** @internal Called by UiModalComponent after the open animation completes. */
  _notifyShown(): void {
    this._shown$.next();
    this._shown$.complete();
  }

  /**
   * @internal Called by UiModalComponent after the close animation completes.
   * Emits on the appropriate Subject, disposes the overlay, and completes all Subjects.
   */
  _notifyHidden(type: 'close' | 'dismiss', value: any): void {
    this._overlayRef.dispose();

    if (type === 'close') {
      this._close$.next(value);
      this._close$.complete();
    } else {
      this._dismiss$.next(value);
      this._dismiss$.complete();
    }

    this._hidden$.next();
    this._hidden$.complete();
    this._closeRequest$.complete();
    this._optionUpdates$.complete();
  }
}
