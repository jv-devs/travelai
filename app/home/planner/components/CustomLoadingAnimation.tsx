import React, { useEffect } from 'react'
import { vacationFacts } from '../data/vacationFacts'
import { loadingMessages } from '../data/loadingMessages'

const getRandomString = (array: string[]) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export default function CustomLoadingAnimation() {
  const [randomFact, setRandomFact] = React.useState('')
  const [randomLoadingMessage, setRandomLoadingMessage] = React.useState('')

  useEffect(() => {
    const fact = getRandomString(vacationFacts)
    const message = getRandomString(loadingMessages)

    setRandomFact(fact)
    setRandomLoadingMessage(message)
  }, [])

  return (
    <div className="flex h-full items-center justify-center bg-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Loader and Message */}
        <div className="mx-auto max-w-xl rounded px-6 py-4">
          <p className="text-2xl">{randomLoadingMessage}...</p>
          <div className="mt-4 flex items-center justify-center">
            <svg
              className="-ml-1 mr-3 h-32 w-32 animate-spin text-slate-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </div>
        </div>
        {/* Fact Component */}
        <div className="mx-auto max-w-xl rounded bg-white bg-opacity-30 px-6 py-4">
          <h2 className="text-center italic">Did you know...</h2>
          <p className="mt-2 text-sm">{randomFact}</p>
        </div>
      </div>
    </div>
  )
}
