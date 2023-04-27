'use client'

import { useSelector } from 'react-redux'

import { fade } from '@/lib/animations'
import { RootState } from '@/app/store'
import { motion } from 'framer-motion'

import ImageGallery from './components/ImageGallery'
import Intro from './components/Intro'
import ItineraryList from './components/ItineraryList'
import CustomLoadingAnimation from './components/CustomLoadingAnimation'
import Weather from './components/Weather'
import ExchangeRate from './components/ExchangeRate'
import LocalPhrases from './components/LocalPhrases'
import NiceToKnow from './components/NiceToKnow'
import NeedToKnow from './components/NeedToKnow'
import FunFacts from './components/FunFacts'

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
      <Intro />
      <Weather />
      <ExchangeRate />
      <LocalPhrases />
      <NiceToKnow />
      <NeedToKnow />
      <FunFacts />
      <ImageGallery />
      <ItineraryList />
    </motion.main>
  )
}
