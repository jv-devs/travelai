'use client'

import { motion } from 'framer-motion'

import { staggerChildren, wordAnimation } from '@/lib/animations'

type AnimatedWordsProps = {
  title: string
}

const AnimatedWords: React.FC<AnimatedWordsProps> = ({ title }) => {
  return (
    <motion.span initial="initial" animate="animate" variants={staggerChildren}>
      {title.split(' ').map((word, index) => {
        return (
          <div key={index} className="inline-block overflow-hidden">
            <motion.span
              variants={wordAnimation}
              className="inline-block overflow-hidden"
            >
              {word + '\u00A0'}
            </motion.span>
          </div>
        )
      })}
    </motion.span>
  )
}
export default AnimatedWords
