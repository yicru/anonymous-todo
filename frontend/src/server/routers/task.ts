import { z } from 'zod'

import { prisma } from '@src/server/prisma'
import { procedure, router } from '@src/server/trpc'

export const taskRouter = router({
  add: procedure
    .input(
      z.object({
        projectId: z.string().cuid(),
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.task.create({
        data: {
          project: {
            connect: {
              id: input.projectId,
            },
          },
          title: input.title,
        },
      })
    }),
})
