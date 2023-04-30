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
    <div>
      <h2 className="pb-6 text-center text-2xl">{listTitle}</h2>
      <ul className="container mx-auto rounded-lg bg-white px-4 py-5 sm:px-6">
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
