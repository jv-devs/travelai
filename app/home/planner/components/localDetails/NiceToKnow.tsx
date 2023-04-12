import locationData from '../../data/location'

const niceToKnow: string[] = locationData.niceToKnow

export default function NiceToKnow() {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Nice to Knows
      </h3>
      <ul role="list" className="divide-y divide-gray-200">
        {niceToKnow.map((string, idx) => (
          <li key={idx} className="px-6 py-4">
            {string}
          </li>
        ))}
      </ul>
    </div>
  )
}
