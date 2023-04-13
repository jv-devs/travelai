import { configureStore } from '@reduxjs/toolkit'
import vacationReducer from './vacationSlice'

const store = configureStore({
  reducer: {
    vacation: vacationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
