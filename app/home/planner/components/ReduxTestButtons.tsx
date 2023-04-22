import { updateField } from '@/app/store/slices/vacationSlice'
import store from '@/app/store'

export default function ReduxTestButtons() {
  const handleClick = () => {
    store.dispatch(updateField({ localLanguage: 'English' }))
  }
  const handleClick2 = () => {
    store.dispatch(updateField({ relaxationRating: 10 }))
  }

  const handleClick3 = () => {
    store.dispatch(updateField({ localLanguage: 'French' }))
  }
  return (
    <div className="flex gap-4">
      <button className="bg-white" onClick={handleClick}>
        English
      </button>
      <button className="bg-white" onClick={handleClick2}>
        Rating
      </button>
      <button className="bg-white" onClick={handleClick3}>
        French
      </button>
    </div>
  )
}
