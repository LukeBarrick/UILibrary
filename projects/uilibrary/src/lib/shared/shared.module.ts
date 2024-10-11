import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
  ],
  declarations: [

  ],
  exports: [
    AngularSvgIconModule
  ],
  providers: [
  ]
})

export class SharedModule {
 
}
