import axios from 'axios'

export default async function getLocationImages(location: string) {
  const res = await axios.get(`/api/image?location=${location}`)
  const images = res.data
  return images
}
