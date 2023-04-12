import locationData from '../../data/location'

const funFacts: string[] = locationData.funFacts

export default function FunFacts() {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Fun Facts
      </h3>
      <ul role="list" className="divide-y divide-gray-200">
        {funFacts.map((string, idx) => (
          <li key={idx} className="px-6 py-4">
            {string}
          </li>
        ))}
      </ul>
    </div>
  )
}
