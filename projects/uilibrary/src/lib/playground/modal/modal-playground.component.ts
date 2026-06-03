import { Component, TemplateRef } from '@angular/core';
import { UiModalService } from '../../modules/modal/modal.service';
import { UiModalRef } from '../../modules/modal/modal-ref';
import { UiModalDismissReason } from '../../modules/modal/modal-dismiss-reasons';
import { DemoModalContentComponent } from './demo-modal-content.component';

@Component({
  selector: 'uilibrary-modal-playground',
  templateUrl: 'modal-playground.component.html',
  styleUrl: 'modal-playground.component.scss',
  standalone: false,
})
export class ModalPlaygroundComponent {
  lastResult = '';
  stackCount = 0;

  constructor(private modalService: UiModalService) {}

  openBasic(): void {
    const ref = this.modalService.open(DemoModalContentComponent);
    this._trackResult(ref);
  }

  openSm(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { size: 'sm' });
    this._trackResult(ref);
  }

  openLg(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { size: 'lg' });
    this._trackResult(ref);
  }

  openXl(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { size: 'xl' });
    this._trackResult(ref);
  }

  openCentered(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { centered: true });
    this._trackResult(ref);
  }

  openStaticBackdrop(): void {
    const ref = this.modalService.open(DemoModalContentComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    this._trackResult(ref);
  }

  openNoBackdrop(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { backdrop: false });
    this._trackResult(ref);
  }

  openScrollable(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { scrollable: true, centered: true });
    ref.componentInstance.body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20);
    this._trackResult(ref);
  }

  openFullscreen(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { fullscreen: true });
    this._trackResult(ref);
  }

  openFullscreenMd(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { fullscreen: 'md' });
    this._trackResult(ref);
  }

  openNoAnimation(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { animation: false });
    this._trackResult(ref);
  }

  openTemplate(templateRef: TemplateRef<any>): void {
    const ref = this.modalService.open(templateRef, { centered: true });
    this._trackResult(ref);
  }

  openStacked(): void {
    this.stackCount++;
    const count = this.stackCount;
    const ref = this.modalService.open(DemoModalContentComponent, { centered: true });
    ref.componentInstance.title = `Stacked Modal #${count}`;
    ref.componentInstance.body = `This is stacked modal ${count}. Open another to stack further.`;
    this._trackResult(ref);
  }

  dismissAll(): void {
    this.modalService.dismissAll('dismiss-all');
    this.lastResult = 'All modals dismissed';
    this.stackCount = 0;
  }

  private _trackResult(ref: UiModalRef): void {
    ref.closed.subscribe(result => {
      this.lastResult = `Closed with: "${result}"`;
    });
    ref.dismissed.subscribe(reason => {
      const label = reason === UiModalDismissReason.Esc ? 'ESC key'
        : reason === UiModalDismissReason.BackdropClick ? 'Backdrop click'
        : reason;
      this.lastResult = `Dismissed (${label})`;
    });
  }
}
