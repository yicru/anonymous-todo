import { z } from 'zod'

import { procedure, router } from '@src/server/trpc'

type Task = {
  value: string
}

const taskList: Task[] = [
  {
    value: 'task 1',
  },
]

export const taskRouter = router({
  add: procedure
    .input(
      z.object({
        value: z.string().min(1),
      }),
    )
    .mutation(({ input }) => {
      taskList.push(input)
      return input
    }),
  list: procedure.query(() => {
    return taskList
  }),
})
