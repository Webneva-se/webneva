'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null) // 'enhance' eller 'create'
  const [userInput, setUserInput] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Glow-effekt som följer musen
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Öppna modal för kodförbättring
  const openEnhanceModal = () => {
    setModalType('enhance')
    setShowModal(true)
  }

  // Öppna modal för att skapa ny sida
  const openCreateModal = () => {
    setModalType('create')
    setShowModal(true)
  }

  // Skicka till studio med data
  const handleSubmit = async () => {
    if (!userInput.trim() && modalType === 'enhance') {
      return alert('Vänligen klistra in din kod först!')
    }
    if (!description.trim()) {
      return alert('Vänligen beskriv vad du vill göra!')
    }

    setIsLoading(true)

    // Spara data
    localStorage.setItem('webneva_mode', modalType)
    localStorage.setItem('webneva_code', modalType === 'enhance' ? userInput : '')
    localStorage.setItem('webneva_description', description)

    // Navigera till studio
    router.push('/studio')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white font-sans">
      {/* Glow som följer musen */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,150,255,0.15), transparent 70%)`,
        }}
      ></div>

      {/* Bakgrund – AI vågor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,120,255,0.1),_transparent_70%)] animate-pulse blur-3xl opacity-60"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <img src="/webneva-logo.png" alt="Webneva Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold tracking-wide">Webneva</h1>
        </div>
        <nav className="flex gap-6">
          <Link href="/about" className="hover:text-blue-400 transition-colors">Om</Link>
          <Link href="/examples" className="hover:text-blue-400 transition-colors">Exempel</Link>
          <Link href="/pricing" className="hover:text-blue-400 transition-colors">Priser</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6">
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-semibold tracking-widest uppercase text-sm mb-3">
          AI-Powered Web Development
        </span>

        <h2 className="text-5xl sm:text-6xl font-extrabold mb-4">
          Skapa & Förbättra <span className="text-blue-400">Webbplatser</span> med AI
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mb-12 leading-relaxed">
          Använd <span className="text-blue-400 font-semibold">OpenAI GPT-4</span> och{' '}
          <span className="text-purple-400 font-semibold">DeepSeek</span> för att generera, 
          förbättra och se live preview av din kod i realtid.
        </p>

        {/* Knappval */}
        <div className="flex flex-col sm:flex-row gap-5 mb-16">
          <button
            onClick={openEnhanceModal}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Förbättra Din Kod
            </div>
            <p className="text-sm font-normal mt-1 opacity-80">Klistra in befintlig kod för AI-optimering</p>
          </button>
          
          <button
            onClick={openCreateModal}
            className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:border-gray-600"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Skapa Ny Webbplats
            </div>
            <p className="text-sm font-normal mt-1 opacity-80">Beskriv din idé - AI genererar koden</p>
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-xl">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
            <p className="text-gray-400">Se din hemsida byggas i realtid medan AI:en kodar</p>
          </div>
          
          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-xl">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Optimering</h3>
            <p className="text-gray-400">Få din kod analyserad och förbättrad av avancerad AI</p>
          </div>
          
          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-xl">
            <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enkelt Exportera</h3>
            <p className="text-gray-400">Ladda ner komplett kod eller deploy direkt till Vercel</p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">
                  {modalType === 'enhance' ? 'Förbättra Din Kod' : 'Skapa Ny Webbplats'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-400 mt-2">
                {modalType === 'enhance' 
                  ? 'Klistra in din kod och beskriv vad du vill förbättra'
                  : 'Beskriv i detalj hur du vill att din hemsida ska se ut och fungera'}
              </p>
            </div>

            <div className="p-6">
              {modalType === 'enhance' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Klistra in din nuvarande kod
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="// Klistra in din HTML, CSS, JavaScript eller React kod här...
// Du kan klistra in flera filer om du har en större projektstruktur"
                    className="w-full h-48 bg-gray-950 border border-gray-800 rounded-lg p-4 text-gray-200 font-mono text-sm outline-none focus:border-blue-500 resize-none"
                    spellCheck="false"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Stödjer: HTML, CSS, JavaScript, React, Next.js, Tailwind CSS
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {modalType === 'enhance' 
                    ? 'Beskriv vad du vill förbättra eller ändra:'
                    : 'Beskriv din hemsida i detalj:'}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    modalType === 'enhance'
                      ? 'Exempel: "Gör sidan mer responsiv, lägg till mörkt läge, optimera för mobil"'
                      : 'Exempel: "Jag vill ha en restauranghemsida för min italienska restaurang Aldieve i Borlänge på Drottningsgatan. Den ska ha meny, bildgalleri, kontaktformulär och bokningssystem. Färgschema: rött, vitt och svart. Modern design med matbilder."'
                  }
                  className="w-full h-32 bg-gray-950 border border-gray-800 rounded-lg p-4 text-gray-200 outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  Avbryt
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || (!userInput && modalType === 'enhance') || !description.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Bearbetar...
                    </>
                  ) : (
                    <>
                      Fortsätt till Studio
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center text-gray-500 text-sm border-t border-gray-800 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/webneva-logo.png" alt="Webneva Logo" className="w-8 h-8" />
              <span className="font-semibold text-white">Webneva</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Integritetspolicy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Användarvillkor</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Kontakt</a>
            </div>
          </div>
          <p className="mt-6">
            © {new Date().getFullYear()} Webneva — Powered by{' '}
            <span className="text-blue-400">OpenAI</span> &{' '}
            <span className="text-purple-400">DeepSeek</span>.
          </p>
        </div>
      </footer>
    </main>
  )
}