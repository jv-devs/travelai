'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

export default function ItineraryList() {
  const activities: string[] = useSelector(
    (state: RootState) => state.vacation.activitySuggestionsList
  )
  return (
    <section className="mx-auto max-w-7xl px-6 py-5 sm:px-6 lg:px-8">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Itinerary List
      </h3>
      <ul role="list">
        {activities.map((string, idx) => (
          <li key={idx} className="px-6 py-4">
            {string}
          </li>
        ))}
      </ul>
    </section>
  )
}
