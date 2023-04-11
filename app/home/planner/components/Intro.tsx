import locationData from '../data/location'

export default function Intro() {
  return (
    <section>
      <h1>{locationData.name}</h1>
      <p>{locationData.description}</p>
      <p>{locationData.greeting}</p>
      <p>{locationData.localLanguage}</p>
    </section>
  )
}
