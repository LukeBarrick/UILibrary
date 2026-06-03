import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  EventEmitter,
  Injectable,
  Injector,
  OnDestroy,
  TemplateRef,
  Type,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UiActiveModal } from './active-modal';
import { UiModalDismissReason } from './modal-dismiss-reasons';
import { UiModalConfig } from './modal-config';
import { UiModalOptions } from './modal-options';
import { UiModalRef } from './modal-ref';
import { UiModalComponent } from './modal.component';

/**
 * Service for opening modal windows.
 *
 * @example
 * constructor(private modalService: UiModalService) {}
 *
 * open() {
 *   const ref = this.modalService.open(MyComponent, { size: 'lg', centered: true });
 *   ref.closed.subscribe(result => console.log('Closed with', result));
 *   ref.dismissed.subscribe(reason => console.log('Dismissed:', reason));
 * }
 */
@Injectable()
export class UiModalService implements OnDestroy {
  private readonly _openModals: UiModalRef[] = [];
  private readonly _keydownSub: Subscription;

  /**
   * Observable that emits the current list of open modal refs whenever a modal
   * is opened or closed.
   */
  readonly activeInstances = new EventEmitter<UiModalRef[]>();

  constructor(
    private readonly _overlay: Overlay,
    private readonly _injector: Injector,
    private readonly _config: UiModalConfig,
  ) {
    // Single global Escape listener — delegates to the topmost modal
    this._keydownSub = fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(filter(e => e.key === 'Escape'))
      .subscribe(() => {
        const top = this._openModals[this._openModals.length - 1];
        if (top) {
          const options = (top as any)._options as UiModalOptions;
          if (options?.keyboard !== false) {
            top.dismiss(UiModalDismissReason.Esc);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this._keydownSub.unsubscribe();
    this.dismissAll();
  }

  /**
   * Opens a new modal window with the specified content and options.
   *
   * @param content A component class or TemplateRef to render as the modal body.
   * @param options Configuration options for this modal instance.
   * @returns A UiModalRef for controlling and observing the modal.
   */
  open(content: Type<any> | TemplateRef<any>, options?: UiModalOptions): UiModalRef {
    const mergedOptions: UiModalOptions = { ...this._config, ...options };

    const overlayConfig: OverlayConfig = {
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: this._overlay.scrollStrategies.noop(),
      width: '100%',
      height: '100%',
      panelClass: 'ui-modal-overlay-pane',
    };

    const overlayRef = this._overlay.create(overlayConfig);
    const modalRef = new UiModalRef(overlayRef);

    // Attach options to the ref for use by the Escape handler
    (modalRef as any)._options = mergedOptions;

    const activeModal = new UiActiveModal();
    activeModal._modalRef = modalRef;

    const childInjector = Injector.create({
      providers: [
        { provide: UiModalRef, useValue: modalRef },
        { provide: UiActiveModal, useValue: activeModal },
      ],
      parent: mergedOptions.injector ?? this._injector,
    });

    const portal = new ComponentPortal(UiModalComponent, null, childInjector);
    const componentRef = overlayRef.attach(portal);
    const modalComponent = componentRef.instance;

    if (content instanceof TemplateRef) {
      modalComponent.contentTemplate = content;
    } else {
      modalComponent.contentComponent = content as Type<any>;
      modalComponent.contentInjector = childInjector;
    }
    modalComponent.options = mergedOptions;
    componentRef.changeDetectorRef.detectChanges();

    this._openModals.push(modalRef);
    this.activeInstances.emit([...this._openModals]);

    // Clean up once the modal has fully hidden
    modalRef.hidden.subscribe(() => {
      const idx = this._openModals.indexOf(modalRef);
      if (idx > -1) {
        this._openModals.splice(idx, 1);
      }
      this.activeInstances.emit([...this._openModals]);
    });

    return modalRef;
  }

  /**
   * Dismisses all currently open modal windows with the supplied reason.
   */
  dismissAll(reason?: any): void {
    // Iterate in reverse so each dismiss fires hidden and splices correctly
    for (let i = this._openModals.length - 1; i >= 0; i--) {
      this._openModals[i].dismiss(reason);
    }
  }

  /**
   * Returns true if there are currently any open modal windows.
   */
  hasOpenModals(): boolean {
    return this._openModals.length > 0;
  }
}
