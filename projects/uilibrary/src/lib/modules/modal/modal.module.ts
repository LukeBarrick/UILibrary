import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModalComponent } from './modal.component';
import { UiModalService } from './modal.service';

@NgModule({
  declarations: [UiModalComponent],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    A11yModule,
  ],
  providers: [UiModalService],
})
export class UiModalModule {}
