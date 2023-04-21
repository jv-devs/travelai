import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const currency = searchParams.get('currency') || ''
  console.log(currency)
  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/exchangerate?pair=CAD_${currency}`
    )
    console.log('RES: ', res)
    const data = await res.json()
    console.log('DATA: ', data)
    const exchangeRate = {
      from: 'CAD',
      to: currency,
      rate: data.exchange_rate,
    }
    return NextResponse.json({ exchangeRate })
  } catch (error: any) {
    console.log('ERROR: ', error)
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    )
  }
}
