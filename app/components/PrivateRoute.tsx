'use client'

import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthContext from '../context/UserContext'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter()
  const { currentUser, isLoading } = useContext(AuthContext)

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push('/')
    }
  }, [currentUser, router, isLoading])

  // Render the children if user is authenticated
  return <>{children}</>
}
