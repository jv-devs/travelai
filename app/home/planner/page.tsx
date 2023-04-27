'use client'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { fade } from '@/lib/animations'

import CustomLoadingAnimation from './components/CustomLoadingAnimation'
import ExchangeRate from './components/ExchangeRate'
import FunFacts from './components/FunFacts'
import ImageGallery from './components/ImageGallery'
import Intro from './components/Intro'
import ItineraryList from './components/ItineraryList'
import LocalPhrases from './components/LocalPhrases'
import NeedToKnow from './components/NeedToKnow'
import NiceToKnow from './components/NiceToKnow'
import Weather from './components/Weather'

export default function Planner() {
  const loadingPlanner = useSelector(
    (state: RootState) => state.appState.loadingPlanner
  )
  if (loadingPlanner) {
    return <CustomLoadingAnimation />
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fade}
    >
      <div className="my-6 flex flex-col gap-6 first:mt-0">
        <Intro />
        <Weather />
        <ExchangeRate />
        <LocalPhrases />
        <NiceToKnow />
        <NeedToKnow />
        <FunFacts />
        <ImageGallery />
        <ItineraryList />
      </div>
    </motion.main>
  )
}
