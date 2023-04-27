import axios from 'axios'

import { UserChoiceData } from '@/types'

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
