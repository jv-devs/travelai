'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function FunFacts() {
  const funFacts: string[] = useSelector(
    (state: RootState) => state.vacation.funFacts
  )
  return (
    <div className="bg-white px-4 py-5 sm:px-6">
      <h2 className="pb-6 text-center text-2xl">Fun Facts</h2>
      <ul role="list">
        {funFacts.map((string, idx) => (
          <li key={idx} className="px-6 py-4">
            {string}
          </li>
        ))}
      </ul>
    </div>
  )
}
