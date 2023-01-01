import { projectRouter } from '@src/server/routers/project'
import { taskRouter } from '@src/server/routers/task'
import { router } from '@src/server/trpc'

export const appRouter = router({
  project: projectRouter,
  task: taskRouter,
})

export type AppRouter = typeof appRouter
