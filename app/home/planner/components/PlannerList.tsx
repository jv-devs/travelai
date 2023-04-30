import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { VacationArrayKey } from '@/types'

interface Props {
  listName: VacationArrayKey
  listTitle: string
}

export default function PlannerList({ listName, listTitle }: Props) {
  const list: string[] = useSelector(
    (state: RootState) => state.vacation[listName]
  )

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <h2 className="pb-6 text-center text-2xl text-black text-opacity-50">
        {listTitle}
      </h2>
      <ul className="rounded-lg bg-white py-5">
        {list.map((item, idx) => {
          return (
            <li key={idx} className="px-6 py-3">
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
