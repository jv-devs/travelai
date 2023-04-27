'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

// function that capitalizes all words in string
function capitalize(str: string) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

export default function LocalPhrases() {
  const phrases = useSelector((state: RootState) => state.vacation.localPhrases)
  // loop thru phrases and display them

  return (
    <div>
      <h2 className="pb-6 text-center text-2xl">Local Phrases</h2>
      <div className="container mx-auto rounded-lg bg-white px-4 py-5 sm:px-6">
        <ul role="list" className="flex flex-wrap justify-center">
          {Object.entries(phrases).map(([key, value], idx) => (
            // loop thru phrases and display them
            <li key={idx} className="mx-8 my-2 min-w-max flex-1 text-center">
              <div className="text-2xl font-bold">{capitalize(value)}</div>
              <div className="text-lg text-gray-500">{capitalize(key)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
