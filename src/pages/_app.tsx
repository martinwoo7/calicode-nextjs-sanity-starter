import '~/styles/global.css'

import type { AppProps } from 'next/app'
import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'
import { lazy, useEffect, useState } from 'react'

import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import type { Metadata } from 'next'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}
export const metadata: Metadata = {
  title: 'Calicode Next.js Portfolio Site',
  description: 'A personal portfolio site built with Sanity and Next.js',
  openGraph: {
    images: 'add-your-open-graph-image-url-here',
  },
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const mono = IBM_Plex_Mono({
  variable: '--font-family-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

const sans = Inter({
  variable: '--font-family-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

const serif = PT_Serif({
  variable: '--font-family-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps

  const [isSanityStudio, setIsSanityStudio] = useState(false)

  useEffect(() => {
    const pathname = window.location.pathname
    console.log('curent pathname is ', pathname)
    setIsSanityStudio(pathname.startsWith('/studio'))
  }, [])

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-family-sans: ${sans.style.fontFamily};
            --font-family-serif: ${serif.style.fontFamily};
            --font-family-mono: ${mono.style.fontFamily};
          }
        `}
      </style>
      {draftMode ? (
        <PreviewProvider token={token}>
          <div className="bg-zinc-900 text-white h-full">
            {!isSanityStudio && <Navbar />}
            <Component {...pageProps} />
            {!isSanityStudio && <Footer />}
          </div>
        </PreviewProvider>
      ) : (
        <div className="bg-zinc-900 text-white h-full">
          {!isSanityStudio && <Navbar />}
          <Component {...pageProps} />
          {!isSanityStudio && <Footer />}
        </div>
      )}
    </>
  )
}
