import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(new Configuration(configuration))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  // console.log('searchparams', searchParams)
  const location = searchParams.get('location') || ''
  // console.log('location', location)
  if (location.trim().length === 0) {
    const error = { message: 'Please enter a valid location' }
    return NextResponse.json({ error }, { status: 400 })
  }
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: generatePrompt(location),
      },
    ],
  })
  const result = completion?.data?.choices[0]?.message?.content || ''
  return NextResponse.json({ result })
}

function generatePrompt(userInput: string) {
  return `Greet me in a language native to ${userInput}`
}
