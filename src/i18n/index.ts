import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../messages/en.json'
import es from '../messages/es.json'

export const locales = ['en', 'es'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

const storageKey = 'locale'

const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value)

const getInitialLocale = (): Locale => {
  const stored = localStorage.getItem(storageKey)
  if (stored && isLocale(stored)) return stored

  const browserLocale = navigator.language.split('-')[0]
  return isLocale(browserLocale) ? browserLocale : defaultLocale
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: getInitialLocale(),
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false,
    },
  })

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(storageKey, lng)
})

export default i18n
