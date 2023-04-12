import ExchangeRate from './localDetails/ExchangeRate'
import LocalPhrases from './localDetails/LocalPhrases'
import NiceToKnow from './localDetails/NiceToKnow'
import NeedToKnow from './localDetails/NeedToKnow'
import Weather from './localDetails/Weather'
import FunFacts from './localDetails/FunFacts'

export default function LocalDetails() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <Weather />
      <ExchangeRate />
      <LocalPhrases />
      <NiceToKnow />
      <NeedToKnow />
      <FunFacts />
    </section>
  )
}
