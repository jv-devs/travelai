import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(new Configuration(configuration))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  console.log('search params: ', searchParams)
  const origin = searchParams.get('origin') || ''
  const vacationBudget = searchParams.get('vacationBudget') || ''
  const travelSeason = searchParams.get('travelSeason') || ''
  const vacationType = searchParams.get('vacationType') || ''

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(origin, vacationBudget, travelSeason, vacationType),
    max_tokens: 500,
    temperature: 0,
  })

  const result = completion?.data?.choices[0]?.text || ''

  return NextResponse.json({ result })
}

function generatePrompt(
  origin: string,
  vacationBudget: string,
  travelSeason: string,
  vacationType: string
) {
  return `Suggest 3 destinations along with descriptions (under 20 words) for user input.

Example Input: origin of Toronto luxury budget, peak season, beach vacation
Example Output:
{
  "results": [
    {
      "name": "Cancun, Mexico",
      "description": "White sand beaches and crystal clear waters"
    },
    {
      "name": "Maldives",
      "description": "Luxury overwater bungalows and stunning coral reefs"
    },
    {
      "name": "Barbados",
      "description": "Beautiful beaches and vibrant nightlife"
    }
  ]
}

User Input: origin of ${origin}, ${vacationBudget} budget, ${travelSeason}, ${vacationType}
User Output:
`
}
