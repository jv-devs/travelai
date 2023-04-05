import { Configuration, OpenAIApi } from 'openai'

export default async function getGreeting(location: string): Promise<string> {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: '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',
    })
  )

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: generatePrompt(location) }],
    temperature: 0,
  })

  const message: string = response.data?.choices[0]?.message?.content || ''

  return message
}

function generatePrompt(userInput: string) {
  return `
  Say hi in the native language of this destination: ${userInput}
  `
}
