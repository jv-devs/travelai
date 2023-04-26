import axios from 'axios'

export default async function getGreeting(location: string) {
  const res = await axios.get(`/api/greeting?location=${location}`)
  const greeting = res.data.result
  return greeting
}
