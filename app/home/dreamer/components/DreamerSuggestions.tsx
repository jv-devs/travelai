'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { useSelector } from 'react-redux'

import store, { RootState } from '@/app/store'
import { setShowSuggestions } from '@/app/store/slices/dreamerSlice'
import { getVacation } from '@/app/store/slices/vacationSlice'
import { fade } from '@/lib/animations'
import { DreamerResult, UserChoiceData } from '@/types'

export default function DreamerSuggestions() {
  const router = useRouter()
  const { dreamerResults, userInputData } = useSelector(
    (state: RootState) => state.dreamer
  )

  // user chooses a location
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    const destinationPick = e.currentTarget.id
    const userChoice: UserChoiceData = {
      destination: destinationPick,
      vacationBudget: userInputData.vacationBudget,
      travelSeason: userInputData.travelSeason,
      vacationType: userInputData.vacationType,
    }
    store.dispatch(getVacation(userChoice))
    router.push('/home/planner')
  }

  // user returns to form
  const handleReturnClick = () => {
    store.dispatch(setShowSuggestions(false))
  }

  return (
    <motion.section variants={fade}>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <button
              type="button"
              className="rounded-lg bg-black bg-opacity-10 px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-opacity-20"
              onClick={handleReturnClick}
            >
              <span aria-hidden="true">&larr; </span>Dream Again
            </button>
            <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Your Dream Destinations
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Based on your input, we&apos;ve found the following destinations.
            Choose one to receive a curated destination guide and planner,
            filled with insider tips, must-see attractions and hidden gems!
          </p>
          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {dreamerResults.map((result: DreamerResult, resultIdx) => (
              <li
                key={resultIdx}
                className="col-span-1 flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-white text-center shadow"
              >
                <div className="flex flex-1 flex-col items-center justify-center p-8">
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      id={result.id}
                      className="text-lg font-semibold leading-8 text-gray-900"
                    >
                      {`${resultIdx + 1}. ${result.name}`}
                    </h3>
                  </div>
                  <div className="mt-4 text-sm leading-6 text-gray-600">
                    {result.description}
                  </div>
                </div>
                <Link
                  href="/home/planner"
                  id={result.name}
                  aria-describedby={result.name}
                  className="relative -mr-px inline-flex w-full flex-none items-center justify-center gap-x-3 rounded-bl-lg border border-transparent bg-slate-100 py-4 text-sm font-semibold text-indigo-600 hover:bg-slate-300"
                  onClick={handleClick}
                >
                  Choose {result.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  )
}
