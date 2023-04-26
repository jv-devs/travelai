import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth, db } from '@/app/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

interface AuthState {
  currentUser: AppUser | null
  isLoading: boolean
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: true,
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
  },
})

export const { setCurrentUser, setIsLoading } = authSlice.actions

export const handleSignOut = () => {
  return () => {
    auth.signOut()
  }
}

const checkUserInDB = async (user: AppUser) => {
  const docRef = doc(db, 'users', user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
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
        checkUserInDB(user)
      } else {
        user = null
      }
      dispatch(setCurrentUser(user))
      dispatch(setIsLoading(false))
    })
  }
}

export default authSlice.reducer
