import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const current = i18n.language

  const toggleLocale = () => {
    i18n.changeLanguage(current === 'en' ? 'es' : 'en')
  }

  return (
    <button type="button" className="language-switcher" onClick={toggleLocale}>
      {current.toUpperCase()}
    </button>
  )
}
