'use client'

// import getGreeting from '@/lib/getGreeting'
import { FormEvent } from 'react'
import vacationTypes from './data/vacation-types'

export default function Home() {
  // const [result, setResult] = useState('')
  // const [userInput, setUserInput] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const formData = new FormData(e.currentTarget)
    // const origin = formData.get('origin')
    // const budget = formData.get('budget')
    // const groupSize = formData.get('group-size')
    // const vacationType = formData.get('vacation-type')

    // const greeting: any = await getGreeting(userInput)
    // setResult(greeting)
  }

  return (
    <main className="flex-1 bg-slate-300">
      <div className="container mx-auto">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-center text-2xl">Dreamer</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
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
                  placeholder="origin"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Budget
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="budget"
                    id="budget"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    aria-describedby="budget-currency"
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      USD
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="group-size"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Group Size
                </label>
                <input
                  type="number"
                  name="group-size"
                  id="group-size"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="number of people"
                  required
                />
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
                    return <option key={type}>{type}</option>
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
      {/* <div>{result}</div> */}
    </main>
  )
}
