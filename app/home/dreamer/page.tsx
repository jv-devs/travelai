'use client'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { fade } from '@/lib/animations'

import TokenLimitReached from '../components/TokenLimitReached'
import DreamerForm from './components/DreamerForm'
import DreamerSuggestions from './components/DreamerSuggestions'

export default function Dreamer() {
  const showSuggestions = useSelector(
    (state: RootState) => state.dreamer.showSuggestions
  )

  // Check if the user has used all of their tokens
  const tokenCount = useSelector((state: RootState) => state.auth.tokensUsed)
  const tokenLimit = useSelector((state: RootState) => state.appState.maxTokens)
  // if (tokenCount >= tokenLimit) {
  if (true) {
    return <TokenLimitReached />
  }

  return (
    <motion.main
      className="justify-content flex flex-1 items-center bg-dreamer bg-cover bg-center"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fade}
    >
      <div className="container mx-auto">
        {!showSuggestions ? <DreamerForm /> : <DreamerSuggestions />}
      </div>
    </motion.main>
  )
}
