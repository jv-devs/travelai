import { log } from "console";
import { NextResponse } from "next/server"
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(
  new Configuration(configuration)
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin') || '';
  const vacationBudget = searchParams.get('vacationBudget') || '';
  const travelSeason = searchParams.get('travelSeason') || '';
  const vacationType = searchParams.get('vacationType') || '';

  // console.log('location', location)
  // if (location.trim().length === 0) {
  //   const error = {message: 'Please enter a valid location'}
  //   return NextResponse.json({ error },{ status: 400})
  // }
  const completion = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        max_tokens: 256,
        messages: [
          {
            role: 'user',
            content: generatePrompt(origin, vacationBudget,travelSeason, vacationType),
          },
        ],
      })
  const result = completion?.data?.choices[0]?.message?.content || '';
  console.log(result);
  
  return NextResponse.json({ result })
}

function generatePrompt(origin: string, vacationBudget: string, travelSeason: string, vacationType: string) {
  return `Suggest 3 destinations along with descriptions (under 20 words).

Input: origin of Toronto luxury budget, peak season, beach vacation
Output:
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

Input: origin of ${origin}, ${vacationBudget} budget, ${travelSeason}, ${vacationType}
Output:`
}
