import { enGB, enUS, de, fr, es, it, Locale } from 'date-fns/locale';

const DATE_FNS_LOCALE_MAP: Record<string, Locale> = {
  'en-GB': enGB,
  'en-US': enUS,
  'de-DE': de,
  'de': de,
  'fr-FR': fr,
  'fr': fr,
  'es-ES': es,
  'es': es,
  'it-IT': it,
  'it': it
};

export function getDateFnsLocale(angularLocale: string | null | undefined): Locale | undefined {
  if (!angularLocale) return undefined;

  if (DATE_FNS_LOCALE_MAP[angularLocale]) {
    return DATE_FNS_LOCALE_MAP[angularLocale];
  }

  const lang = angularLocale.split('-')[0];
  if (DATE_FNS_LOCALE_MAP[lang]) {
    return DATE_FNS_LOCALE_MAP[lang];
  }

  const norm = angularLocale.toLowerCase();
  const key = Object.keys(DATE_FNS_LOCALE_MAP).find(
    k => k.toLowerCase() === norm
  );
  if (key) {
    return DATE_FNS_LOCALE_MAP[key];
  }

  return undefined;
}
