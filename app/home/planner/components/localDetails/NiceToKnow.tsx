'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

export default function NiceToKnow() {
  const niceToKnow: string[] = useSelector(
    (state: RootState) => state.vacation.niceToKnow
  )
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Nice to Know
      </h3>
      <ul role="list" className="divide-y divide-gray-200">
        {niceToKnow.map((string, idx) => (
          <li key={idx} className="px-6 py-4">
            {string}
          </li>
        ))}
      </ul>
    </div>
  )
}