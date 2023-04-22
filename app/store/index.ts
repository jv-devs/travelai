import { configureStore } from '@reduxjs/toolkit'

import vacationReducer from './slices/vacationSlice'

const store = configureStore({
  reducer: {
    vacation: vacationReducer,
  },
})

store.subscribe(() => console.log(store.getState()))

export default store
