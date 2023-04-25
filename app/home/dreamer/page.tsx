'use client'

import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import DreamerForm from './components/DreamerForm'
import DreamerSuggestions from './components/DreamerSuggestions'

import { fade } from '@/lib/animations'
import { RootState } from '@/app/store'

export default function Dreamer() {
  const showSuggestions = useSelector(
    (state: RootState) => state.dreamer.showSuggestions
  )

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
