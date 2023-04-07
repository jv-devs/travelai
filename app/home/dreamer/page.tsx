'use client'

// import getGreeting from '@/lib/getGreeting'
import { FormEvent, useState } from 'react'
import vacationTypes from './data/vacation-types'
import travelSeasons from './data/travel-seasons'
import vacationBudgets from './data/vacation-budgets'
import getDreamerSuggestions from '@/lib/getDreamerSuggestions'

export default function Home() {
  const [result, setResult] = useState([])
  // const [userInput, setUserInput] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const origin = formData.get('origin')
    const vacationBudget = formData.get('vacation-budget')
    const travelSeason = formData.get('travel-season')
    const vacationType = formData.get('vacation-type')
    const suggestions = await getDreamerSuggestions({
      origin,
      vacationBudget,
      travelSeason,
      vacationType,
    })

    // const greeting: any = await getGreeting(userInput)
    setResult(suggestions)
  }

  return (
    <main className="flex-1 bg-slate-300">
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
      <div>
        {Array.isArray(result) &&
          result.map((result: DreamerResult) => {
            return (
              <div key={result.name}>
                <h3>{result.name}</h3>
                <p>{result.description}</p>
              </div>
            )
          })}
      </div>
    </main>
  )
}
