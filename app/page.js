'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const router = useRouter()

  // Roterande features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const openEnhanceModal = () => {
    setModalType('enhance')
    setShowModal(true)
  }

  const openCreateModal = () => {
    setModalType('create')
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (!description.trim()) {
      return alert('Vänligen beskriv vad du vill göra!')
    }

    setIsLoading(true)

    localStorage.setItem('webneva_mode', modalType)
    if (modalType === 'enhance') {
      localStorage.setItem('webneva_code', userInput)
    }
    localStorage.setItem('webneva_description', description)

    // Simulera laddning
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push('/studio')
  }

  const features = [
    {
      title: "AI-Powered Development",
      description: "Använd avancerad AI för att generera, förbättra och optimera din kod i realtid.",
      icon: "🤖",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Live Preview",
      description: "Se din webbplats byggas i realtid medan AI:en kodar. Ingen väntan, bara resultat.",
      icon: "🚀",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Professional Quality",
      description: "Få produktionsredo kod med moderna standarder, responsiv design och hög prestanda.",
      icon: "⭐",
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-lg font-bold">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Webneva
                </h1>
                <p className="text-xs text-gray-400">AI Web Development</p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it works</Link>
              <Link href="#examples" className="text-gray-300 hover:text-white transition-colors">Examples</Link>
              <button className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                Sign in
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm">AI-Powered Web Development Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Build Better Websites
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                With AI Magic
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Transform your ideas into fully functional websites instantly. 
              Whether you have existing code or just an idea, Webneva's AI will create, 
              enhance, and deploy for you.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20">
              <button
                onClick={openCreateModal}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create New Website</span>
                </div>
                <p className="text-sm font-normal mt-1 opacity-80">Describe your idea, get a website</p>
              </button>
              
              <button
                onClick={openEnhanceModal}
                className="group relative px-8 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl font-semibold text-lg hover:border-blue-500 hover:bg-gray-800 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Enhance Existing Code</span>
                </div>
                <p className="text-sm font-normal mt-1 opacity-80">Paste code, get improvements</p>
              </button>
            </div>
          </div>

          {/* Features Showcase */}
          <div id="features" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Webneva?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeFeature === index 
                      ? 'border-blue-500/50 bg-gray-800/30' 
                      : 'border-gray-800 bg-gray-900/30'
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 rounded-2xl`}></div>
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div id="how-it-works" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="font-bold mb-2">Describe or Paste</h3>
                <p className="text-gray-400 text-sm">Tell us what you want or paste your existing code</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="font-bold mb-2">AI Magic</h3>
                <p className="text-gray-400 text-sm">Our AI analyzes and generates optimized code</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="font-bold mb-2">Live Preview</h3>
                <p className="text-gray-400 text-sm">Watch your website being built in real-time</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">4</span>
                </div>
                <h3 className="font-bold mb-2">Download & Deploy</h3>
                <p className="text-gray-400 text-sm">Get production-ready code or deploy directly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 pt-12 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-lg font-bold">W</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Webneva</h2>
                  <p className="text-gray-400 text-sm">AI-Powered Web Development</p>
                </div>
              </div>
              <p className="text-gray-500 max-w-md">
                Transforming ideas into reality with the power of artificial intelligence.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Webneva. All rights reserved.</p>
            <p className="mt-2">Powered by OpenAI & DeepSeek AI technologies</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">
                    {modalType === 'enhance' ? 'Enhance Your Code' : 'Create New Website'}
                  </h3>
                  <p className="text-gray-400 mt-1">
                    {modalType === 'enhance' 
                      ? 'Paste your code and tell us what to improve'
                      : 'Describe your dream website in detail'}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {modalType === 'enhance' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Paste Your Code
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="// Paste your HTML, CSS, JavaScript, React, etc...
// You can paste multiple files or entire projects"
                    className="w-full h-48 bg-gray-950 border border-gray-800 rounded-lg p-4 text-gray-200 font-mono text-sm outline-none focus:border-blue-500 resize-none"
                    spellCheck="false"
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {modalType === 'enhance' 
                    ? 'What would you like to improve?'
                    : 'Describe your website in detail:'}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    modalType === 'enhance'
                      ? 'Example: "Make it responsive, add dark mode, improve performance, fix mobile layout..."'
                      : 'Example: "I want a restaurant website for Aldieve Italian restaurant in Borlänge. Include menu, gallery, contact form, booking system. Colors: red, white, black. Modern design with food photos."'
                  }
                  className="w-full h-40 bg-gray-950 border border-gray-800 rounded-lg p-4 text-gray-200 outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !description.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Studio
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
    </main>
  )
}