import axios from 'axios'
import getDaylightHours from './getDaylightHours'

export default async function getCurrentWeather(location: string) {
  const res = await axios.get(`/api/weather`, {
    params: {
      location,
    },
  })

  const rawData = res.data

  const sunriseUnix = rawData.sunrise
  const sunsetUnix = rawData.sunset
  const daylightHours = getDaylightHours(sunriseUnix,sunsetUnix)
  console.log('daylightHours type: ', typeof daylightHours);
  

  const currentWeather = {
    ...rawData,
    daylightHours
  }
  delete currentWeather.sunrise
  delete currentWeather.sunset

  console.log('CURRENT WEATHER: ', currentWeather);
  
  return currentWeather
}
