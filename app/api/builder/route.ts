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

  const complete = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(origin, destination, travelSeason, vacationType),
    max_tokens: 500,
    temperature: 0,
  })

  const result = complete?.data?.choices[0]?.text || ''

  console.log(complete)

  return NextResponse.json({ result })
}

function generatePrompt(
  origin: string,
  destination: string,
  travelSeason: string,
  vacationType: string
) {
  return `Suggest 3 vacation packages along with unique activity descriptions.
Input: origin of Toronto, destination of Cancun, peak season, beach vacation
Output: {"packages": [{"name": "Budget", "activities": ["Relaxing on the beaches of Playa del Carmen", "Exploring the Mayan ruins of Tulum", "Swimming in the cenotes of the Yucatan Peninsula"]}, {"name": "Mid-Range", "activities": ["Day trip to the island of Cozumel for snorkeling and diving", "Visit to the Xplor adventure park for ziplining and underground rivers", "Relaxing on the beaches of Playa del Carmen"]}, {"name": "Luxury", "activities": ["Private yacht tour to the secluded beaches of Isla Mujeres", "Visit to the Chichen Itza archaeological site", "Relaxing on the beaches of the Riviera Maya with personalized butler service"]}] }

Input: origin of ${origin},destination of ${destination}, ${travelSeason}, ${vacationType}
Output:`
}
