import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiModalModule } from './modal.module';
import { SidebarModalOutletComponent } from './sidebar-modal-outlet.component';
import { SidebarModalService } from './sidebar-modal.service';

/**
 * Feature module for the sidebar drawer routing system.
 *
 * Import SidebarModalModule into any feature shell module that needs a
 * router-outlet-driven side drawer. The module:
 *
 *  - Declares and exports  SidebarModalOutletComponent  (<ui-sidebar-modal-outlet>)
 *  - Provides              SidebarModalService           (navigation-only service)
 *  - Re-exports            UiModalModule                 (CDK overlay infrastructure)
 *
 * @example
 * // In your feature shell module:
 * \@NgModule({
 *   imports: [SidebarModalModule],
 *   ...
 * })
 * export class MyShellModule {}
 */
@NgModule({
  declarations: [SidebarModalOutletComponent],
  imports: [CommonModule, RouterModule, UiModalModule],
  exports: [SidebarModalOutletComponent],
  providers: [SidebarModalService],
})
export class SidebarModalModule {}
