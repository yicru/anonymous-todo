import { createNextApiHandler } from '@trpc/server/adapters/next'

import { appRouter } from '@src/server/routers/_app'

export default createNextApiHandler({
  router: appRouter,
})
