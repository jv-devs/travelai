import axios from 'axios'

// build out type/interface for parameter

export default async function getVacationLocationData(userInputs: UserChoiceData) {
  const res = await axios.get(`/api/planner`, {
    params: {
      ...userInputs,
    },
  })
  console.log(res.data.result)
  const locationData = JSON.parse(res.data.result)
  return locationData.results
}
