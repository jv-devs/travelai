import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location') as string
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.IMAGE_API_KEY}&page=1&per_page=5&query=${location}`
    )
    let data = await res.json()
    // some valid but less know locations return no results
    if (!data.results.length) {
      // return recent generic vacation images
      const res = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${process.env.IMAGE_API_KEY}&page=1&per_page=5&order_by=latest&query=vacation`
      )
      data = await res.json()
    }

    const rawPhotos = data.results

    const images = rawPhotos.map((photo: any) => {
      const width = photo.width
      const height = photo.height
      const alt = photo.alt_description
      const url = photo.urls.regular
      const userName = photo.user.name
      const user = `https://unsplash.com/@${photo.user.username}`
      return { url, width, height, alt, userName, user }
    })
    return NextResponse.json({ images })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    )
  }
}
