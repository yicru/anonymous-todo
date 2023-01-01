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
          completedAt: null,
          project: {
            connect: {
              id: input.projectId,
            },
          },
          title: input.title,
        },
      })
    }),
  toggle: procedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const task = await prisma.task.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      })

      return await prisma.task.update({
        data: {
          completedAt: task.completedAt ? null : new Date(),
        },
        where: {
          id: task.id,
        },
      })
    }),
})
