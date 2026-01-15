import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconModule } from '../../modules/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule
],
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ]
})
export class ButtonModule { }
