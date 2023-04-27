'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function ItineraryList() {
  const activities: string[] = useSelector(
    (state: RootState) => state.vacation.activitySuggestionsList
  )
  return (
    <section className="mx-auto max-w-7xl px-6 py-5 sm:px-6 lg:px-8">
      <h2 className="pb-6 text-center text-2xl">Itinerary List</h2>
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
