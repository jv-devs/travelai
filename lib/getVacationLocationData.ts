import { UserChoiceData } from '@/types'
import axios from 'axios'

export default async function getVacationLocationData(
  userInputs: UserChoiceData
) {
  const res = await axios.get(`/api/planner`, {
    params: {
      ...userInputs,
    },
  })
  const locationData = JSON.parse(res.data.result)
  return locationData.results
}
