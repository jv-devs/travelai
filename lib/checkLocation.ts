import axios from 'axios'

export default async function checkLocation(location: string) {
  const res = await axios.get(`/api/location`, {
    params: { location },
  })
  const validLocation = JSON.parse(res.data.result)
  return validLocation
}
