import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import type { RegisterFormData } from '../../types/form.types'
import { CountrySelect } from '../../components/CountrySelect'
import { useCountries } from '../../hooks/useCountries'
import './RegisterForm.css'

type FormMode = 'register' | 'signin' | 'forgot'

export const RegisterForm = () => {
  const { t } = useTranslation()
  const {countries, loading} = useCountries()
  const [mode, setMode] = useState<FormMode>('register')

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    country: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const showName = mode === 'register'
  const showCountry = mode === 'register'
  const showPassword = mode !== 'forgot'

  return(
    <div className="register-card">
      <div className="register-card__mark" aria-hidden="true">C</div>
      <h2 className="register-card__title">{t(`register.modes.${mode}.title`)}</h2>
      <p className="register-card__subtitle">{t(`register.modes.${mode}.subtitle`)}</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className={`form-field-collapse ${showName ? '' : 'is-collapsed'}`} inert={!showName}>
          <div className="form-field-collapse__inner">
            <div className="form-field">
              <label htmlFor="name">{t('register.fields.name')}</label>
              <input type="text" id="name" name="name" autoComplete="name" placeholder={t('register.fields.namePlaceholder')} value={formData.name} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="email">{t('register.fields.email')}</label>
          <input type="email" id="email" name="email" autoComplete="email" placeholder={t('register.fields.emailPlaceholder')} value={formData.email} onChange={handleChange} />
        </div>
        <div className={`form-field-collapse ${showPassword ? '' : 'is-collapsed'}`} inert={!showPassword}>
          <div className="form-field-collapse__inner">
            <div className="form-field">
              <label htmlFor="password">{t('register.fields.password')}</label>
              <input type="password" id="password" name="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder={t('register.fields.passwordPlaceholder')} value={formData.password} onChange={handleChange} />
              {mode === 'register' && <p className="form-field__hint">{t('register.fields.passwordHint')}</p>}
            </div>
          </div>
        </div>
        <div className={`form-field-collapse ${showCountry ? '' : 'is-collapsed'}`} inert={!showCountry}>
          <div className="form-field-collapse__inner">
            <CountrySelect countries={countries} value={formData.country} onChange={(value) => setFormData({...formData, country: value})} loading={loading} />
          </div>
        </div>
        <button type="submit">{t(`register.modes.${mode}.submit`)}</button>
      </form>
      <div className="register-card__footer">
        {mode === 'register' && (
          <p>{t('register.footer.haveAccount')} <button type="button" onClick={() => setMode('signin')}>{t('register.footer.signIn')}</button></p>
        )}
        {mode === 'signin' && (
          <>
            <p><button type="button" onClick={() => setMode('forgot')}>{t('register.footer.forgotPassword')}</button></p>
            <p>{t('register.footer.newHere')} <button type="button" onClick={() => setMode('register')}>{t('register.footer.createAccount')}</button></p>
          </>
        )}
        {mode === 'forgot' && (
          <p><button type="button" onClick={() => setMode('signin')}>{t('register.footer.backToSignIn')}</button></p>
        )}
      </div>
    </div>
  )
}
