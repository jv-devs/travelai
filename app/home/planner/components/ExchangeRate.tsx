'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function ExchangeRate() {
  const { from, to, rate } = useSelector(
    (state: RootState) => state.vacation.exchangeRate
  )

  const stats = [
    { name: 'From', stat: from },
    { name: 'To', stat: to },
    { name: 'Rate', stat: rate },
  ]

  return (
    <div className="container mx-auto my-6 px-4 sm:px-6">
      <h2 className="pb-6 text-center text-2xl text-black text-opacity-50">
        Exchange Rate
      </h2>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
