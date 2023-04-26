'use client'

import { Provider as ReduxProvider } from 'react-redux'
import store from '@/app/store'
import { useEffect } from 'react'
import { authStateChanged } from './slices/authSlice'

function Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(authStateChanged())
  }, [])

  return <ReduxProvider store={store}>{children}</ReduxProvider>
}

export default Provider
