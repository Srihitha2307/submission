import { en } from './en';
import { hi } from './hi';

export type LanguageCode = 'en' | 'hi';

export const translations = {
  en,
  hi,
};

export function getTranslation(lang: LanguageCode) {
  return translations[lang] || translations.en;
}
