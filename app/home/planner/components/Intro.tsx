'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import Image from 'next/image'
import Link from 'next/link'

export default function Intro() {
  const {
    localLanguage,
    currency,
    climate,
    relaxationRating,
    name,
    description,
    images,
  } = useSelector((state: RootState) => state.vacation)

  const stats = [
    { name: 'Language', value: localLanguage },
    { name: 'Currency', value: currency },
    { name: 'Climate', value: climate },
    { name: 'Relaxation rating', value: relaxationRating },
  ]

  const { url, alt, width, height, userName, user } = images[0]

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <Image
        priority
        quality={75}
        src={url}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right brightness-50 md:object-center"
      />
      <div className="absolute bottom-0 right-0 m-1 px-4 py-2 text-xs italic text-white text-opacity-50">
        <span>Image by: </span>
        <Link
          href={user}
          className="text-white text-opacity-50 underline hover:text-opacity-70"
          target="_blank"
        >
          {userName}
        </Link>
      </div>
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl tracking-tight text-white sm:text-4xl">
            Dream Destination:
            <span className="block text-4xl font-bold sm:text-6xl">{name}</span>
          </h1>
          <div className="mt-6 text-lg leading-8 text-gray-300">
            {description}
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
