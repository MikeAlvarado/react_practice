import {useState} from 'react'
import type { RegisterFormData } from '../../types/form.types'
import { CountrySelect } from '../../components/CountrySelect'
import { useCountries } from '../../hooks/useCountries'
import './RegisterForm.css'

type FormMode = 'register' | 'signin' | 'forgot'

const COPY: Record<FormMode, { title: string; subtitle: string; submitLabel: string }> = {
  register: {
    title: 'Create your account',
    subtitle: 'Fill in your details below to get started.',
    submitLabel: 'Create account',
  },
  signin: {
    title: 'Welcome back',
    subtitle: 'Sign in with your email and password.',
    submitLabel: 'Sign in',
  },
  forgot: {
    title: 'Reset your password',
    subtitle: "Enter your email and we'll send you a reset link.",
    submitLabel: 'Send reset link',
  },
}

export const RegisterForm = () => {

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
  const copy = COPY[mode]

  return(
    <div className="register-view">
      <div className="register-card">
        <div className="register-card__mark" aria-hidden="true">C</div>
        <h2 className="register-card__title">{copy.title}</h2>
        <p className="register-card__subtitle">{copy.subtitle}</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className={`form-field-collapse ${showName ? '' : 'is-collapsed'}`} inert={!showName}>
            <div className="form-field-collapse__inner">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" autoComplete="name" placeholder="Rose Prime" value={formData.name} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
          </div>
          <div className={`form-field-collapse ${showPassword ? '' : 'is-collapsed'}`} inert={!showPassword}>
            <div className="form-field-collapse__inner">
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder="At least 8 characters" value={formData.password} onChange={handleChange} />
                {mode === 'register' && <p className="form-field__hint">Use 8 or more characters with a mix of letters and numbers.</p>}
              </div>
            </div>
          </div>
          <div className={`form-field-collapse ${showCountry ? '' : 'is-collapsed'}`} inert={!showCountry}>
            <div className="form-field-collapse__inner">
              <CountrySelect countries={countries} value={formData.country} onChange={(value) => setFormData({...formData, country: value})} loading={loading} />
            </div>
          </div>
          <button type="submit">{copy.submitLabel}</button>
        </form>
        <div className="register-card__footer">
          {mode === 'register' && (
            <p>Already have an account? <button type="button" onClick={() => setMode('signin')}>Sign in</button></p>
          )}
          {mode === 'signin' && (
            <>
              <p><button type="button" onClick={() => setMode('forgot')}>Forgot password?</button></p>
              <p>New here? <button type="button" onClick={() => setMode('register')}>Create an account</button></p>
            </>
          )}
          {mode === 'forgot' && (
            <p><button type="button" onClick={() => setMode('signin')}>Back to sign in</button></p>
          )}
        </div>
      </div>
      <p className="register-view__note">
        One form for sign up, sign in, and password reset. The country field on sign up calls the{' '}
        <a href="https://restcountries.com" target="_blank" rel="noreferrer">REST Countries API</a>{' '}
        directly from the browser — no backend involved.
      </p>
    </div>
  )
}
