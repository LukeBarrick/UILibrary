import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UiActiveModal } from './active-modal';
import { UiModalDismissReason } from './modal-dismiss-reasons';
import { UiModalOptions } from './modal-options';
import { UiModalRef } from './modal-ref';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UiModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() contentComponent?: Type<any>;
  @Input() contentTemplate?: TemplateRef<any>;
  @Input() contentInjector?: Injector;
  @Input() options!: UiModalOptions;

  @ViewChild('contentHost', { read: ViewContainerRef })
  private contentVcr!: ViewContainerRef;

  @ViewChild('dialogEl')
  private dialogEl!: ElementRef<HTMLElement>;

  isOpen = false;
  isStaticBounce = false;

  private _pendingClose?: { result: any; type: 'close' | 'dismiss' };
  private _subscriptions = new Subscription();

  constructor(
    private readonly _modalRef: UiModalRef,
    private readonly _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._modalRef._closeRequest$.subscribe(req => {
        this._startCloseAnimation(req.result, req.type);
      }),
    );

    this._subscriptions.add(
      this._modalRef._optionUpdates$.subscribe(updates => {
        this.options = { ...this.options, ...updates };
        this._cdr.markForCheck();
      }),
    );
  }

  ngAfterViewInit(): void {
    // Render content
    if (this.contentComponent) {
      const ref = this.contentVcr.createComponent(this.contentComponent, {
        injector: this.contentInjector,
      });
      this._modalRef._setComponentInstance(ref.instance);
    } else if (this.contentTemplate) {
      this.contentVcr.createEmbeddedView(
        this.contentTemplate,
        this.options.templateContext ?? {},
      );
    }

    // Trigger open animation on next microtask so the initial CSS state applies first
    setTimeout(() => {
      this.isOpen = true;
      this._cdr.markForCheck();

      if (this.options.animation !== false) {
        const dialog = this.dialogEl?.nativeElement;
        if (dialog) {
          const onTransitionEnd = () => {
            dialog.removeEventListener('transitionend', onTransitionEnd);
            this._modalRef._notifyShown();
          };
          dialog.addEventListener('transitionend', onTransitionEnd);
        } else {
          this._modalRef._notifyShown();
        }
      } else {
        this._modalRef._notifyShown();
      }
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  onBackdropClick(): void {
    if (this.options.backdrop === 'static') {
      this._playStaticBounce();
    } else if (this.options.backdrop === true || this.options.backdrop === undefined) {
      this._modalRef.dismiss(UiModalDismissReason.BackdropClick);
    }
  }

  get dialogClasses(): Record<string, boolean> {
    const size = this.options.size;
    const fullscreen = this.options.fullscreen;

    return {
      'ui-modal-dialog--sm': size === 'sm',
      'ui-modal-dialog--lg': size === 'lg',
      'ui-modal-dialog--xl': size === 'xl',
      'ui-modal-dialog--centered': !!this.options.centered,
      'ui-modal-dialog--scrollable': !!this.options.scrollable,
      'ui-modal-dialog--fullscreen': fullscreen === true,
      'ui-modal-dialog--fullscreen-sm': fullscreen === 'sm',
      'ui-modal-dialog--fullscreen-md': fullscreen === 'md',
      'ui-modal-dialog--fullscreen-lg': fullscreen === 'lg',
      'ui-modal-dialog--fullscreen-xl': fullscreen === 'xl',
      'ui-modal-dialog--fullscreen-xxl': fullscreen === 'xxl',
      'show': this.isOpen && this.options.animation !== false,
      'no-animation': this.options.animation === false,
      'static-bounce': this.isStaticBounce,
      [this.options.modalDialogClass ?? '']: !!this.options.modalDialogClass,
      [this.options.windowClass ?? '']: !!this.options.windowClass,
    };
  }

  private _startCloseAnimation(result: any, type: 'close' | 'dismiss'): void {
    this._pendingClose = { result, type };
    this.isOpen = false;
    this._cdr.markForCheck();

    if (this.options.animation !== false) {
      const dialog = this.dialogEl?.nativeElement;
      if (dialog) {
        const onTransitionEnd = () => {
          dialog.removeEventListener('transitionend', onTransitionEnd);
          this._finishClose();
        };
        dialog.addEventListener('transitionend', onTransitionEnd);
      } else {
        this._finishClose();
      }
    } else {
      this._finishClose();
    }
  }

  private _finishClose(): void {
    if (this._pendingClose) {
      const { result, type } = this._pendingClose;
      this._pendingClose = undefined;
      this._modalRef._notifyHidden(type, result);
    }
  }

  private _playStaticBounce(): void {
    if (this.isStaticBounce) { return; }
    this.isStaticBounce = true;
    this._cdr.markForCheck();
    setTimeout(() => {
      this.isStaticBounce = false;
      this._cdr.markForCheck();
    }, 300);
  }
}
