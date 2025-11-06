'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleStart = () => {
    router.push('/studio')
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white text-center">
      <div className="max-w-2xl px-6">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="text-blue-400">Webneva</span>
        </h1>
        <p className="text-gray-300 text-lg mb-10 leading-relaxed">
          Code, create, and deploy your next website with AI.
          <br />
          Webneva helps you design smarter — and faster.
        </p>
        <button
          onClick={handleStart}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-400/40"
        >
          Start Vibe Coding →
        </button>
      </div>
    </main>
  )
}
