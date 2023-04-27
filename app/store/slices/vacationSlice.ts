import getExchangeRate from '@/lib/getExchangeRate'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import store from '..'
import { setLoadingPlanner } from './appStateSlice'
import getLocationImages from '@/lib/getLocationImages'
import getVacationLocationData from '@/lib/getVacationLocationData'
import { setUserChoiceData } from './dreamerSlice'
import { getUserHistory, incrementTokensUsed } from './authSlice'
import { db } from '@/app/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { UserChoiceData, VacationState } from '@/types'

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
    daylightHours: '24',
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
  plannerLoading: false,
  images: [
    {
      url: 'https://images.unsplash.com/photo-1533743914085-403451366d53?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0Mzg3MDF8MHwxfHNlYXJjaHwxfHxjYW5jdW4lMjBtZXhpY298ZW58MHx8fHwxNjgyMDE0MzQz&ixlib=rb-4.0.3&q=85',
      width: 6000,
      height: 4000,
      alt: 'assorted wooden hut near body of water',
      userName: 'Josh Hammond',
      user: 'https://unsplash.com/@theoracle',
    },
    {
      url: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0Mzg3MDF8MHwxfHNlYXJjaHwyfHxjYW5jdW4lMjBtZXhpY298ZW58MHx8fHwxNjgyMDE0MzQz&ixlib=rb-4.0.3&q=85',
      width: 4096,
      height: 2160,
      alt: 'aerial photo of white buildings',
      userName: 'Gerson Repreza',
      user: 'https://unsplash.com/@gersonrepreza',
    },
    {
      url: 'https://images.unsplash.com/photo-1570737543098-0983d88f796d?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0Mzg3MDF8MHwxfHNlYXJjaHwzfHxjYW5jdW4lMjBtZXhpY298ZW58MHx8fHwxNjgyMDE0MzQz&ixlib=rb-4.0.3&q=85',
      width: 3781,
      height: 3200,
      alt: 'dock during daytime',
      userName: 'Andreas M',
      user: 'https://unsplash.com/@nextvoyage_pl',
    },
  ],
}

const vacationSlice = createSlice({
  name: 'vacation',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<Partial<VacationState>>) => {
      return { ...state, ...action.payload }
    },
    updateVacationData: (
      state,
      action: PayloadAction<Partial<VacationState>>
    ) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { updateField, updateVacationData } = vacationSlice.actions

export const getVacation = (userChoice: UserChoiceData) => {
  return async (dispatch: any) => {
    dispatch(setLoadingPlanner(true))
    dispatch(setUserChoiceData(userChoice))
    try {
      const [images, vacationLocationData] = await Promise.all([
        getLocationImages(userChoice.destination),
        getVacationLocationData(userChoice),
      ])

      // store.dispatch(updateField(currentWeather))
      store.dispatch(updateField(images))
      store.dispatch(updateField(vacationLocationData))

      const currencyCode = vacationLocationData.currencyCode
      const exchangeRate = await getExchangeRate(currencyCode)
      store.dispatch(updateField(exchangeRate))

      // add current vacationState to firestore database 'history' collection
      const { currentUser } = store.getState().auth
      if (currentUser) {
        await addDoc(collection(db, 'history'), {
          vacation: { ...store.getState().vacation },
          uid: currentUser.uid,
          date: new Date(),
        })
        store.dispatch(getUserHistory(currentUser.uid))
      }
    } catch (error) {
      // TODO: handle error
      console.log(error)
    } finally {
      console.log('finally')
      const { currentUser } = store.getState().auth
      if (currentUser) {
        store.dispatch(incrementTokensUsed(currentUser))
      }
      store.dispatch(setLoadingPlanner(false))
    }
  }
}

export default vacationSlice.reducer
