import { Component, inject } from '@angular/core';
import { SidebarModalService } from '../../../modules/modal/sidebar-modal.service';

/**
 * Demo sidebar content — "App Settings" drawer.
 * Demonstrates a form-like settings panel rendered inside a SidebarModalService
 * drawer. Illustrates that sidebar content components are plain Angular
 * components — they can hold local state, bind to inputs, and call
 * SidebarModalService.close() to dismiss.
 */
@Component({
  selector: 'ui-sidebar-demo-settings',
  standalone: false,
  template: `
    <div class="ui-modal-header">
      <h5 class="ui-modal-title">App Settings</h5>
    </div>

    <div class="ui-modal-body">
      <div class="sds-row">
        <span class="sds-label">Email Notifications</span>
        <uilibrary-toggle [hideLabel]="true" [(ngModel)]="notifications"></uilibrary-toggle>
      </div>

      <div class="sds-row">
        <span class="sds-label">Dark Mode</span>
        <uilibrary-toggle [hideLabel]="true" [(ngModel)]="darkMode"></uilibrary-toggle>
      </div>

      <div class="sds-row sds-row--column">
        <span class="sds-label">Language</span>
        <uilibrary-select [items]="langOptions" [useCustomTemplate]="false" [(ngModel)]="selectedLang"></uilibrary-select>
      </div>

      <div class="sds-row sds-row--column">
        <span class="sds-label">Timezone</span>
        <uilibrary-select [items]="tzOptions" [useCustomTemplate]="false" [(ngModel)]="selectedTz"></uilibrary-select>
      </div>
    </div>

    <div class="ui-modal-footer">
      <uilibrary-button appearance="primary">Save</uilibrary-button>
      <uilibrary-button appearance="secondary" (click)="sidebarModal.close()">Cancel</uilibrary-button>
    </div>
  `,
  styles: [`
    .sds-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.875rem 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .sds-row--column {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    .sds-label {
      font-size: 0.9375rem;
      color: #212529;
      font-weight: 500;
    }
  `],
})
export class SidebarDemoSettingsComponent {
  notifications = true;
  darkMode = false;
  selectedLang = 'English (US)';
  langOptions = ['English (US)', 'German', 'French', 'Japanese'];
  selectedTz = 'UTC';
  tzOptions = ['UTC', 'US / Eastern', 'Europe / London', 'Asia / Tokyo'];

  readonly sidebarModal: SidebarModalService = inject(SidebarModalService);
}
