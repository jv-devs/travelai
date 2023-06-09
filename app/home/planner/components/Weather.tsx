'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function Weather() {
  const { temperature, conditions, humidity } = useSelector(
    (state: RootState) => state.vacation.weather
  )
  const stats = [
    { id: 1, name: 'Temperature', value: temperature },
    { id: 2, name: 'Conditions', value: conditions },
    { id: 3, name: 'Humidity', value: humidity },
  ]
  return (
    <div className="py-12 sm:py-24">
      <h2 className="pb-6 text-center text-2xl text-black text-opacity-50">
        Weather
      </h2>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <div className="text-base leading-7 text-gray-600">
                {stat.name}
              </div>
              <div className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
