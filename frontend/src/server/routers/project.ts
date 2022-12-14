import { z } from 'zod'

import { prisma } from '@src/server/prisma'
import { procedure, router } from '@src/server/trpc'

export const projectRouter = router({
  add: procedure.mutation(async () => {
    return await prisma.project.create({
      data: {
        name: '無題のTODOリスト',
      },
    })
  }),
  byId: procedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.project.findUniqueOrThrow({
        include: {
          tasks: true,
        },
        where: {
          id: input.id,
        },
      })
    }),
  update: procedure
    .input(
      z.object({
        id: z.string().cuid(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.project.update({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
        },
      })
    }),
})
