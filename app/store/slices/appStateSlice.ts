// appStateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  loadingPlanner: boolean
  loadingSuggestions: boolean
}

const initialState: AppState = {
  loadingPlanner: false,
  loadingSuggestions: false,
}

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoadingPlanner: (state, action: PayloadAction<boolean>) => {
      state.loadingPlanner = action.payload
    },
    setLoadingSuggestions: (state, action: PayloadAction<boolean>) => {
      state.loadingSuggestions = action.payload
    },
  },
})

export const { setLoadingPlanner, setLoadingSuggestions } =
  appStateSlice.actions

export default appStateSlice.reducer
