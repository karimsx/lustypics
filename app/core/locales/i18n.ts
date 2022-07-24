import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Backend from "i18next-http-backend"

// ----------------------------------------------------------------------

let lng = 'en';

if (typeof localStorage !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || 'en';
}


if(typeof window !== 'undefined') {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: localStorage.getItem("i18nextLng") || "fr",
      fallbackLng: "fr",
      debug: false,
      ns: ['translations'],
      keySeparator: ".",
      defaultNS: 'translations',
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false,
      },
    });

}

export default i18n;
