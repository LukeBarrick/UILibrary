import { Component, inject } from '@angular/core';
import { SidebarModalService } from '../../../modules/modal/sidebar-modal.service';

/**
 * Demo sidebar content — "User Profile" drawer.
 * Demonstrates a read-only profile view rendered inside a SidebarModalService
 * drawer. The Close button delegates to SidebarModalService.close() which
 * navigates to clear the sidebar outlet and lets SidebarModalOutletComponent
 * dismiss the CDK overlay.
 */
@Component({
  selector: 'ui-sidebar-demo-profile',
  standalone: false,
  template: `
    <div class="ui-modal-header">
      <h5 class="ui-modal-title">User Profile</h5>
    </div>

    <div class="ui-modal-body">
      <div class="sdp-field">
        <span class="sdp-label">Full Name</span>
        <p class="sdp-value">Jane Doe</p>
      </div>
      <div class="sdp-field">
        <span class="sdp-label">Email</span>
        <p class="sdp-value">jane.doe&#64;example.com</p>
      </div>
      <div class="sdp-field">
        <span class="sdp-label">Role</span>
        <p class="sdp-value">Product Manager</p>
      </div>
      <div class="sdp-field">
        <span class="sdp-label">Department</span>
        <p class="sdp-value">Design Systems</p>
      </div>
      <div class="sdp-field">
        <span class="sdp-label">Location</span>
        <p class="sdp-value">London, UK</p>
      </div>
    </div>

    <div class="ui-modal-footer">
      <uilibrary-button appearance="secondary" (click)="sidebarModal.close()">Close</uilibrary-button>
    </div>
  `,
  styles: [`
    .sdp-field {
      margin-bottom: 1.25rem;
    }
    .sdp-label {
      display: block;
      font-size: 0.6875rem;
      font-weight: 700;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 0.25rem;
    }
    .sdp-value {
      margin: 0;
      font-size: 0.9375rem;
      color: #212529;
    }
  `],
})
export class SidebarDemoProfileComponent {
  readonly sidebarModal: SidebarModalService = inject(SidebarModalService);
}
