import { taskRouter } from '@src/server/routers/task'
import { router } from '@src/server/trpc'

export const appRouter = router({
  task: taskRouter,
})

export type AppRouter = typeof appRouter
