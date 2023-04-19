import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

export default function CurrentWeather() {
  const { temp, conditions, humidity, wind, daylightHours } = useSelector(
    (state: RootState) => state.vacation.currentWeather
  )
  const stats = [
    { name: 'Conditions', value: conditions },
    { name: 'Temperature', value: temp, unit: '℃' },
    { name: 'Humidity', value: humidity, unit: '%' },
    { name: 'Wind', value: wind, unit: 'm/s' },
    { name: 'Daylight', value: daylightHours, unit: 'h' },
  ]
  return (
    <div className="rounded-md bg-gray-900 p-1">
      <div className="mx-auto max-w-7xl">
        <h3 className="p-4 text-base font-semibold leading-6 text-white">
          Current Weather
        </h3>
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8"
            >
              <p className="text-sm font-medium leading-6 text-gray-400">
                {stat.name}
              </p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {stat.value}
                </span>
                {stat.unit ? (
                  <span className="text-sm text-gray-400">{stat.unit}</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
