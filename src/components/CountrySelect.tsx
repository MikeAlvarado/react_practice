import { useTranslation } from 'react-i18next'
import type { CountryTy } from '../types/countryTypes'

interface CountrySelectProps {
  countries: CountryTy[]
  value: string
  onChange: (value: string) => void
  loading: boolean
}

export const CountrySelect = ({countries, value, onChange, loading} : CountrySelectProps) => {
  const { t } = useTranslation()

  return (
    <div className="form-field">
      <label htmlFor="country">{t('common.countrySelect.label')}</label>
      <select id="country" name="country" value={value} onChange={(e) => onChange(e.target.value)} disabled={loading}>
        <option value="">{loading ? t('common.countrySelect.loading') : t('common.countrySelect.placeholder')}</option>
        {countries.map(country => (
          <option key={country.cca2} value={country.cca2}>{country.name.common}</option>
        ))}
      </select>
    </div>
  )
}
