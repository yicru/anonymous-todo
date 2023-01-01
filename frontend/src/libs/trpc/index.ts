import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

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

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
