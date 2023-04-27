'use client'

import { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import store from '@/app/store'

import { updateMaxTokens } from './slices/appStateSlice'
import { authStateChanged } from './slices/authSlice'

function Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(authStateChanged())
    store.dispatch(updateMaxTokens())
  }, [])

  return <ReduxProvider store={store}>{children}</ReduxProvider>
}

export default Provider
