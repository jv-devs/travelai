// appStateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/app/firebase'

import { AppDispatch } from '..'

interface AppState {
  loadingPlanner: boolean
  loadingSuggestions: boolean
  maxTokens: number
}

const initialState: AppState = {
  loadingPlanner: false,
  loadingSuggestions: false,
  maxTokens: 10,
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
    setMaxTokens: (state, action: PayloadAction<number>) => {
      state.maxTokens = action.payload
    },
  },
})

export const { setLoadingPlanner, setLoadingSuggestions, setMaxTokens } =
  appStateSlice.actions

// create a thunk function to update maxTokens state from db admin collection
export const updateMaxTokens = () => {
  return async (dispatch: AppDispatch) => {
    // get maxTokens from db
    const docRef = doc(db, 'admin', 'maxTokens')
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()
    const maxTokens = data?.count || 10000
    console.log('maxTokens: ', maxTokens)
    dispatch(setMaxTokens(maxTokens))
  }
}

export default appStateSlice.reducer
