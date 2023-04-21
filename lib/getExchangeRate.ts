import axios from 'axios'

export default async function getExchangeRate(currency: string) {
  const res = await axios.get(`/api/exchangeRate?currency=${currency}`)
  const exchangeRate = res.data
  return exchangeRate
}
