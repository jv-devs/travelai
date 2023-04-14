'use client'

import { createContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { auth } from '../database/firebase'

interface AuthContextProps {
  currentUser: User | null
  handleSignOut: () => void
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  handleSignOut: () => {},
})

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('auth state changed')
      setCurrentUser(user)
      console.log(user)
    })
    return unsubscribe
  }, [])

  const handleSignOut = () => {
    auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
