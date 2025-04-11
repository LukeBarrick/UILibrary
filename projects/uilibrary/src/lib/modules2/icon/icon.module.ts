import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon2Component } from './icon.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [CommonModule, AngularSvgIconModule.forRoot()],
  declarations: [Icon2Component],
  exports: [Icon2Component, AngularSvgIconModule],
})
export class Icon2Module {}
