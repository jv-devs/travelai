import Link from 'next/link'

export default function TokenLimitReached() {
  return (
    <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-center text-2xl font-bold">Daily Tokens Used!</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You have used all of your daily tokens. Please come back tomorrow to
          continue dreaming.
        </p>
        <div className="mt-6">
          <Link
            href="/home/history"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  )
}
