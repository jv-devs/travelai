'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../store'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter()
  const { currentUser, isLoading } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push('/')
    }
  }, [currentUser, router, isLoading])

  // Render the children if user is authenticated
  return <>{children}</>
}
