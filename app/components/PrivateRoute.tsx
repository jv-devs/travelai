'use client'

import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthContext from '../context/UserContext'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser) {
      router.push('/')
    }
  }, [currentUser, router])

  if (!currentUser) {
    // Render a loading spinner or message if authentication state is being checked
    return <div>Loading...</div>
  }

  // Render the children if user is authenticated
  return <>{children}</>
}
