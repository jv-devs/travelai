import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import appStateReducer from './slices/appStateSlice'
import authReducer from './slices/authSlice'
import dreamerReducer from './slices/dreamerSlice'
import vacationReducer from './slices/vacationSlice'

const store = configureStore({
  reducer: {
    vacation: vacationReducer,
    dreamer: dreamerReducer,
    appState: appStateReducer,
    auth: authReducer,
  },
})

// store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>

export default store
