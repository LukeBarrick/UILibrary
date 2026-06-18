import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconModule } from '../../modules/icon/icon.module';
import { ButtonLinkComponent } from './button-link-component/button-link.component';
import { RouterLink, RouterLinkActive } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    RouterLink,
    RouterLinkActive
],
  declarations: [
    ButtonComponent,
    ButtonLinkComponent
  ],
  exports: [
    ButtonComponent,
    ButtonLinkComponent
  ]
})
export class ButtonModule { }
