import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [CommonModule, AngularSvgIconModule.forRoot()],
  declarations: [IconComponent],
  exports: [IconComponent, AngularSvgIconModule],
})
export class IconModule {}
