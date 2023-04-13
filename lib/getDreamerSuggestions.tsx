import axios from 'axios'

export default async function getDreamerSuggestions(formData: {}) {
  const res = await axios.get(`/api/dreamer`, {
    params: {
      ...formData,
    },
  })
  const suggestions = JSON.parse(res.data.result)
  return suggestions.results
}
