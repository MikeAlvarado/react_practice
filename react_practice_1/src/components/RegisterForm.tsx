import {useState} from 'react'
import type { RegisterFormData } from '../types/form.types'
import { CountrySelect } from './CountrySelect'
import { useCountries } from '../hooks/useCountries'

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

  return(
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <CountrySelect countries={countries} value={formData.country} onChange={(value) => setFormData({...formData, country: value})} loading={loading} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}