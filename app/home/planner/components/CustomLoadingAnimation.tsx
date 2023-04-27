import Image from 'next/image'
import React, { useEffect } from 'react'

import { loadingMessages } from '../data/loadingMessages'
import { vacationFacts } from '../data/vacationFacts'

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
    <div className="flex h-full items-center justify-center bg-theme-750">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center text-white sm:px-6 lg:px-8">
        {/* Loader and Message */}
        <div className="mx-auto max-w-xl rounded px-6 py-4">
          <div className="text-2xl">{randomLoadingMessage}...</div>
          <div className="mt-4 flex w-full items-center justify-center">
            <Image
              src="/plane-loader.gif"
              alt="Plane Loader"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
        </div>
        {/* Fact Component */}
        <div className="mx-auto max-w-xl rounded bg-white bg-opacity-20 px-6 py-4">
          <h2 className="text-center italic">Did you know...</h2>
          <div className="mt-2 text-sm">{randomFact}</div>
        </div>
      </div>
    </div>
  )
}
