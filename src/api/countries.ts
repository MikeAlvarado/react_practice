import type { CountryTy } from '../types/countryTypes'

export const getCountries = async (): Promise<CountryTy[]> => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,area,currencies,timezones,flags')
    const data: CountryTy[] = await response.json()
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common))
  } catch (error) {
    console.error('Error fetching countries:', error)
    return []
  }
}