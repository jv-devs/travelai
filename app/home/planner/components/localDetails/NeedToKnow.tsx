import store from '@/app/store'

const needToKnow: string[] = store.getState().vacation.needToKnow

export default function NiceToKnow() {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Need To Know
      </h3>
      <ul role="list" className="divide-y divide-gray-200">
        {needToKnow.map((string, idx) => (
          <li key={idx} className="px-6 py-4">
            {string}
          </li>
        ))}
      </ul>
    </div>
  )
}
