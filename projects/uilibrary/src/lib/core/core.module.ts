import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ThrowIfAlreadyLoaded } from './module-import-guard';

import { UUIDService } from './services/UUID.service';

import { DATE_NOW } from './tokens/DATE_NOW';

import localeEn from '@angular/common/locales/en';
import localeUs from '@angular/common/locales/es-US';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localePt from '@angular/common/locales/pt';
import localeJa from '@angular/common/locales/ja';
import { LibIconService } from './services/icon.service';

registerLocaleData(localeEn);
registerLocaleData(localeUs);
registerLocaleData(localeDe);
registerLocaleData(localeEs);
registerLocaleData(localeFr);
registerLocaleData(localeIt);
registerLocaleData(localePt);
registerLocaleData(localeJa);

export function initialiseDate(date: Date) {
  return date.setHours(0,0,0,0);
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    UUIDService,
    { provide: DATE_NOW, useFactory: () => new Date()}
  ],
  exports: [
  ]
})


export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    ThrowIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}