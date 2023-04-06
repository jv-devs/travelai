import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="bg-slate-400">
      <nav className="container mx-auto flex w-full items-center justify-between py-2">
        <div>
          <Link href="/">Wanderlust Wizard</Link>
        </div>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Explore</Link>
          </li>
          <li>
            <Link href="/dreamer">Dreamer</Link>
          </li>
          <li>
            <Link href="/">Builder</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
