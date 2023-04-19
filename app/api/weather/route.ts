import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location') || ''
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    )
    if (data.ok) {
      const response = await data.json()
      console.log('response', response)
      if (response.cod !== 200) {
        return NextResponse.json(
          { message: response.message },
          {
            status: response.cod,
          }
        )
      }
      const conditions = response.weather[0].main
      const temp = response.main.temp
      const humidity = response.main.humidity
      const wind = response.wind.speed
      const sunrise = response.sys.sunrise
      const sunset = response.sys.sunset

      return NextResponse.json({
        conditions,
        temp,
        humidity,
        wind,
        sunrise,
        sunset,
      })
    } else {
      return NextResponse.json(
        { message: 'data not ok' },
        {
          status: 400,
        }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    )
  }
}
