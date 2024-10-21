import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ta from './locales/ta.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ta: { translation: ta },
  },
  lng: 'ta', // Default language
  fallbackLng: 'en', // Fallback to English if the current language key is missing
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;
