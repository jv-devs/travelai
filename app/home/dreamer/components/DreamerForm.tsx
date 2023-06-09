'use client'

import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks'
import {
  getSuggestions,
  setUserInputData,
} from '@/app/store/slices/dreamerSlice'
import { fade } from '@/lib/animations'
import checkLocation from '@/lib/checkLocation'
import { UserInputData } from '@/types'

import travelSeasons from '../data/travel-seasons'
import vacationBudgets from '../data/vacation-budgets'
import vacationTypes from '../data/vacation-types'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DreamerForm({}) {
  const [validOrigin, setValidOrigin] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useAppDispatch()

  // user submits form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidOrigin(true)
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const userInputs: UserInputData = Object.fromEntries(
      formData.entries()
    ) as UserInputData
    const origin = userInputs.origin
    const originValid = await checkLocation(origin)
    if (originValid) {
      dispatch(setUserInputData(userInputs))
      dispatch(getSuggestions(userInputs))
    } else {
      setValidOrigin(false)
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      variants={fade}
      className="my-8 sm:mx-auto sm:w-full sm:max-w-md"
    >
      <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
        <h2 className="text-center text-2xl font-bold">Let&apos;s Dream</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="relative">
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
            {!validOrigin && (
              <p className="absolute text-sm font-bold text-red-600">
                * Origin not valid.
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
            {submitting ? 'Getting suggestions...' : 'Dream'}
          </button>
        </form>
      </div>
    </motion.div>
  )
}
