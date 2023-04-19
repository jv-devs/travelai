'use client'

// import getGreeting from '@/lib/getGreeting'
import { FormEvent, MouseEvent, useState } from 'react'
import vacationTypes from './data/vacation-types'
import travelSeasons from './data/travel-seasons'
import vacationBudgets from './data/vacation-budgets'
import getDreamerSuggestions from '@/lib/getDreamerSuggestions'
import getVacationLocationData from '@/lib/getVacationLocationData'
import { useRouter } from 'next/navigation'
import { updateField } from '@/app/store/vacationSlice'
import store from '@/app/store'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fade } from '@/lib/animations'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dreamer() {
  const router = useRouter()
  const [results, setResults] = useState([])
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
    const suggestions = await getDreamerSuggestions(userInputs)
    setResults(suggestions)
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

    const data = await getVacationLocationData(userChoice)
    console.log('data', data)

    store.dispatch(updateField(data))
    router.push('/home/planner')
  }

  return (
    <motion.main
      className="flex-1 bg-slate-300"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fade}
    >
      <div className="container mx-auto">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-center text-2xl">Dreamer</h2>
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
              <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <section>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Dream Locations
              </h2>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
              Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
              quasi iusto modi velit ut non voluptas in. Explicabo id ut
              laborum.
            </p>
            <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {results.map((result: DreamerResult, resultIdx) => (
                <div
                  key={resultIdx}
                  className={classNames(
                    result.mostPopular
                      ? 'lg:z-10 lg:rounded-b-none'
                      : 'lg:mt-8',
                    resultIdx === 0 ? 'lg:rounded-r-none' : '',
                    resultIdx === results.length - 1 ? 'lg:rounded-l-none' : '',
                    'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-x-4">
                      <h3
                        id={result.id}
                        className={classNames(
                          result.mostPopular
                            ? 'text-indigo-600'
                            : 'text-gray-900',
                          'text-lg font-semibold leading-8'
                        )}
                      >
                        {result.name}
                      </h3>
                      {result.mostPopular ? (
                        <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                          Most popular
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {result.description}
                    </p>
                  </div>
                  <Link
                    href="/home/planner"
                    id={result.name}
                    // aria-describedby={result.id}
                    className={classNames(
                      result.mostPopular
                        ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                        : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                      'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    )}
                    onClick={handleClick}
                  >
                    Create {result.name} Dream
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
