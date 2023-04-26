import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(new Configuration(configuration))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin') || ''

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(origin),
    max_tokens: 500,
    temperature: 0,
  })

  const result = completion?.data?.choices[0]?.text?.trim() || 'false'

  return NextResponse.json({ result })
}

function generatePrompt(origin: string) {
  return `Determine if the location exists on Earth. Ignore diacritics but spelling should be correct.
  Example Input: Voëlklip 
  Example Output: true
  Example Input: Voelklip 
  Example Output: true
  Example Input: Göoteeborg 
  Example Output: false
  Example Input: kgsdfjsdmg$fb324324 
  Example Output: false
  Input: ${origin}
  Output:
`
}
