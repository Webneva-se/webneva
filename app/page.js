'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <img src="/webneva-logo.png" alt="Webneva Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold tracking-wide">Webneva</h1>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all"
          >
            Discord Community
          </a>
          <a
            href="/studio"
            className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-all"
          >
            Start Vibe Coding →
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text font-semibold tracking-widest uppercase text-sm mb-4">
          DeepSite v3 is out!
        </span>
        <h2 className="text-5xl sm:text-6xl font-bold mb-4">
          Welcome to <span className="text-blue-400">Webneva</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mb-10">
          Code your website with AI in seconds. Access the most simple and
          powerful AI Vibe Code Editor to create your next project.
        </p>

        <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4 max-w-xl w-full">
          <input
            type="text"
            placeholder="Ask Webneva anything..."
            className="w-full bg-transparent text-gray-200 placeholder-gray-500 outline-none"
          />
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-all">
            Enhance
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="text-center py-20 px-8">
        <h3 className="text-4xl font-bold mb-12">Everything you need</h3>
        <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
          Build, deploy, and scale your websites with cutting-edge features.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl text-left hover:border-blue-500 transition-all">
            <h4 className="text-xl font-semibold mb-3">Multi Pages</h4>
            <p className="text-gray-400 mb-3">
              Create complex websites with multiple interconnected pages. Build
              everything from simple landing pages to full-featured web
              applications.
            </p>
            <div className="flex gap-2 text-xs text-gray-400">
              <span className="bg-gray-800 px-2 py-1 rounded-lg">
                Dynamic Routing
              </span>
              <span className="bg-gray-800 px-2 py-1 rounded-lg">Navigation</span>
              <span className="bg-gray-800 px-2 py-1 rounded-lg">SEO Ready</span>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl text-left hover:border-blue-500 transition-all">
            <h4 className="text-xl font-semibold mb-3">Auto Deploy</h4>
            <p className="text-gray-400 mb-3">
              Push your changes and watch them go live instantly. No complex CI/CD
              setup required.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl text-left hover:border-blue-500 transition-all">
            <h4 className="text-xl font-semibold mb-3">Free Hosting</h4>
            <p className="text-gray-400 mb-3">
              Host your websites for free with a global CDN and lightning-fast
              performance.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl text-left hover:border-blue-500 transition-all">
            <h4 className="text-xl font-semibold mb-3">Open Source Models</h4>
            <p className="text-gray-400 mb-3">
              Powered by cutting-edge open-source AI models. Transparent,
              customizable, and community-driven development.
            </p>
            <div className="flex gap-2 text-xs text-gray-400">
              <span className="bg-gray-800 px-2 py-1 rounded-lg">Llama</span>
              <span className="bg-gray-800 px-2 py-1 rounded-lg">Mistral</span>
              <span className="bg-gray-800 px-2 py-1 rounded-lg">CodeLlama</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Webneva. Built with ❤️ using Next.js & AI.
      </footer>
    </main>
  )
}
