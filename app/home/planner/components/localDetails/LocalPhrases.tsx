'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

export default function LocalPhrases() {
  const phrases = useSelector((state: RootState) => state.vacation.localPhrases)
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Local Phrases
      </h3>
      <ul role="list" className="divide-y divide-gray-200">
        {Object.entries(phrases).map(([key, value]) => (
          <li key={key} className="px-6 py-4">
            {key} : {value}
          </li>
        ))}
      </ul>
    </div>
  )
}
