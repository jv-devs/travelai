'use client'

import { useSelector } from 'react-redux'

import { fade } from '@/lib/animations'
import ImageGallery from './components/ImageGallery'
import Intro from './components/Intro'
import ItineraryList from './components/ItineraryList'
import LocalDetails from './components/LocalDetails'
import { motion } from 'framer-motion'
import CustomLoadingAnimation from './components/CustomLoadingAnimation'
import { RootState } from '@/app/store'

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
      <LocalDetails />
      <ImageGallery />
      <ItineraryList />
    </motion.main>
  )
}
