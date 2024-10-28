import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconsModule } from "../icons/icon.module";

@NgModule({
  imports: [
    CommonModule,
    IconsModule
],
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ]
})
export class ButtonsModule { }
