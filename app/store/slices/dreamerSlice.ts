import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setLoadingSuggestions } from './appStateSlice'
import getDreamerSuggestions from '@/lib/getDreamerSuggestions'
import { AppDispatch } from '../index'
import { AppThunk } from '../index'

interface DreamerState {
  showSuggestions: boolean
  userInputData: UserInputData
  userChoiceData: UserChoiceData
  dreamerResults: DreamerResult[]
}

const initialState: DreamerState = {
  showSuggestions: false,
  userInputData: {
    origin: '',
    vacationBudget: '',
    travelSeason: '',
    vacationType: '',
  },
  userChoiceData: {
    destination: '',
    vacationBudget: '',
    travelSeason: '',
    vacationType: '',
  },
  dreamerResults: [
    {
      name: '',
      description: '',
    },
    {
      name: '',
      description: '',
    },
    {
      name: '',
      description: '',
    },
  ],
}

const dreamerSlice = createSlice({
  name: 'dreamer',
  initialState,
  reducers: {
    setShowSuggestions: (state, action: PayloadAction<boolean>) => {
      state.showSuggestions = action.payload
    },
    setUserInputData(state, action: PayloadAction<UserInputData>) {
      state.userInputData = action.payload
    },
    setUserChoiceData(state, action: PayloadAction<UserChoiceData>) {
      state.userChoiceData = action.payload
    },
    setDreamerResults(state, action: PayloadAction<DreamerResult[]>) {
      state.dreamerResults = action.payload
    },
    updateField: (state, action: PayloadAction<Partial<DreamerState>>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const {
  setShowSuggestions,
  setUserInputData,
  setUserChoiceData,
  setDreamerResults,
} = dreamerSlice.actions

export const getSuggestions = (userInputs: UserInputData): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(setUserInputData(userInputs))
    dispatch(setLoadingSuggestions(true))
    console.log('userInputs: ', userInputs)
    const suggestions = await getDreamerSuggestions(userInputs)
    console.log('suggestions received: ', suggestions)
    dispatch(setDreamerResults(suggestions))
    dispatch(setLoadingSuggestions(false))
    dispatch(setShowSuggestions(true))
  }
}

export default dreamerSlice.reducer
