'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

import { fade } from '@/lib/animations'
import ImageGallery from './components/ImageGallery'
import Intro from './components/Intro'
import ItineraryList from './components/ItineraryList'
import LocalDetails from './components/LocalDetails'
import { motion } from 'framer-motion'
import CustomLoadingAnimation from './components/CustomLoadingAnimation'

export default function Planner() {
  const { loading } = useSelector((state: RootState) => state.vacation)
  if (loading) {
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
