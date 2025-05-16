import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import global_danish from '../languages/danish/global.json'
import global_english from '../languages/english/global.json'

i18next.use(initReactI18next).init({
  resources: {
    da: {
      global: global_danish,
    },
    en: {
      global: global_english,
    },
  },
  lng: 'da',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
