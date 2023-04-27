'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function LocalPhrases() {
  const phrases = useSelector((state: RootState) => state.vacation.localPhrases)
  // loop thru phrases and display them

  return (
    <div className="bg-white px-4 py-5 sm:px-6">
      <ul role="list">
        {Object.entries(phrases).map(([key, value]) => (
          // loop thru phrases and display them
          <li key={key}>{value}</li>
        ))}
      </ul>
    </div>
  )
}
