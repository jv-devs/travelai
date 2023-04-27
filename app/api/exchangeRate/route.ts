import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const currency = searchParams.get('currency') || ''
  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/exchangerate?pair=CAD_${currency}`
    )
    const data = await res.json()
    const exchangeRate = {
      from: 'CAD',
      to: currency,
      rate: data.exchange_rate,
    }
    return NextResponse.json({ exchangeRate })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    )
  }
}
