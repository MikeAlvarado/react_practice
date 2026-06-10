import {useEffect, useState} from 'react'
import type { CountryTy } from '../types/countryTypes'
import {getCountries} from '../api/countries'

export const useCountries = () => {
  const [countries, setCountries] = useState<CountryTy[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries()
      setCountries(data)
      setLoading(false)
    }
    fetchCountries()
  }, [])

  return {countries, loading}
}