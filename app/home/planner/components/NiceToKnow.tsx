'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function NiceToKnow() {
  const niceToKnow: string[] = useSelector(
    (state: RootState) => state.vacation.niceToKnow
  )
  return (
    <div className="bg-white px-4 py-5 sm:px-6">
      <h2 className="pb-6 text-center text-2xl">Nice To Know</h2>
      <ul role="list">
        {niceToKnow.map((string, idx) => (
          <li key={idx} className="px-6 py-4">
            {string}
          </li>
        ))}
      </ul>
    </div>
  )
}
