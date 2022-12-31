import { ChakraProvider } from '@chakra-ui/react'
import type { AppType } from 'next/app'

import { BaseLayout } from '@src/layouts/BaseLayout'
import { trpc } from '@src/libs/trpc'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  )
}

export default trpc.withTRPC(MyApp)
