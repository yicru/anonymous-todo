import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'

import type { AppRouter } from '@src/server/routers/_app'

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    }
  },
})
