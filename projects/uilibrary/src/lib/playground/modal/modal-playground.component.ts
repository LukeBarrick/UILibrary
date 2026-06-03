import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiModalService } from '../../modules/modal/modal.service';
import { UiModalRef } from '../../modules/modal/modal-ref';
import { UiModalDismissReason } from '../../modules/modal/modal-dismiss-reasons';
import { DemoModalContentComponent } from './demo-modal-content.component';
import { SidebarModalService } from '../../modules/modal/sidebar-modal.service';

@Component({
  selector: 'uilibrary-modal-playground',
  templateUrl: 'modal-playground.component.html',
  styleUrl: 'modal-playground.component.scss',
  standalone: false,
})
export class ModalPlaygroundComponent {
  lastResult = '';
  promiseResult = '';
  stackCount = 0;

  constructor(
    private modalService: UiModalService,
    public sidebarModal: SidebarModalService,
    private readonly _route: ActivatedRoute,
  ) {}

  //Subscription based modal results.
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

  // ── Promise based ────────────────────────────────────────────────────────────

  // .then() / .catch() style
  openPromiseBasic(): void {
    const ref = this.modalService.open(DemoModalContentComponent);
    ref.result
      .then(result => { this.promiseResult = `Closed with: "${result}"`; })
      .catch(reason => { this.promiseResult = `Dismissed (${this._reasonLabel(reason)})`; });
  }

  openPromiseSm(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { size: 'sm' });
    ref.result
      .then(result => { this.promiseResult = `Closed with: "${result}"`; })
      .catch(reason => { this.promiseResult = `Dismissed (${this._reasonLabel(reason)})`; });
  }

  openPromiseLg(): void {
    const ref = this.modalService.open(DemoModalContentComponent, { size: 'lg' });
    ref.result
      .then(result => { this.promiseResult = `Closed with: "${result}"`; })
      .catch(reason => { this.promiseResult = `Dismissed (${this._reasonLabel(reason)})`; });
  }

  // async / await style
  async openPromiseCentered(): Promise<void> {
    const ref = this.modalService.open(DemoModalContentComponent, { centered: true });
    try {
      const result = await ref.result;
      this.promiseResult = `Closed with: "${result}"`;
    } catch (reason) {
      this.promiseResult = `Dismissed (${this._reasonLabel(reason)})`;
    }
  }

  async openPromiseStaticBackdrop(): Promise<void> {
    const ref = this.modalService.open(DemoModalContentComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
    try {
      const result = await ref.result;
      this.promiseResult = `Closed with: "${result}"`;
    } catch (reason) {
      this.promiseResult = `Dismissed (${this._reasonLabel(reason)})`;
    }
  }

  async openPromiseScrollable(): Promise<void> {
    const ref = this.modalService.open(DemoModalContentComponent, { scrollable: true, centered: true });
    ref.componentInstance.body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20);
    try {
      const result = await ref.result;
      this.promiseResult = `Closed with: "${result}"`;
    } catch (reason) {
      this.promiseResult = `Dismissed (${this._reasonLabel(reason)})`;
    }
  }

  async openPromiseTemplate(templateRef: TemplateRef<any>): Promise<void> {
    const ref = this.modalService.open(templateRef, { centered: true });
    try {
      const result = await ref.result;
      this.promiseResult = `Closed with: "${result}"`;
    } catch (reason) {
      this.promiseResult = `Dismissed (${this._reasonLabel(reason)})`;
    }
  }

  // ── Sidebar modal routing ──────────────────────────────────────────────────

  /**
   * Activates the 'sidebar-profile' route in the named 'sidebar' outlet.
   * SidebarModalOutletComponent handles opening the CDK overlay drawer.
   */
  openSidebarProfile(): void {
    // this.route.parent = PlaygroundLayoutComponent's route, which owns the sidebar outlet
    this.sidebarModal.open('sidebar-profile', this._route.parent!);
  }

  /**
   * Activates the 'sidebar-settings' route in the named 'sidebar' outlet.
   */
  openSidebarSettings(): void {
    this.sidebarModal.open('sidebar-settings', this._route.parent!);
  }

  /**
   * Programmatically closes the active sidebar drawer and clears the outlet URL.
   */
  closeSidebar(): void {
    this.sidebarModal.close();
  }

  private _trackResult(ref: UiModalRef): void {
    ref.closed.subscribe(result => {
      this.lastResult = `Closed with: "${result}"`;
    });
    ref.dismissed.subscribe(reason => {
      this.lastResult = `Dismissed (${this._reasonLabel(reason)})`;
    });
  }

  private _reasonLabel(reason: any): string {
    return reason === UiModalDismissReason.Esc ? 'ESC key'
      : reason === UiModalDismissReason.BackdropClick ? 'Backdrop click'
      : String(reason);
  }
}
