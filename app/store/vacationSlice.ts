import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

interface Weather {
  temperature: string
  conditions: string
  humidity: string
}

interface CurrentWeather {
  temp: number
  conditions: string
  humidity: number
  wind: number
  daylightHours: string
}

interface ExchangeRate {
  from: string
  to: string
  rate: number
}

interface LocalPhrases {
  [key: string]: string
}

interface VacationState {
  name: string
  description: string
  vacationBudget: string
  travelSeason: string
  vacationType: string
  weather: Weather
  currentWeather: CurrentWeather
  exchangeRate: ExchangeRate
  needToKnow: string[]
  niceToKnow: string[]
  localPhrases: LocalPhrases
  activitySuggestionsList: string[]
  funFacts: string[]
  greeting: string
  localLanguage: string
  climate: string
  currency: string
  relaxationRating: number
  loading: boolean
}

const initialState: VacationState = {
  name: 'Cancun, Mexico',
  description: 'Beaches, palm trees and tequila',
  weather: {
    temperature: '27°C',
    conditions: 'Sunny',
    humidity: '75%',
  },
  currentWeather: {
    temp: 27,
    conditions: 'Sunny',
    humidity: 75,
    wind: 7,
    daylightHours: "24",
  },
  exchangeRate: {
    from: 'USD',
    to: 'MXN',
    rate: 20.29,
  },
  needToKnow: [
    'Bring sunscreen and insect repellent',
    'Drink bottled water',
    'Be careful when swimming in the ocean',
  ],
  niceToKnow: [
    'Tipping is expected in restaurants',
    'Try the local street food',
    'Take a day trip to the Mayan ruins of Chichen Itza',
  ],
  localPhrases: {
    hello: 'Hola',
    goodbye: 'Adiós',
    'thank you': 'Gracias',
    please: 'Por favor',
  },
  activitySuggestionsList: [
    'Snorkeling in the coral reefs',
    'Visiting Xcaret eco-archaeological park',
    'Exploring the Isla Mujeres',
    'Enjoying the nightlife in the Hotel Zone',
  ],
  funFacts: [
    'Cancun was originally a small fishing village before becoming a popular tourist destination.',
    "Cancun's hotel zone is shaped like the number 7.",
    'The Cancun Underwater Museum has over 500 submerged sculptures.',
  ],
  greeting: '¡Bienvenidos a Cancún!',
  localLanguage: 'Spanish',
  climate: 'Tropical',
  currency: 'Mexican Peso',
  relaxationRating: 8,
  vacationBudget: 'budget-friendly',
  travelSeason: 'peak season',
  vacationType: 'beach vacation',
  loading: true,
}

const vacationSlice = createSlice({
  name: 'vacation',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<Partial<VacationState>>) => {
      return { ...state, ...action.payload }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload }
    },
  },
})

export const { updateField, setLoading } = vacationSlice.actions

export const selectVacation = (state: RootState) => state.vacation

export default vacationSlice.reducer
