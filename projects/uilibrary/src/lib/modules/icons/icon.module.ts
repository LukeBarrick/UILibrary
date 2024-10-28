import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icons/icon.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot()
  ],
  declarations: [
    IconComponent
  ],
  exports: [
    AngularSvgIconModule,
    IconComponent
  ]
})
export class IconModule { }
