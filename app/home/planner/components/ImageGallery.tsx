import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const newSlide = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newSlide)
  }

  const nextSlide = () => {
    const newSlide = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newSlide)
  }

  const images = useSelector((state: RootState) => state.vacation.images)

  const { url, alt, width, height, userName, user } = images[currentIndex]
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="pb-6 text-center text-2xl">Image Gallery</h2>
      <div className="relative mx-4 my-5 sm:mx-6">
        <Image
          priority
          quality={75}
          src={url}
          alt={alt}
          width={width}
          height={height}
          className="h-96 rounded-lg object-cover object-center"
        />
        <div className="absolute bottom-4 right-4 m-1 px-4 py-2 text-xs italic text-white text-opacity-50">
          <span>Image by: </span>
          <Link
            href={user}
            className="text-white text-opacity-50 underline hover:text-opacity-80"
            target="_blank"
          >
            {userName}
          </Link>
        </div>
        <button
          className="gap- absolute left-4 top-1/2 flex -translate-y-1/2 transform text-2xl focus:outline-none"
          onClick={prevSlide}
          aria-label="previous slide"
        >
          <FaChevronLeft className="-mr-3 text-white" />
          <FaChevronLeft />
        </button>
        <button
          className="absolute right-4 top-1/2 flex -translate-y-1/2 transform text-2xl focus:outline-none"
          onClick={nextSlide}
          aria-label="next slide"
        >
          <FaChevronRight />
          <FaChevronRight className="-ml-3 text-white" />
        </button>
      </div>
    </div>
  )
}
