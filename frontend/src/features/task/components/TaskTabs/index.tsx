import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Project, Task } from '@prisma/client'
import { useMemo } from 'react'

import { TaskList } from '@src/features/task/components/TaskList'

type Props = {
  project: Project & { tasks: Task[] }
}

export const TaskTabs = ({ project }: Props) => {
  const incompleteTasks = useMemo(() => {
    return project.tasks.filter((task) => !task.completedAt)
  }, [project.tasks])

  const completedTasks = useMemo(() => {
    return project.tasks.filter((task) => !!task.completedAt)
  }, [project.tasks])

  return (
    <Tabs size={'sm'} variant={'soft-rounded'}>
      <TabList>
        <Tab>未完了</Tab>
        <Tab>完了済み</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <TaskList tasks={incompleteTasks} />
        </TabPanel>
        <TabPanel>
          <TaskList tasks={completedTasks} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
