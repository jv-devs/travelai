'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function TokenDisplay() {
  const maxTokens = useSelector((state: RootState) => state.appState.maxTokens)
  const currentTokens = useSelector((state: RootState) => state.auth.tokensUsed)

  // conditionally style the token display based on the number of tokens used
  const tokenDisplayColor =
    currentTokens > maxTokens * 0.8
      ? 'text-orange-500'
      : currentTokens >= maxTokens
      ? 'text-red-500'
      : 'text-green-500'

  return (
    <div
      className="cursor-default rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label="Daily Tokens"
      title="Daily Tokens"
    >
      <span className="sr-only">Daily Tokens</span>
      <span>
        <span className="hidden lg:inline-block">Tokens: </span>
        <span className={tokenDisplayColor}>
          {currentTokens}/{maxTokens}
        </span>
      </span>
    </div>
  )
}
