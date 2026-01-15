'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function Studio() {
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [mode, setMode] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewHtml, setPreviewHtml] = useState('')
  const iframeRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const savedCode = localStorage.getItem('webneva_code') || ''
    const savedDescription = localStorage.getItem('webneva_description') || ''
    const savedMode = localStorage.getItem('webneva_mode') || ''

    setCode(savedCode)
    setDescription(savedDescription)
    setMode(savedMode)
    
    // Starta generering automatiskt när sidan laddas
    if (savedDescription) {
      setTimeout(() => {
        handleGenerate()
      }, 1000)
    }
  }, [])

  // Simulerad AI-kodgenerering med live updates
  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)
    setGeneratedCode('')
    setPreviewHtml('')

    // Simulera AI-generering
    const steps = [
      "Analyserar din beskrivning...",
      "Planerar struktur...",
      "Genererar HTML...",
      "Skriver CSS...",
      "Implementerar JavaScript...",
      "Optimering...",
      "Slutför koden..."
    ]

    for (let i = 0; i < steps.length; i++) {
      setProgress(Math.floor((i + 1) / steps.length * 100))
      
      // Lägg till mer kod vid varje steg
      const newCode = generateCodeStep(i, description, code)
      setGeneratedCode(newCode)
      
      // Uppdatera live preview
      setPreviewHtml(createPreviewHtml(newCode))
      
      // Vänta lite mellan stegen för realism
      await new Promise(resolve => setTimeout(resolve, 800))
    }

    setIsGenerating(false)
  }

  const generateCodeStep = (step, desc, existingCode) => {
    // Detta är en förenklad simulering
    // I verkligheten skulle du anropa OpenAI/DeepSeek API här
    
    if (mode === 'enhance') {
      // Kodförbättring
      return `// Steg ${step + 1}: ${['Analys', 'Optimering', 'Refaktorering', 'Testning'][step % 4]}
// Ursprunglig kod:
${existingCode.substring(0, 200)}...

// Förbättringar:
- ✅ Responsiv design tillagd
- 🎨 Moderna färger
- ⚡ Prestandaoptimering
- 📱 Mobilanpassning

// Genererad kod kommer här...`
    } else {
      // Ny sida från beskrivning
      const baseCode = `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${desc.split(' ').slice(0, 3).join(' ')}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="bg-gray-900 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">${desc.includes('restaurang') ? 'Restaurang' : 'Webbplats'}</h1>
            <div class="space-x-4">
                <a href="#hem" class="hover:text-blue-400">Hem</a>
                <a href="#om" class="hover:text-blue-400">Om</a>
                <a href="#kontakt" class="hover:text-blue-400">Kontakt</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div class="container mx-auto text-center">
            <h2 class="text-4xl font-bold mb-4">Välkommen till din nya hemsida</h2>
            <p class="text-xl opacity-90">Skapad med AI-kraft från Webneva</p>
            <p class="mt-6 max-w-2xl mx-auto">${desc.substring(0, 150)}...</p>
        </div>
    </header>

    <!-- Content -->
    <main class="container mx-auto py-12 px-4">
        <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-2xl font-bold mb-4 text-gray-800">Design & Funktion</h3>
                <p class="text-gray-600">Baserat på din beskrivning har vi skapat en modern, responsiv design.</p>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-2xl font-bold mb-4 text-gray-800">AI-Genererad</h3>
                <p class="text-gray-600">All kod är optimerad och anpassad efter dina specifikationer.</p>
            </div>
        </div>
    </main>

    <footer class="bg-gray-900 text-white py-8 text-center">
        <p>© ${new Date().getFullYear()} - Genererad med ❤️ av Webneva AI</p>
    </footer>
</body>
</html>`
      
      return baseCode
    }
  }

  const createPreviewHtml = (code) => {
    // Enkel preview - i verkligheten skulle du parsa koden bättre
    return code
  }

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `webneva-${mode}-${Date.now()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleNewProject = () => {
    localStorage.removeItem('webneva_code')
    localStorage.removeItem('webneva_description')
    localStorage.removeItem('webneva_mode')
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tillbaka
            </button>
            <h1 className="text-2xl font-bold">Webneva Studio</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
              {mode === 'enhance' ? 'Kodförbättring' : 'Nytt Projekt'}
            </span>
            <button
              onClick={handleNewProject}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Nytt Projekt
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Progress & Controls */}
        <div className="mb-8 bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">
                {isGenerating ? 'AI Genererar Din Webbplats...' : 'AI-Genererad Kod'}
              </h2>
              <p className="text-gray-400">
                {mode === 'enhance' 
                  ? 'Din kod analyseras och förbättras i realtid'
                  : 'Din hemsida byggs baserat på din beskrivning'}
              </p>
              
              {isGenerating && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Genererar...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Genererar...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generera Om
                  </>
                )}
              </button>
              
              {!isGenerating && generatedCode && (
                <button
                  onClick={handleDownload}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Ladda Ned
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Split View: Code Editor & Live Preview */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <div className="border-b border-gray-800 p-4 bg-gray-900/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-3 font-mono text-sm">kod.html</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="font-mono text-sm whitespace-pre overflow-x-auto min-h-[500px] bg-gray-950/50 p-4 rounded-lg border border-gray-800">
                {isGenerating ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-400">AI skriver kod...</span>
                    </div>
                    <div className="text-gray-500 animate-pulse">
                      {generatedCode || '// Startar kodgenerering...'}
                    </div>
                  </div>
                ) : generatedCode ? (
                  generatedCode
                ) : (
                  <div className="text-gray-500">
                    {/* Visa användarens input */}
                    <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="text-blue-400 mb-2">Din beskrivning:</h4>
                      <p className="text-gray-300">{description}</p>
                    </div>
                    
                    {mode === 'enhance' && code && (
                      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                        <h4 className="text-purple-400 mb-2">Din ursprungliga kod:</h4>
                        <pre className="text-gray-300 text-xs overflow-x-auto">
                          {code.substring(0, 500)}...
                        </pre>
                      </div>
                    )}
                    
                    <p className="text-center py-8">
                      Klicka på "Generera" för att börja skapa din hemsida med AI
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <div className="border-b border-gray-800 p-4 bg-gray-900/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-mono text-sm">live-preview.html</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                    Live
                  </span>
                  <button
                    onClick={() => iframeRef.current?.contentWindow?.location.reload()}
                    className="p-1 hover:bg-gray-800 rounded"
                    title="Reload preview"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="border-4 border-gray-800 rounded-lg overflow-hidden bg-white min-h-[500px]">
                {previewHtml ? (
                  <iframe
                    ref={iframeRef}
                    srcDoc={previewHtml}
                    title="Live Preview"
                    className="w-full h-[500px] border-0"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="flex items-center justify-center h-[500px] bg-gray-950">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Väntar på genererad kod...</p>
                      <p className="text-gray-500 text-sm mt-2">Live preview visas här</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-400">
                <p>ℹ️ Preview uppdateras automatiskt när AI genererar ny kod</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Input Summary */}
        <div className="mt-8 bg-gray-900/30 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">Sammanfattning av ditt projekt</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="text-blue-400 font-medium mb-2">Läge</h4>
              <p>{mode === 'enhance' ? 'Kodförbättring' : 'Nytt Projekt från Beskrivning'}</p>
            </div>
            <div className="p-4 bg-gray-800/40 rounded-lg">
              <h4 className="text-purple-400 font-medium mb-2">Beskrivning</h4>
              <p className="truncate">{description || 'Ingen beskrivning angiven'}</p>
            </div>
          </div>
          
          {mode === 'enhance' && code && (
            <div className="mt-4 p-4 bg-gray-800/40 rounded-lg">
              <h4 className="text-green-400 font-medium mb-2">Ursprunglig Kod (första 300 tecken)</h4>
              <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
                {code.length > 300 ? `${code.substring(0, 300)}...` : code}
              </pre>
            </div>
          )}
        </div>

        {/* Tips & Nästa steg */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl">
            <h4 className="text-lg font-semibold mb-2">💡 Tips</h4>
            <p className="text-gray-300 text-sm">
              {mode === 'enhance' 
                ? 'Specificera gärna exakt vad du vill förbättra för bästa resultat'
                : 'Ju mer detaljerad beskrivning, desto bättre blir resultatet'}
            </p>
          </div>
          
          <div className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl">
            <h4 className="text-lg font-semibold mb-2">⚡ Nästa steg</h4>
            <p className="text-gray-300 text-sm">
              När du är nöjd med koden kan du ladda ned den eller kopiera till ditt projekt.
            </p>
          </div>
          
          <div className="p-5 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl">
            <h4 className="text-lg font-semibold mb-2">🚀 Ytterligare funktioner</h4>
            <p className="text-gray-300 text-sm">
              Kommande: Direkt deployment till Vercel, GitHub integration, och fler AI-modeller.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}