'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import store, { RootState } from '@/app/store'
import { updateField } from '@/app/store/slices/vacationSlice'
import { VacationState } from '@/types'

type Timestamp = {
  seconds: number
  nanoseconds: number
}

const toDateString = (timestamp: Timestamp) => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  )
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function History() {
  const router = useRouter()
  const userHistory = useSelector((state: RootState) => state.auth.history)

  const handleClick = (vacation: VacationState) => {
    console.log(vacation)
    // set vacation state in redux
    store.dispatch(updateField(vacation))
    // navigate to vacation page

    router.push('/home/planner')
  }

  return (
    <div className="container mx-auto my-6">
      <h1 className="my-4 text-3xl font-semibold text-gray-900">History</h1>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {userHistory.length > 0 &&
          userHistory.map((item, idx) => {
            const date = toDateString(item.date)
            const imageUrl = item.vacation.images[0].url

            return (
              <li key={idx} className="relative">
                <div className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <Image
                    src={imageUrl}
                    alt=""
                    className="pointer-events-none object-cover group-hover:opacity-75"
                    width={500}
                    height={500}
                  />
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                    onClick={() => handleClick(item.vacation)}
                  >
                    <span className="sr-only">
                      View details for {item.vacation.name}
                    </span>
                  </button>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  {item.vacation.name}
                </p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                  {date}
                </p>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
