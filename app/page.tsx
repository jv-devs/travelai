import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex-1 bg-slate-300">
      <div className="container mx-auto">
        <h1 className="bold text-xl">Travel App</h1>
        <section>
          <Link
            href="/dreamer"
            className="inline-block rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Dreamer
          </Link>
          <Link
            href="/builder"
            className="inline-block rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Builder
          </Link>
        </section>
      </div>
    </main>
  )
}
