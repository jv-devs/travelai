import axios from 'axios'

export default async function checkOrigin(origin: string) {
  const res = await axios.get(`/api/origin`, {
    params: { origin },
  })
  const validOrigin = JSON.parse(res.data.result)
  return validOrigin
}
