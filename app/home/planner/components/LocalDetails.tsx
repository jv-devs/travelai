import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

import ExchangeRate from './localDetails/ExchangeRate'
import LocalPhrases from './localDetails/LocalPhrases'
import NiceToKnow from './localDetails/NiceToKnow'
import NeedToKnow from './localDetails/NeedToKnow'
import Weather from './localDetails/Weather'
import FunFacts from './localDetails/FunFacts'
// import CurrentWeather from './localDetails/CurrentWeather'

const cards = [
  {
    title: 'Weather',
    component: <Weather />,
  },
  {
    title: 'Exchange Rate',
    component: <ExchangeRate />,
  },
  {
    title: 'Local Phrases',
    component: <LocalPhrases />,
  },
  {
    title: 'Nice To Know',
    component: <NiceToKnow />,
  },
  {
    title: 'Need To Know',
    component: <NeedToKnow />,
  },
  {
    title: 'Fun Facts',
    component: <FunFacts />,
  },
]

export default function LocalDetails() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="my-6 sm:my-12">
        <div className="mx-auto max-w-5xl rounded-lg px-6 py-12">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-center text-3xl font-bold leading-10 tracking-tight text-gray-900">
              Local Details
            </h2>
            <dl className="mt-10 space-y-6">
              {cards.map((card) => (
                <Disclosure
                  as="div"
                  key={card.title}
                  className="rounded-2xl bg-white px-10 py-6"
                >
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                          <span className="text-base font-semibold leading-7">
                            {card.title}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusSmallIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmallIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <div className="text-base leading-7 text-gray-600">
                          {card.component}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
