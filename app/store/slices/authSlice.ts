import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth } from '@/app/firebase'

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

export const authStateChanged = () => {
  return (dispatch: any) => {
    let user: AppUser | null = null
    auth.onAuthStateChanged((userData) => {
      if (userData) {
        const displayName = userData.displayName || ''
        const email = userData.email || ''
        const uid = userData.uid || ''
        const photoURL = userData.photoURL || ''
        user = { displayName, email, uid, photoURL }
      } else {
        user = null
      }
      dispatch(setCurrentUser(user))
      dispatch(setIsLoading(false))
    })
  }
}

export default authSlice.reducer
