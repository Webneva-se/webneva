'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white font-sans">
      {/* Glow effect following mouse */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,120,255,0.15), transparent 70%)`,
        }}
      ></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <img src="/webneva-logo.png" alt="Webneva Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold tracking-wide">Webneva</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-28 px-6">
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-semibold tracking-widest uppercase text-sm mb-3">
          Webneva 1.0 is live!
        </span>

        <h2 className="text-5xl sm:text-6xl font-extrabold mb-4">
          Welcome to <span className="text-blue-400">Webneva</span>
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mb-12 leading-relaxed">
          Let AI enhance your creativity — code, build and deploy your ideas faster than ever before.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5">
          <a
            href="/quiz"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:opacity-90 transition-all"
          >
            Förbättra din kod
          </a>
          <a
            href="/studio"
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-full font-semibold transition-all"
          >
            Börja skapa din hemsida
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 text-center py-20 px-8">
        <h3 className="text-4xl font-bold mb-12">Everything you need</h3>
        <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
          Build, improve, and publish your websites with the power of Webneva AI.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'AI-Assisted Coding',
              text: 'Get smart suggestions and fix errors instantly while you write.',
            },
            {
              title: 'Lightning Deploy',
              text: 'Push your project and watch it go live within seconds.',
            },
            {
              title: 'Smart Components',
              text: 'Reuse elements with intelligent code generation and structure.',
            },
            {
              title: 'Open Source AI',
              text: 'Powered by top open-source models like Mistral & Llama.',
            },
            {
              title: 'Team Collaboration',
              text: 'Invite your friends or teammates to build projects together.',
            },
            {
              title: 'Full Control',
              text: 'You own your data, your code, and your creativity.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-900/50 border border-gray-800 hover:border-blue-500 transition-all p-6 rounded-2xl text-left shadow-lg"
            >
              <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
              <p className="text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Webneva — Built with ❤️ and AI.
      </footer>
    </main>
  )
}
