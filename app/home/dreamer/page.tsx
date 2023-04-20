'use client'

import { FormEvent, MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

import vacationTypes from './data/vacation-types'
import travelSeasons from './data/travel-seasons'
import vacationBudgets from './data/vacation-budgets'

import getDreamerSuggestions from '@/lib/getDreamerSuggestions'
import getVacationLocationData from '@/lib/getVacationLocationData'
import getCurrentWeather from '@/lib/getCurrentWeather'

import { fade } from '@/lib/animations'
import { setLoading, updateField } from '@/app/store/vacationSlice'
import store from '@/app/store'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dreamer() {
  const router = useRouter()
  const [results, setResults] = useState([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInputData, setUserInputData] = useState({
    origin: '',
    vacationBudget: '',
    travelSeason: '',
    vacationType: '',
  })

  // user submits form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const origin = formData.get('origin') || ''
    const vacationBudget = formData.get('vacation-budget') || ''
    const travelSeason = formData.get('travel-season') || ''
    const vacationType = formData.get('vacation-type') || ''
    const userInputs = {
      origin: origin.toString(),
      vacationBudget: vacationBudget.toString(),
      travelSeason: travelSeason.toString(),
      vacationType: vacationType.toString(),
    }
    setUserInputData(userInputs)
    setLoadingSuggestions(true)
    const suggestions = await getDreamerSuggestions(userInputs)
    setResults(suggestions)
    setLoadingSuggestions(false)
    setShowSuggestions(true)
  }

  // user chooses a location
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    const destinationPick = e.currentTarget.id
    const userChoice: UserChoiceData = {
      destination: destinationPick,
      vacationBudget: userInputData.vacationBudget,
      travelSeason: userInputData.travelSeason,
      vacationType: userInputData.vacationType,
    }
    console.log({ userChoice })

    store.dispatch(setLoading(true))
    // promise.all!!!
    const data = await getVacationLocationData(userChoice)
    console.log('data', data)
    const currentWeather = await getCurrentWeather(userChoice.destination)
    console.log('currentWeather', currentWeather)
    const vacationData = {
      ...data,
      currentWeather,
    }
    store.dispatch(updateField(vacationData))
    store.dispatch(updateField(data))
    store.dispatch(setLoading(false))

    router.push('/home/planner')
  }

  return (
    <motion.main
      className="justify-content flex flex-1 items-center bg-slate-300"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fade}
    >
      <div className="container mx-auto">
        {!showSuggestions ? (
          <motion.div
            variants={fade}
            className="my-8 sm:mx-auto sm:w-full sm:max-w-md"
          >
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
              <h2 className="text-center text-2xl font-bold">
                Let&apos;s Dream
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <label
                    htmlFor="origin"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Origin
                  </label>
                  <input
                    type="text"
                    name="origin"
                    id="origin"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Origin"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="vacation-budget"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Vacation Budget
                  </label>
                  <select
                    id="vacation-budget"
                    name="vacation-budget"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue="Canada"
                    required
                  >
                    {vacationBudgets.map((type) => {
                      return <option key={type.name}>{type.name}</option>
                    })}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="travel-season"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Travel Season
                  </label>
                  <select
                    id="travel-season"
                    name="travel-season"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue="Canada"
                    required
                  >
                    {travelSeasons.map((type) => {
                      return <option key={type.name}>{type.name}</option>
                    })}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="vacation-type"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Vacation Type
                  </label>
                  <select
                    id="vacation-type"
                    name="vacation-type"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue="Canada"
                    required
                  >
                    {vacationTypes.map((type) => {
                      return <option key={type.name}>{type.name}</option>
                    })}
                  </select>
                </div>
                <button
                  className={classNames(
                    'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    loadingSuggestions
                      ? 'cursor-not-allowed bg-indigo-300 hover:bg-indigo-300'
                      : ''
                  )}
                >
                  {loadingSuggestions ? 'Getting suggestions...' : 'Dream'}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.section variants={fade}>
            <div></div>
            <div className="py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                  <button
                    type="button"
                    className="rounded-lg bg-black bg-opacity-10 px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-opacity-20"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <span aria-hidden="true">&larr; </span>Dream Again
                  </button>
                  <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Your Dream Destinations
                  </h2>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                  Based on your input, we&apos;ve found the following
                  destinations. Choose one to receive a curated destination
                  guide and planner, filled with insider tips, must-see
                  attractions and hidden gems!
                </p>
                <ul
                  role="list"
                  className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
                >
                  {results.map((result: DreamerResult, resultIdx) => (
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
                        <p className="mt-4 text-sm leading-6 text-gray-600">
                          {result.description}
                        </p>
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
        )}
      </div>
    </motion.main>
  )
}
