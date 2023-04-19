'use client'

import { fade } from '@/lib/animations'
import ImageGallery from './components/ImageGallery'
import Intro from './components/Intro'
import ItineraryList from './components/ItineraryList'
import LocalDetails from './components/LocalDetails'
import { motion } from 'framer-motion'

export default function Planner() {
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
