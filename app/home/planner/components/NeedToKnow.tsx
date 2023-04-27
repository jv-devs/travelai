'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function NeedToKnow() {
  const needToKnow: string[] = useSelector(
    (state: RootState) => state.vacation.needToKnow
  )
  return (
    <div className="bg-white px-4 py-5 sm:px-6">
      <h2 className="pb-6 text-center text-2xl">Need To Know</h2>
      <ul role="list">
        {needToKnow.map((string, idx) => (
          <li key={idx} className="px-6 py-4">
            {string}
          </li>
        ))}
      </ul>
    </div>
  )
}
