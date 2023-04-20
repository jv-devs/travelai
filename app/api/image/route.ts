import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location') || ''
  // console.log(location)
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.IMAGE_API_KEY}&page=1&query=${location}`
    )
    // console.log('RES: ', res)
    const data = await res.json()
    // console.log('DATA: ', data)
    const rawPhotos = data.results.slice(0, 3)
    // console.log('PHOTOS: ', rawPhotos);
    const processedPhotos = rawPhotos.map((photo: any) => {
      const width = photo.width
      const height = photo.height
      const alt = photo.alt_description
      const url = photo.urls.regular
      const userName = photo.user.name
      const user = `https://unsplash.com/@${photo.user.username}`
      return { url, width, height, alt, userName, user }
    })
    // console.log('PROCESSED: ', processedPhotos);
    return NextResponse.json(processedPhotos)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    )
  }
}
