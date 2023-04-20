'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fade } from '@/lib/animations'

export default function Home() {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fade}
      className="h-full flex-1 bg-slate-300"
    >
      <div className="grid min-h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <div className="relative flex">
          <Image
            quality={75}
            priority
            src="/images/sean-oulashin-KMn4VEeEPR8-unsplash.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={4621}
            height={3072}
          />
          <div className="relative flex w-full flex-col items-start justify-end bg-black bg-opacity-40 p-8 sm:p-12">
            <h2 className="text-lg font-medium text-white text-opacity-75">
              Dreamer
            </h2>
            <p className="mt-1 text-2xl font-medium text-white">
              Get personalized travel suggestions based on your preferences and
              travel style.
            </p>
            <Link
              href="/home/dreamer"
              className="mt-4 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Dream Now
            </Link>
          </div>
        </div>
        <div className="relative flex">
          <Image
            quality={75}
            priority
            src="/images/heidi-kaden-kYxgm42SQso-unsplash.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={5773}
            height={4000}
          />
          <div className="relative flex w-full flex-col items-start justify-end bg-black bg-opacity-40 p-8 sm:p-12">
            <h2 className="text-lg font-medium text-white text-opacity-75">
              Builder
            </h2>
            <p className="mt-1 text-2xl font-medium text-white">
              Go straight to planner page if you already have a destination in
              mind.
            </p>
            <Link
              href="/home/builder"
              className="mt-4 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Build Now
            </Link>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
