'use client'

// import getGreeting from '@/lib/getGreeting'
import { FormEvent, useState } from 'react'

import vacationTypes from './data/vacation-types'
import travelSeasons from './data/travel-seasons'
import vacationBudgets from './data/vacation-budgets'

import { motion } from 'framer-motion'
import { fade } from '@/lib/animations'
import store from '@/app/store'
import { getVacation } from '@/app/store/slices/vacationSlice'
import { useRouter } from 'next/navigation'
import checkLocation from '@/lib/checkLocation'
import { UserChoiceData } from '@/types'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Builder() {
  const [validDestination, setValidDestination] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidDestination(true)
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const userChoice = Object.fromEntries(formData.entries()) as UserChoiceData
    console.log('userChoice: ', userChoice)
    const destination = userChoice.destination

    const destinationValid = await checkLocation(destination)
    if (destinationValid) {
      store.dispatch(getVacation(userChoice))
      router.push('/home/planner')
    } else {
      setValidDestination(false)
      setSubmitting(false)
    }
  }

  return (
    <motion.main
      className="justify-content flex flex-1 items-center bg-builder bg-cover bg-center"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fade}
    >
      <div className="container mx-auto">
        <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-center text-2xl">Builder</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Destination"
                  required
                />
                {!validDestination && (
                  <p className="text-sm font-bold text-red-600">
                    * Destination not valid.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="vacationBudget"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Vacation Budget
                </label>
                <select
                  id="vacationBudget"
                  name="vacationBudget"
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
                  htmlFor="travelSeason"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Travel Season
                </label>
                <select
                  id="travelSeason"
                  name="travelSeason"
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
                  htmlFor="vacationType"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Vacation Type
                </label>
                <select
                  id="vacationType"
                  name="vacationType"
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
                  submitting
                    ? 'cursor-not-allowed bg-indigo-300 hover:bg-indigo-300'
                    : ''
                )}
              >
                {submitting ? 'Departing...' : 'Build'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
