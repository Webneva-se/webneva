'use client'
import { useEffect, useState } from 'react'

export default function Studio() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('')

  useEffect(() => {
    setInput(localStorage.getItem('webneva_input') || '')
    setMode(localStorage.getItem('webneva_mode') || '')
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Webneva Studio</h1>
      <p className="text-gray-400 mb-10">
        {mode === 'code'
          ? 'Här kan du se och förbättra din kod:'
          : 'Här börjar vi skapa din hemsida baserat på din idé:'}
      </p>

      <textarea
        value={input}
        readOnly
        className="w-full max-w-3xl h-64 p-4 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 resize-none"
      ></textarea>

      <p className="text-gray-500 mt-8 text-sm">
        (Den text du skrev sparas automatiskt från startsidan.)
      </p>
    </main>
  )
}
