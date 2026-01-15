'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Studio() {
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [mode, setMode] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewHtml, setPreviewHtml] = useState('')
  const [activeTab, setActiveTab] = useState('preview')
  const [generationStep, setGenerationStep] = useState('')
  const iframeRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const savedCode = localStorage.getItem('webneva_code') || ''
    const savedDescription = localStorage.getItem('webneva_description') || ''
    const savedMode = localStorage.getItem('webneva_mode') || ''

    setCode(savedCode)
    setDescription(savedDescription)
    setMode(savedMode)
    
    if (savedDescription) {
      setTimeout(() => {
        handleGenerate()
      }, 500)
    }
  }, [])

  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)
    setGeneratedCode('')
    setPreviewHtml('')
    setActiveTab('preview')

    const steps = [
      { text: 'Analyserar din beskrivning...', percent: 15 },
      { text: 'Planerar strukturen...', percent: 25 },
      { text: 'Designar gränssnittet...', percent: 35 },
      { text: 'Genererar HTML-kod...', percent: 50 },
      { text: 'Skriver CSS-stilar...', percent: 65 },
      { text: 'Lägger till JavaScript...', percent: 80 },
      { text: 'Optimering och testning...', percent: 95 },
      { text: 'Klar!', percent: 100 }
    ]

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i].text)
      setProgress(steps[i].percent)
      
      const newCode = generateCodeStep(i, description, code)
      setGeneratedCode(newCode)
      setPreviewHtml(createPreviewHtml(newCode))
      
      await new Promise(resolve => setTimeout(resolve, 600))
    }

    setIsGenerating(false)
    setActiveTab('code')
  }

  const generateCodeStep = (step, desc, existingCode) => {
    const timestamp = new Date().toLocaleTimeString('sv-SE')
    
    if (mode === 'enhance') {
      return `// Webneva AI - Kodförbättring
// Genererad: ${timestamp}
// Steg: ${step + 1}/8

${existingCode ? `// Originalkod (${existingCode.length} tecken):
${existingCode.substring(0, 300)}${existingCode.length > 300 ? '...' : ''}

// AI-förbättringar:` : '// Ingen ursprunglig kod hittades'}

// ✓ Förbättrad responsiv design
// ✓ Moderniserat färgschema
// ✓ Prestandaoptimering tillagd
// ✓ Tillgänglighetsförbättringar (ARIA)
// ✓ Renare och mer läsbar kod

// === GENERERAD KOD ===
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${desc.split(' ').slice(0, 3).join(' ')} - Förbättrad</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root { --primary: #3b82f6; --secondary: #8b5cf6; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, sans-serif; }
    </style>
</head>
<body class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold text-gray-800">${desc.split(' ')[0] || 'Webbplats'}</h1>
                <div class="flex gap-6">
                    <a href="#" class="text-gray-600 hover:text-blue-600">Hem</a>
                    <a href="#" class="text-gray-600 hover:text-blue-600">Tjänster</a>
                    <a href="#" class="text-gray-600 hover:text-blue-600">Kontakt</a>
                </div>
            </div>
        </div>
    </nav>

    <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">AI-Förbättrad Webbplats</h2>
            <p class="text-xl opacity-90 max-w-2xl mx-auto">${desc || 'Professionellt förbättrad med Webneva AI'}</p>
        </div>
    </section>

    <main class="container mx-auto px-6 py-12">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span class="text-blue-600 font-bold">✓</span>
                </div>
                <h3 class="text-xl font-bold mb-2 text-gray-800">Optimerad Prestanda</h3>
                <p class="text-gray-600">Laddningshastighet förbättrad med AI-optimering.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <span class="text-purple-600 font-bold">📱</span>
                </div>
                <h3 class="text-xl font-bold mb-2 text-gray-800">Fullt Responsiv</h3>
                <p class="text-gray-600">Perfekt på alla enheter från mobil till desktop.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <span class="text-green-600 font-bold">⚡</span>
                </div>
                <h3 class="text-xl font-bold mb-2 text-gray-800">Modern Design</h3>
                <p class="text-gray-600">Uppdaterad med aktuella designprinciper.</p>
            </div>
        </div>
    </main>

    <footer class="bg-gray-800 text-white py-8 mt-12">
        <div class="container mx-auto px-6 text-center">
            <p>© ${new Date().getFullYear()} - Genererad med Webneva AI</p>
            <p class="text-gray-400 text-sm mt-2">Förbättrad kod | Optimerad prestanda | Professionell design</p>
        </div>
    </footer>
</body>
</html>`
    } else {
      return `// Webneva AI - Ny Webbplats
// Genererad: ${timestamp}
// Steg: ${step + 1}/8

// Användarens beskrivning:
// "${desc}"

// === GENERERAD KOD ===
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${desc.split(' ').slice(0, 4).join(' ') || 'Min Nya Webbplats'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --primary: #3b82f6; --secondary: #8b5cf6; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; }
        .hero-gradient { background: linear-gradient(135deg, var(--primary), var(--secondary)); }
    </style>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-md hero-gradient"></div>
                    <span class="text-2xl font-bold text-gray-800">${desc.split(' ')[0] || 'Webbplats'}</span>
                </div>
                
                <div class="hidden md:flex gap-8">
                    <a href="#home" class="text-gray-700 hover:text-blue-600 font-medium">Hem</a>
                    <a href="#features" class="text-gray-700 hover:text-blue-600 font-medium">Funktioner</a>
                    <a href="#about" class="text-gray-700 hover:text-blue-600 font-medium">Om</a>
                </div>
                
                <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Kom igång
                </button>
            </div>
        </div>
    </nav>

    <section id="home" class="hero-gradient text-white py-20 md:py-32">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">Välkommen till din nya webbplats</h1>
            <p class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10">
                ${desc || 'Skapad med AI-kraft för att leverera exceptionell användarupplevelse'}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                    Läs mer
                </button>
                <button class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10">
                    Kontakta oss
                </button>
            </div>
        </div>
    </section>

    <section id="features" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Varför vår webbplats är speciell</h2>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-bolt text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-800">Super Snabb</h3>
                    <p class="text-gray-600">AI-optimerad för bästa laddningshastighet.</p>
                </div>
                
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-mobile-alt text-purple-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-800">Fullt Responsiv</h3>
                    <p class="text-gray-600">Ser perfekt ut på alla enheter.</p>
                </div>
                
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-shield-alt text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-800">Säker & Stabil</h3>
                    <p class="text-gray-600">Byggd med bästa praxis för säkerhet.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-20 bg-gray-900 text-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Redo att komma igång?</h2>
            <p class="text-xl opacity-90 max-w-2xl mx-auto mb-10">
                Din AI-genererade webbplats är redo att göra skillnad.
            </p>
            <button class="bg-blue-500 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600">
                Kom igång idag
            </button>
        </div>
    </section>

    <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-6 md:mb-0">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 rounded-lg hero-gradient"></div>
                        <span class="text-2xl font-bold">${desc.split(' ')[0] || 'Webbplats'}</span>
                    </div>
                    <p class="text-gray-400">AI-genererad med ❤️ av Webneva</p>
                </div>
                
                <div class="flex gap-6">
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-github text-xl"></i>
                    </a>
                </div>
            </div>
            
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
                <p>© ${new Date().getFullYear()} ${desc.split(' ')[0] || 'Webbplats'}. Alla rättigheter förbehållna.</p>
                <p class="mt-2 text-sm">Genererad med Webneva AI</p>
            </div>
        </div>
    </footer>
</body>
</html>`
    }
  }

  const createPreviewHtml = (code) => {
    const htmlMatch = code.match(/<html[\s\S]*<\/html>/i)
    return htmlMatch ? htmlMatch[0] : `<html><body><h1>Preview</h1><p>Genererar webbplats...</p></body></html>`
  }

  const handleDownload = () => {
    if (!generatedCode) return
    
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `webneva-${mode === 'enhance' ? 'forbattrad' : 'ny'}-${Date.now()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyCode = async () => {
    if (!generatedCode) return
    
    try {
      await navigator.clipboard.writeText(generatedCode)
      alert('Koden har kopierats till urklipp!')
    } catch (err) {
      console.error('Kunde inte kopiera kod:', err)
    }
  }

  const handleNewProject = () => {
    localStorage.removeItem('webneva_code')
    localStorage.removeItem('webneva_description')
    localStorage.removeItem('webneva_mode')
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
                <span className="font-semibold">Webneva Studio</span>
              </Link>
              
              <div className="hidden sm:flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  mode === 'enhance' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                }`}>
                  {mode === 'enhance' ? 'Kodförbättring' : 'Nytt Projekt'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {generatedCode && !isGenerating && (
                <>
                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Kopiera Kod
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Ladda Ned
                  </button>
                </>
              )}
              
              <button
                onClick={handleNewProject}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 rounded-lg font-medium"
              >
                Nytt Projekt
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">
                {mode === 'enhance' ? 'Kodförbättring i Realtid' : 'AI-Genererad Webbplats'}
              </h1>
              <p className="text-gray-400">
                {mode === 'enhance' 
                  ? 'Din kod analyseras och optimeras med avancerad AI-teknologi'
                  : 'Din beskrivning omvandlas till en komplett, professionell webbplats'}
              </p>
              
              {isGenerating ? (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-300">{generationStep}</span>
                    <span className="text-sm font-medium text-blue-400">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      AI-genererar din webbplats...
                    </div>
                  </div>
                </div>
              ) : generatedCode ? (
                <div className="mt-4 flex items-center gap-2 text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Koden är genererad och redo!</span>
                </div>
              ) : (
                <div className="mt-4 text-gray-500">
                  Klicka på "Generera" för att börja
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 min-w-[140px] ${
                  isGenerating 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90'
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Genererar...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {generatedCode ? 'Generera Om' : 'Generera'}
                  </>
                )}
              </button>
              
              {!isGenerating && generatedCode && (
                <button
                  onClick={() => setActiveTab(activeTab === 'preview' ? 'code' : 'preview')}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
                >
                  {activeTab === 'preview' ? 'Visa Kod' : 'Visa Preview'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex border-b border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 font-medium border-b-2 ${
              activeTab === 'preview' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Preview
            </div>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-6 py-3 font-medium border-b-2 ${
              activeTab === 'code' 
                ? 'border-purple-500 text-purple-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Källkod
            </div>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/40 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="border-b border-gray-700 p-4 bg-gray-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${activeTab === 'preview' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                  <span className="font-mono text-sm">
                    {activeTab === 'preview' ? 'preview.html' : 'index.html'}
                  </span>
                </div>
                {activeTab === 'preview' && previewHtml && (
                  <button
                    onClick={() => iframeRef.current?.contentWindow?.location.reload()}
                    className="p-1.5 hover:bg-gray-700 rounded"
                    title="Uppdatera preview"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-4">
              {activeTab === 'preview' ? (
                <div className="border-2 border-gray-700 rounded-lg overflow-hidden bg-white min-h-[500px]">
                  {previewHtml ? (
                    <iframe
                      ref={iframeRef}
                      srcDoc={previewHtml}
                      title="Live Preview"
                      className="w-full h-[500px] border-0"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[500px] bg-gray-900">
                      <div className="w-20 h-20 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin mb-6"></div>
                      <p className="text-gray-400 text-lg mb-2">Förbereder live preview...</p>
                      <p className="text-gray-500 text-sm">AI-genererar din webbplats</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="font-mono text-sm bg-gray-900 rounded-lg border border-gray-800 p-4 min-h-[500px] max-h-[500px] overflow-auto">
                  {generatedCode ? (
                    <pre className="text-gray-300 whitespace-pre-wrap">{generatedCode}</pre>
                  ) : (
                    <div className="text-gray-500 h-[500px] flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-center">Klicka på "Generera" för att se AI-genererad kod här</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Projektinformation</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Typ</div>
                  <div className={`px-3 py-1.5 rounded-lg inline-block ${
                    mode === 'enhance' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {mode === 'enhance' ? 'Kodförbättring' : 'Nytt Projekt'}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Din beskrivning</div>
                  <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                    <p className="text-gray-300">{description || 'Ingen beskrivning angiven'}</p>
                  </div>
                </div>
                
                {mode === 'enhance' && code && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Ursprunglig kod (sammanfattning)</div>
                    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 max-h-32 overflow-y-auto">
                      <pre className="text-gray-400 text-xs whitespace-pre-wrap">
                        {code.length > 500 ? `${code.substring(0, 500)}...` : code}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Snabbåtgärder</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(description)}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Kopiera beskrivning</span>
                </button>
                
                <button
                  onClick={handleNewProject}
                  className="p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg flex flex-col items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm">Nytt projekt</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">💡 Tips för bästa resultat</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Var så specifik som möjligt i din beskrivning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Nämn färger, layout och önskade funktioner</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Testa "Generera Om" för alternativa versioner</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}