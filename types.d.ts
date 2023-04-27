import { Timestamp } from 'firebase/firestore'

type DreamerResult = {
  name: string
  description: string
  // Temporary fix for conditional styling
  [key: string]: any | undefined
}

type UserInputData = {
  origin: string
  vacationBudget: string
  travelSeason: string
  vacationType: string
}

type UserChoiceData = {
  destination: string
  vacationBudget: string
  travelSeason: string
  vacationType: string
}

type AppUser = {
  uid: string
  email: string
  displayName: string
  photoURL: string
}

type Weather = {
  temperature: string
  conditions: string
  humidity: string
}

type CurrentWeather = {
  temp: number
  conditions: string
  humidity: number
  wind: number
  daylightHours: string
}

type ExchangeRate = {
  from: string
  to: string
  rate: number
}

type LocalPhrases = {
  [key: string]: string
}

type Image = {
  url: string
  width: number
  height: number
  alt: string
  userName: string
  user: string
}

type VacationState = {
  name: string
  description: string
  vacationBudget: string
  travelSeason: string
  vacationType: string
  weather: Weather
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
  plannerLoading: boolean
  images: Image[]
}

type HistoryType = {
  uid: string
  vacation: VacationState
  date: Timestamp
}
