import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastOptions } from '../models/toast-options';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  public error(message: string, title?: string, timeoutOverride?: number) {
    let options = this.getDefaultToastOptions();

    options.toastClass += 'error'

    if (timeoutOverride) {
      options.timeOut = timeoutOverride;
    }

    this.toastr.error(message, title, options);
  }

  public warning(message: string, title?: string, timeoutOverride?: number) {
    let options = this.getDefaultToastOptions();

    options.toastClass += 'warning'

    if (timeoutOverride) {
      options.timeOut = timeoutOverride;
    }

    this.toastr.warning(message, title, options);
  }

  public info(message: string, title?: string, timeoutOverride?: number) {
    let options = this.getDefaultToastOptions();

    options.toastClass += 'information'

    if (timeoutOverride) {
      options.timeOut = timeoutOverride;
    }

    this.toastr.info(message, title, options);
  }

  public success(message: string, title?: string, timeoutOverride?: number) {
    let options = this.getDefaultToastOptions();

    options.toastClass += 'success'

    if (timeoutOverride) {
      options.timeOut = timeoutOverride;
    }

    this.toastr.success(message, title, options);
  }

  //TO-DO Make this a factory.
  private getDefaultToastOptions(): ToastOptions {
    let toastOptions: ToastOptions = {
      timeOut: 5000,
      closeButton: false,
      easing: 'ease-in',
      enableHtml: false,
      toastClass: 'ui-toast ',
      positionClass: 'toast-bottom-center',
    };

    return toastOptions;
  }
}
