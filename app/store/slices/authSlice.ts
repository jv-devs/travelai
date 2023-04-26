import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth, db } from '@/app/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

interface AuthState {
  currentUser: AppUser | null
  isLoading: boolean
  tokensUsed: number
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: true,
  tokensUsed: 0,
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
  },
})

export const { setCurrentUser, setIsLoading, setTokensUsed } = authSlice.actions

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
      console.log('tokens used', tokensUsed)
      await updateDoc(docRef, {
        tokensUsed: tokensUsed + 1,
      })
      dispatch(setTokensUsed(tokensUsed + 1))
      console.log('token incremented in db and state!')
    } else {
      console.log('User does not exist in db!')
    }
  }
}

// check if user exists in db
const checkUserInDB = async (user: AppUser) => {
  const docRef = doc(db, 'users', user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('User exists in db!')
    // get dateLastLogin from db and compare to current date
    const { dateLastLogin } = docSnap.data()
    console.log('dateLastLogin: ', dateLastLogin.toDate().getDate())
    const today = new Date()
    console.log('today: ', today.getDate())
    // if new date, reset tokensUsed to 0
    if (dateLastLogin.toDate().getDate() !== today.getDate()) {
      console.log('Resetting tokensUsed to 0!')
      await updateDoc(docRef, {
        tokensUsed: 0,
      })
    }
    // update dateLastLogin
    await updateDoc(docRef, {
      dateLastLogin: new Date(),
    })
  } else {
    console.log('Adding user to db!')
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
        const displayName = userData.displayName || ''
        const email = userData.email || ''
        const uid = userData.uid || ''
        const photoURL = userData.photoURL || ''
        user = { displayName, email, uid, photoURL }
        await checkUserInDB(user)

        // sync tokens from db into state
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const { tokensUsed } = docSnap.data()
          console.log('tokens used', tokensUsed)
          dispatch(setTokensUsed(tokensUsed))
        }
      } else {
        user = null
      }
      dispatch(setCurrentUser(user))
      dispatch(setIsLoading(false))
    })
  }
}

export default authSlice.reducer
