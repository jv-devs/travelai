import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(new Configuration(configuration))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin') || ''
  const destination = searchParams.get('destination') || ''
  const travelSeason = searchParams.get('travelSeason') || ''
  const vacationType = searchParams.get('vacationType') || ''

  // console.log('location', location)
  // if (location.trim().length === 0) {
  //   const error = {message: 'Please enter a valid location'}
  //   return NextResponse.json({ error },{ status: 400})
  // }
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    max_tokens: 256,
    messages: [
      {
        role: 'user',
        content: generatePrompt(
          origin,
          destination,
          travelSeason,
          vacationType
        ),
      },
    ],
  })
  const result = completion?.data?.choices[0]?.message?.content || ''
  console.log(result)

  return NextResponse.json({ result })
}

function generatePrompt(
  origin: string,
  destination: string,
  travelSeason: string,
  vacationType: string
) {
  return `Suggest 3 vacation packages along with activity descriptions.
Input: origin of Toronto, destination of Cancun, peak season, beach vacation
Output:
{
  "packages": [
    {
      "name": "Budget Vacation Package",
      "activities": [
        "Snorkeling tour to the Mesoamerican Reef",
        "Access to Beach Clubs",
        "Visit to the Cancun Underwater Museum"
      ]
    },
    {
      "name": "Mid-Range Vacation Package",
      "activities": [
        "Private yacht tour to Isla Mujeres",
        "Visit to the Xcaret eco-archaeological park",
        "Access to private beach with personalized butler service"
      ]
    },
    {
      "name": "Luxury Vacation Package",
      "activities": [
        "Private yacht tour to Isla Mujeres",
        "Visit to the Xcaret eco-archaeological park",
        "Access to private beach with personalized butler service"
      ]
    }
  ]
}

Input: origin of ${origin},destination of ${destination}, ${travelSeason}, ${vacationType}
Output:`
}
