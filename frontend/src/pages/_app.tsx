import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import { BaseLayout } from '../layouts/BaseLayout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  )
}
