import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarot Reading Tool | 塔罗占卜',
  description: 'AI-powered tarot reading with cyberpunk aesthetic',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
