import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ThrowIfAlreadyLoaded } from './module-import-guard';
import { UUIDService } from './services/UUID.service';

import localeEn from '@angular/common/locales/en';
import localeUs from '@angular/common/locales/es-US';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localePt from '@angular/common/locales/pt';
import localeJa from '@angular/common/locales/ja';

registerLocaleData(localeEn);
registerLocaleData(localeUs);
registerLocaleData(localeDe);
registerLocaleData(localeEs);
registerLocaleData(localeFr);
registerLocaleData(localeIt);
registerLocaleData(localePt);
registerLocaleData(localeJa);

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