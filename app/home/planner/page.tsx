'use client'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { fade } from '@/lib/animations'

import CustomLoadingAnimation from './components/CustomLoadingAnimation'
import ExchangeRate from './components/ExchangeRate'
import ImageGallery from './components/ImageGallery'
import Intro from './components/Intro'
import LocalPhrases from './components/LocalPhrases'
import PlannerList from './components/PlannerList'
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
        <PlannerList
          listName="activitySuggestionsList"
          listTitle="Itinerary List"
        />
        <PlannerList listName="needToKnow" listTitle="Need To Know" />
        <PlannerList listName="niceToKnow" listTitle="Nice To Know" />
        <PlannerList listName="funFacts" listTitle="Fun Facts" />
        <ImageGallery />
      </div>
    </motion.main>
  )
}
