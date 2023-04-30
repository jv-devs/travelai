import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'

import { auth, db } from '@/app/firebase'
import { AppUser, HistoryType } from '@/types'

interface AuthState {
  currentUser: AppUser | null
  isLoading: boolean
  tokensUsed: number
  history: HistoryType[]
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: true,
  tokensUsed: 0,
  history: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<AppUser | null>) => {
      state.currentUser = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setTokensUsed: (state, action: PayloadAction<number>) => {
      state.tokensUsed = action.payload
    },
    setUserHistory: (state, action: PayloadAction<HistoryType[]>) => {
      state.history = action.payload
    },
    addToUserHistory: (state, action: PayloadAction<HistoryType>) => {
      state.history.push(action.payload)
    },
  },
})

export const {
  setCurrentUser,
  setIsLoading,
  setTokensUsed,
  setUserHistory,
  addToUserHistory,
} = authSlice.actions

export const handleSignOut = () => {
  return () => {
    auth.signOut()
  }
}

// increment tokensUsed in db and state
export const incrementTokensUsed = (user: AppUser) => {
  return async (dispatch: any) => {
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { tokensUsed } = docSnap.data()
      await updateDoc(docRef, {
        tokensUsed: tokensUsed + 1,
      })
      dispatch(setTokensUsed(tokensUsed + 1))
    }
  }
}

// get array of documents with matching uid from history collection
export const getUserHistory = (uid: string) => {
  return async (dispatch: any) => {
    const historyRef = collection(db, 'history')
    const q = query(historyRef, where('uid', '==', uid))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const history: HistoryType[] = []
      querySnapshot.forEach((doc) => {
        const { date, uid, vacation } = doc.data()
        // convert date to serializable date
        const serializableDate = {
          seconds: date.seconds,
          nanoseconds: date.nanoseconds,
        }
        history.push({ date: serializableDate, uid, vacation } as HistoryType)
      })
      dispatch(setUserHistory(history))
    }
  }
}

// check if user exists in db
const checkUserInDB = async (user: AppUser) => {
  const docRef = doc(db, 'users', user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // get dateLastLogin from db and compare to current date
    const { dateLastLogin } = docSnap.data()
    const today = new Date()
    // if new date, reset tokensUsed to 0
    if (dateLastLogin.toDate().getDate() !== today.getDate()) {
      await updateDoc(docRef, {
        tokensUsed: 0,
      })
    }
    // update dateLastLogin
    await updateDoc(docRef, {
      dateLastLogin: new Date(),
    })
  } else {
    // create user document in users collection
    await setDoc(docRef, {
      email: user.email,
      displayName: user.displayName,
      tokensUsed: 0,
      dateCreated: new Date(),
      dateLastLogin: new Date(),
    })
  }
}

export const authStateChanged = () => {
  return (dispatch: any) => {
    let user: AppUser | null = null
    auth.onAuthStateChanged(async (userData) => {
      if (userData) {
        const displayName = userData.displayName as string
        const email = userData.email as string
        const uid = userData.uid as string
        const photoURL = userData.photoURL as string
        user = { displayName, email, uid, photoURL }
        await checkUserInDB(user)

        // sync tokens from db into state
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const { tokensUsed } = docSnap.data()
          dispatch(setTokensUsed(tokensUsed))
          dispatch(getUserHistory(user.uid))
        }
      } else {
        user = null
        dispatch(setUserHistory([]))
      }
      dispatch(setCurrentUser(user))
      dispatch(setIsLoading(false))
    })
  }
}

export default authSlice.reducer
