'use client'

import getGreeting from '@/lib/getGreeting'
import { FormEvent, useState } from 'react'

export default function Home() {
  const [result, setResult] = useState('')
  const [userInput, setUserInput] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('click')

    const greeting = await getGreeting(userInput)

    setResult(greeting)
  }

  return (
    <main>
      <h1 className="bold text-xl">Travel App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Where do you want to travel?
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border-2 border-black"
          />
        </label>
        <button>Submit</button>
      </form>
      <div>{result}</div>
    </main>
  )
}
