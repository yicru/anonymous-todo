import { z } from 'zod'

import { prisma } from '@src/server/prisma'
import { procedure, router } from '@src/server/trpc'

export const taskRouter = router({
  add: procedure
    .input(
      z.object({
        value: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.task.create({
        data: {
          value: input.value,
        },
      })
    }),
  list: procedure.query(async () => {
    return await prisma.task.findMany()
  }),
})
