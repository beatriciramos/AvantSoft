import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import pt from "./translations/pt.json";

i18n.use(initReactI18next).init({
  fallbackLng: "pt",
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
