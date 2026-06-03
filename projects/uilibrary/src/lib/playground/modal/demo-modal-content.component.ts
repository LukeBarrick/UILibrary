import { Component } from '@angular/core';
import { UiActiveModal } from '../../modules/modal/active-modal';

/**
 * Sample component used as modal content in the playground.
 * Demonstrates injection of UiActiveModal.
 */
@Component({
  selector: 'ui-demo-modal-content',
  template: `
    <div class="ui-modal-header">
      <h5 class="ui-modal-title" id="modal-title">{{ title }}</h5>
    </div>
    <div class="ui-modal-body">
      <p>{{ body }}</p>
    </div>
    <div class="ui-modal-footer">
      <uilibrary-button appearance="secondary" (click)="activeModal.dismiss('cancel')">
        Cancel
      </uilibrary-button>
      <uilibrary-button appearance="primary" (click)="activeModal.close('saved')">
        Ok
      </uilibrary-button>
    </div>
  `,
  standalone: false,
})
export class DemoModalContentComponent {
  title = 'Modal title';
  body = 'This is the modal body. It uses a component as content and injects UiActiveModal.';

  constructor(public activeModal: UiActiveModal) { }
}
