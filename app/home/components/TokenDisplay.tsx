'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function TokenDisplay() {
  const maxTokens = useSelector((state: RootState) => state.appState.maxTokens)
  const currentTokens = useSelector((state: RootState) => state.auth.tokensUsed)
  return (
    <div
      className="cursor-default rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      title="[Tokens Used] / [Daily Tokens]"
    >
      <span className="sr-only">Daily Tokens</span>
      <span>
        <span className="hidden lg:inline-block">Tokens:</span> {currentTokens}/
        {maxTokens}
      </span>
    </div>
  )
}
