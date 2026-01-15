'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function Studio() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [activeTab, setActiveTab] = useState('chat') // 'chat', 'code', 'preview'
  const [mode, setMode] = useState('')
  const messagesEndRef = useRef(null)
  const iframeRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const savedDescription = localStorage.getItem('webneva_description') || ''
    const savedMode = localStorage.getItem('webneva_mode') || ''
    const savedCode = localStorage.getItem('webneva_code') || ''
    
    setMode(savedMode)

    // Starta med ett välkomstmeddelande
    const welcomeMessage = {
      id: 1,
      text: savedMode === 'enhance' 
        ? `Hej! Jag är redo att förbättra din kod. Jag har läst din beskrivning: "${savedDescription}"`
        : `Hej! Jag är redo att skapa din hemsida baserat på: "${savedDescription}"`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
    }

    const userMessage = {
      id: 0,
      text: savedDescription,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([welcomeMessage, userMessage])
    
    // Starta generering automatiskt
    if (savedDescription) {
      setTimeout(() => {
        handleAIGenerate(savedDescription, savedCode)
      }, 1000)
    }

    // Scrolla till botten av chatten
    scrollToBottom()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleAIGenerate = async (description, existingCode = '') => {
    setIsGenerating(true)
    
    // Lägg till AI-typsnittsmeddelande
    const typingMessage = {
      id: messages.length + 1,
      text: '🔄 Genererar kod...',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
      isTyping: true
    }
    
    setMessages(prev => [...prev, typingMessage])
    
    // Simulera AI-generering
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Ta bort typing-meddelandet
    setMessages(prev => prev.filter(msg => !msg.isTyping))
    
    // Generera kod
    const code = generateAICode(description, existingCode)
    setGeneratedCode(code)
    setPreviewHtml(createPreviewHtml(code))
    
    // Lägg till resultatmeddelande
    const resultMessage = {
      id: messages.length + 2,
      text: '✅ Koden är genererad! Klicka på "Kod" eller "Preview" för att se resultatet.',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, resultMessage])
    setIsGenerating(false)
    setActiveTab('code')
  }

  const generateAICode = (description, existingCode) => {
    if (mode === 'enhance') {
      return `<!-- Webneva AI - Förbättrad Kod -->
<!-- Genererad: ${new Date().toLocaleString('sv-SE')} -->
<!-- Baserad på: "${description.substring(0, 100)}..." -->

<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-Förbättrad Webbplats</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --primary: #3b82f6;
            --secondary: #8b5cf6;
            --accent: #10b981;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            min-height: 100vh;
        }
        
        .glass {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="glass shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <span class="text-xl font-bold gradient-text">Webbplats</span>
                </div>
                <div class="flex gap-6">
                    <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors">Hem</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors">Tjänster</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors">Kontakt</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="py-20 px-6">
        <div class="container mx-auto max-w-4xl text-center">
            <span class="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
                🚀 AI-Förbättrad
            </span>
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
                Välkommen till din
                <span class="gradient-text"> förbättrade</span> webbplats
            </h1>
            <p class="text-xl text-gray-600 mb-10">
                ${description || 'Optimerad för prestanda, tillgänglighet och modern design'}
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
                <button class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Kom igång
                </button>
                <button class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors">
                    Läs mer
                </button>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">AI-Förbättringar</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors">
                    <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                        <span class="text-blue-600 font-bold text-xl">⚡</span>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-800">Prestanda</h3>
                    <p class="text-gray-600">Optimerad laddningshastighet och resursanvändning</p>
                </div>
                <div class="p-6 rounded-2xl border border-gray-200 hover:border-purple-300 transition-colors">
                    <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                        <span class="text-purple-600 font-bold text-xl">🎨</span>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-800">Design</h3>
                    <p class="text-gray-600">Modern, responsiv design med bästa praxis</p>
                </div>
                <div class="p-6 rounded-2xl border border-gray-200 hover:border-green-300 transition-colors">
                    <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                        <span class="text-green-600 font-bold text-xl">✓</span>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-800">Kvalitet</h3>
                    <p class="text-gray-600">Ren, välstrukturerad och underhållbar kod</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="py-12 bg-gray-900 text-white">
        <div class="container mx-auto px-6 text-center">
            <p class="text-gray-400">© ${new Date().getFullYear()} - Genererad med Webneva AI</p>
            <p class="text-gray-500 text-sm mt-2">Version 1.0 | AI-optimerad kod</p>
        </div>
    </footer>
</body>
</html>`
    } else {
      return `<!-- Webneva AI - Genererad Webbplats -->
<!-- Genererad: ${new Date().toLocaleString('sv-SE')} -->
<!-- Baserad på: "${description.substring(0, 100)}..." -->

<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${description.split(' ').slice(0, 3).join(' ') || 'Min Webbplats'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #2563eb;
            --secondary: #7c3aed;
            --accent: #059669;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1f2937;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .text-gradient {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="container mx-auto px-4 py-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-md gradient-bg"></div>
                    <span class="text-xl font-bold text-gray-800">${description.split(' ')[0] || 'Webbplats'}</span>
                </div>
                <div class="hidden md:flex items-center gap-6">
                    <a href="#" class="text-gray-600 hover:text-blue-600 font-medium">Home</a>
                    <a href="#" class="text-gray-600 hover:text-blue-600 font-medium">About</a>
                    <a href="#" class="text-gray-600 hover:text-blue-600 font-medium">Services</a>
                    <a href="#" class="text-gray-600 hover:text-blue-600 font-medium">Contact</a>
                </div>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="gradient-bg text-white py-20">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                ${description.split('.').shift() || 'Welcome to Your New Website'}
            </h1>
            <p class="text-xl opacity-90 max-w-3xl mx-auto mb-10">
                ${description || 'Created with AI power for exceptional user experience'}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Primary Action
                </button>
                <button class="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Secondary Action
                </button>
            </div>
        </div>
    </section>

    <!-- Content -->
    <section class="py-20">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
                Why This Website Stands Out
            </h2>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="card-hover bg-white p-6 rounded-xl shadow-lg">
                    <div class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                        <i class="fas fa-rocket text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-800">Fast & Efficient</h3>
                    <p class="text-gray-600">Optimized for speed and performance with modern techniques.</p>
                </div>
                
                <div class="card-hover bg-white p-6 rounded-xl shadow-lg">
                    <div class="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                        <i class="fas fa-mobile-alt text-purple-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-800">Fully Responsive</h3>
                    <p class="text-gray-600">Looks perfect on all devices from mobile to desktop.</p>
                </div>
                
                <div class="card-hover bg-white p-6 rounded-xl shadow-lg">
                    <div class="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                        <i class="fas fa-shield-alt text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-800">Secure & Reliable</h3>
                    <p class="text-gray-600">Built with security best practices and reliable infrastructure.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gray-900 text-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Launch?</h2>
            <p class="text-xl opacity-90 max-w-2xl mx-auto mb-10">
                Your AI-generated website is ready to make an impact.
            </p>
            <button class="px-10 py-4 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors">
                Launch Website
            </button>
        </div>
    </section>

    <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-6 md:mb-0">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 rounded-lg gradient-bg"></div>
                        <span class="text-2xl font-bold">${description.split(' ')[0] || 'Website'}</span>
                    </div>
                    <p class="text-gray-400">Generated with ❤️ by Webneva AI</p>
                </div>
                <p class="text-gray-500 text-sm">
                    © ${new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </div>
    </footer>

    <script>
        // Simple interactive features
        document.addEventListener('DOMContentLoaded', function() {
            // Add hover effects
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
            
            console.log('Website generated by Webneva AI');
        });
    </script>
</body>
</html>`
    }
  }

  const createPreviewHtml = (code) => {
    return code
  }

  const handleSendMessage = () => {
    if (!userInput.trim() || isGenerating) return
    
    const newMessage = {
      id: messages.length + 1,
      text: userInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, newMessage])
    setUserInput('')
    
    // Simulera AI-svar
    setTimeout(() => {
      handleAIGenerate(userInput)
    }, 500)
  }

  const handleDownload = () => {
    if (!generatedCode) return
    
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `webneva-${Date.now()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleNewChat = () => {
    localStorage.clear()
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={handleNewChat}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">W</span>
                </div>
                <span className="font-semibold">Webneva Studio</span>
              </button>
              
              <span className="hidden sm:inline px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-sm font-medium border border-amber-500/20">
                New version dropped!
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {generatedCode && (
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Download Code
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chat Panel */}
          <div className={`${activeTab === 'chat' ? 'lg:w-2/3' : 'lg:w-1/3'} transition-all duration-300`}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-[calc(100vh-180px)] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-sm">AI</span>
                    </div>
                    <div>
                      <h2 className="font-semibold">Webneva AI Assistant</h2>
                      <p className="text-sm text-gray-500">{isGenerating ? 'Thinking...' : 'Ready to work'}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('chat')}
                      className={`px-3 py-1.5 rounded-lg text-sm ${activeTab === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-3 py-1.5 rounded-lg text-sm ${activeTab === 'code' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      Code
                    </button>
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-3 py-1.5 rounded-lg text-sm ${activeTab === 'preview' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs opacity-75">
                            {message.sender === 'user' ? 'You' : 'Webneva AI'}
                          </span>
                          <span className="text-xs opacity-50">{message.timestamp}</span>
                        </div>
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        {message.isTyping && (
                          <div className="flex gap-1 mt-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything or describe what you want..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={isGenerating}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isGenerating || !userInput.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? 'Thinking...' : 'Send'}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  I'm ready to work. Ask me anything.
                </p>
              </div>
            </div>
          </div>

          {/* Code/Preview Panel */}
          {activeTab !== 'chat' && (
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-[calc(100vh-180px)] flex flex-col">
                {/* Panel Header */}
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${activeTab === 'code' ? 'bg-purple-500' : 'bg-green-500'}`}></div>
                      <span className="font-mono text-sm">
                        {activeTab === 'code' ? 'generated-code.html' : 'live-preview.html'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {activeTab === 'preview' && (
                        <button
                          onClick={() => iframeRef.current?.contentWindow?.location.reload()}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Reload preview"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      )}
                      <span className="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded border border-green-500/20">
                        {activeTab === 'preview' ? 'Live' : 'AI Generated'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-4">
                  {activeTab === 'code' ? (
                    generatedCode ? (
                      <div className="font-mono text-sm bg-gray-900 text-gray-100 rounded-lg p-4 h-full overflow-auto">
                        <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                          <p>Waiting for AI to generate code...</p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden h-full">
                      {previewHtml ? (
                        <iframe
                          ref={iframeRef}
                          srcDoc={previewHtml}
                          title="Live Preview"
                          className="w-full h-full border-0"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-900">
                          <div className="text-center">
                            <div className="w-20 h-20 border-4 border-gray-700 border-t-green-500 rounded-full animate-spin mx-auto mb-6"></div>
                            <p className="text-gray-400">Generating preview...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}