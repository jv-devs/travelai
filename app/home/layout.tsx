'use client'

import { fade } from '@/lib/animations'
import { PrivateRoute } from '../components/PrivateRoute'
import Navbar from './components/Navbar'
import { motion } from 'framer-motion'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PrivateRoute>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fade}
        className="flex flex-1 flex-col"
      >
        <Navbar />
        {children}
      </motion.div>
    </PrivateRoute>
  )
}
