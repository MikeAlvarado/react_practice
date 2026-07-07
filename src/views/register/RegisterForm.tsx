import {useState} from 'react'
import type { RegisterFormData } from '../../types/form.types'
import { CountrySelect } from '../../components/CountrySelect'
import { useCountries } from '../../hooks/useCountries'
import './RegisterForm.css'

export const RegisterForm = () => {

  const {countries, loading} = useCountries()

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

  return(
    <div className="register-card">
      <div className="register-card__mark" aria-hidden="true">C</div>
      <h2 className="register-card__title">Create your account</h2>
      <p className="register-card__subtitle">Fill in your details below to get started.</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" autoComplete="name" placeholder="Rose Prime" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" autoComplete="new-password" placeholder="At least 8 characters" value={formData.password} onChange={handleChange} />
          <p className="form-field__hint">Use 8 or more characters with a mix of letters and numbers.</p>
        </div>
        <CountrySelect countries={countries} value={formData.country} onChange={(value) => setFormData({...formData, country: value})} loading={loading} />
        <button type="submit">Create account</button>
      </form>
      <p className="register-card__footer">Already have an account? <a href="#">Sign in</a></p>
    </div>
  )
}
