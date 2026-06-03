import { Injectable } from '@angular/core';
import { UiModalOptions } from './modal-options';

/**
 * Global configuration service for UiModal.
 * Inject this service (typically in your root component or AppModule) to set
 * default values for all modals opened in the application.
 */
@Injectable({ providedIn: 'root' })
export class UiModalConfig implements UiModalOptions {
  animation = true;
  backdrop: boolean | 'static' = true;
  backdropClass?: string;
  centered = false;
  keyboard = true;
  size?: 'sm' | 'lg' | 'xl' | string;
  scrollable = false;
  fullscreen?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string = false;
  windowClass?: string;
  modalDialogClass?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role: 'dialog' | 'alertdialog' = 'dialog';
}
