import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(new Configuration(configuration))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const destination = searchParams.get('destination') || ''
  const vacationBudget = searchParams.get('vacationBudget') || ''
  const travelSeason = searchParams.get('travelSeason') || ''
  const vacationType = searchParams.get('vacationType') || ''

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(
      destination,
      vacationBudget,
      travelSeason,
      vacationType
    ),
    max_tokens: 2000,
    temperature: 0,
  })

  const result = completion?.data?.choices[0]?.text || ''

  return NextResponse.json({ result })
}

function generatePrompt(
  destination: string,
  vacationBudget: string,
  travelSeason: string,
  vacationType: string
) {
  return `
Example Input: Cancun, Mexico, mid-range budget, peak season, beach vacation
Example Output: {"results":{"name":"Cancun, Mexico","description":"Beaches, palm trees and tequila","weather":{"temperature":"27°C","conditions":"Sunny","humidity":"75%"},"needToKnow":["Bring sunscreen and insect repellent","Drink bottled water","Be careful when swimming in the ocean"],"niceToKnow":["Tipping is expected in restaurants","Try the local street food","Take a day trip to the Mayan ruins of Chichen Itza"],"localPhrases":{"hello":"Hola","goodbye":"Adiós","thank you":"Gracias","please":"Por favor"},"activitySuggestionsList":["Snorkeling in the coral reefs","Visiting Xcaret eco-archaeological park","Exploring the Isla Mujeres","Enjoying the nightlife in the Hotel Zone"],"funFacts":["Cancun was originally a small fishing village before becoming a popular tourist destination.","Cancun's hotel zone is shaped like the number 7.","The Cancun Underwater Museum has over 500 submerged sculptures."],"localLanguage":"Spanish","climate":"Tropical","currency":"Mexican Peso","currencyCode":"MXN","relaxationRating":"8"}}
User Input: ${destination}, ${vacationBudget} budget, ${travelSeason}, ${vacationType}
User Output:`
}
