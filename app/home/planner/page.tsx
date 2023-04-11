import ImageGallery from './components/ImageGallery'
import Intro from './components/Intro'
import ItineraryList from './components/ItineraryList'
import LocalDetails from './components/LocalDetails'

export default function Planner() {
  return (
    <main>
      <Intro />
      <LocalDetails />
      <ImageGallery />
      <ItineraryList />
    </main>
  )
}
