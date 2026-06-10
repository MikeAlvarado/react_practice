export type CountryTy = {
  name: {
    common: string
  }
  cca2: string
  area: number
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  flags: {
    alt: string
    svg: string
  }
  timezones: string[]
}