'use client'
import { useEffect, useState } from 'react'
import locationData from './data/location'
import getGreeting from '@/lib/getGreeting'
import Intro from './components/Intro'

export default function Planner() {
  return (
    <main>
      <Intro />
      <section>
        {/* Local details */}
        {/* weather | weather api */}
        {/* exchange rate | exchange api */}
        {/* need-to-know | ai */}
        {/* nice-to-know | ai */}
        {/* local phrases | ai*/}
        {/* fun facts */}
      </section>
      <section>{/* Image gallery | image api */}</section>
      <section>{/* Activity list | ai */}</section>
    </main>
  )
}
