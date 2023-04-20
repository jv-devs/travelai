import axios from 'axios'

export default async function getBuilderSuggestions(formData: {}) {
  const res = await axios.get(`/api/builder`, {
    params: {
      ...formData,
    },
  })
  // console.log(res.data.result)
  const suggestions = JSON.parse(res.data.result)
  return suggestions.packages
}
