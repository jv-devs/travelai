import { PrivateRoute } from '../components/PrivateRoute'
import Navbar from './components/Navbar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PrivateRoute>
      <Navbar />
      {children}
    </PrivateRoute>
  )
}
