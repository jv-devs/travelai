'use client'

import { Provider as ReduxProvider } from 'react-redux'
import store from '@/app/store'
import { useEffect } from 'react'
import { authStateChanged } from './slices/authSlice'
import { updateMaxTokens } from './slices/appStateSlice'

function Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(authStateChanged())
    store.dispatch(updateMaxTokens())
  }, [])

  return <ReduxProvider store={store}>{children}</ReduxProvider>
}

export default Provider
