import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { getDateFnsLocale } from '../bridges/date-fns.map';
import { Locale } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class DateFnsLocaleService {
  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  get locale(): Locale | undefined {
    return getDateFnsLocale(this.localeId);
  }
}