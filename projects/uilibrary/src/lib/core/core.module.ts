import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThrowIfAlreadyLoaded } from './module-import-guard';
import { UUIDService } from './services/UUID.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    UUIDService
  ],
  exports: [
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    ThrowIfAlreadyLoaded(parentModule, 'CoreModule')
  }
 }