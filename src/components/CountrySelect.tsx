import type { CountryTy } from '../types/countryTypes'

interface CountrySelectProps {
  countries: CountryTy[]
  value: string
  onChange: (value: string) => void
  loading: boolean
}

export const CountrySelect = ({countries, value, onChange, loading} : CountrySelectProps) => {
  return (
    <div className="form-field">
      <label htmlFor="country">Country</label>
      <select id="country" name="country" value={value} onChange={(e) => onChange(e.target.value)} disabled={loading}>
        <option value="">{loading ? 'Loading countries...' : 'Select a country'}</option>
        {countries.map(country => (
          <option key={country.cca2} value={country.cca2}>{country.name.common}</option>
        ))}
      </select>
    </div>
  )
}
