import './globals.css'

export const metadata = {
  title: 'Webneva',
  description: 'AI-powered web studio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}