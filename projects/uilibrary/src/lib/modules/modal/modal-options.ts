import { Injector, TemplateRef, Type } from '@angular/core';

export interface UiModalOptions {
  /** If true, modal opening and closing will be animated. Default: true */
  animation?: boolean;

  /**
   * If true, a backdrop is shown behind the modal. Use 'static' for a backdrop
   * that does not close the modal on click. Default: true
   */
  backdrop?: boolean | 'static';

  /** A custom CSS class to append to the modal backdrop. */
  backdropClass?: string;

  /** If true, the modal will be vertically centered. Default: false */
  centered?: boolean;

  /** If true, the modal closes when the Escape key is pressed. Default: true */
  keyboard?: boolean;

  /**
   * Size of the modal dialog.
   * 'sm' = 300px, 'lg' = 800px, 'xl' = 1140px, or any custom string for a custom CSS class.
   */
  size?: 'sm' | 'lg' | 'xl' | string;

  /** If true, the modal body will be independently scrollable. Default: false */
  scrollable?: boolean;

  /**
   * When true, the modal is always fullscreen. When a breakpoint string is provided
   * (e.g. 'md'), the modal goes fullscreen only below that breakpoint.
   */
  fullscreen?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string;

  /** A custom CSS class to append to the modal window (.ui-modal-dialog). */
  windowClass?: string;

  /** A custom CSS class to append to the modal dialog element (.ui-modal-dialog inner). */
  modalDialogClass?: string;

  /** aria-labelledby attribute for the modal window. */
  ariaLabelledBy?: string;

  /** aria-describedby attribute for the modal window. */
  ariaDescribedBy?: string;

  /** Role attribute for the modal window. Default: 'dialog' */
  role?: 'dialog' | 'alertdialog';

  /** Custom injector to use for the modal content component. */
  injector?: Injector;

  /** Context object passed to TemplateRef-based modal content via createEmbeddedView. */
  templateContext?: any;
}
