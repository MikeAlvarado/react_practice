import type { CountryTy } from '../types/countryTypes'

interface CountrySelectProps {
  countries: CountryTy[]
  value: string
  onChange: (value: string) => void
  loading: boolean
}

export const CountrySelect = ({countries, value, onChange, loading} : CountrySelectProps) => {
  if (loading) {
    return <p>Loading countries...</p>
  }
  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a country</option>
        {countries.map(country => (
          <option key={country.cca2} value={country.cca2}>{country.name.common}</option>
        ))}
      </select>
    </div>
  )
}