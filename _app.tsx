import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'

import {ApolloProvider} from '@apollo/client'
import { client } from '@/lib/apollo'

const poppins = Poppins({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <main className={`${poppins.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  )
}
