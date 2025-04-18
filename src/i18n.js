import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import global_da from "./languages/da/global.json";
import global_en from "./languages/en/global.json";

i18next.use(initReactI18next).init({
  resources: {
    da: {
      global: global_da,
    },
    en: {
      global: global_en,
    },
  },
  lng: "da",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
