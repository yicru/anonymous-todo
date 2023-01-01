import { List, StackDivider, VStack } from '@chakra-ui/react'
import { Task } from '@prisma/client'

import { TaskListItem } from '@src/features/task/components/TaskListItem'

type Props = {
  tasks: Task[]
}

export const TaskList = ({ tasks }: Props) => {
  return (
    <VStack as={List} divider={<StackDivider />}>
      {tasks.map((task) => (
        <TaskListItem w={'full'} key={task.id} task={task} />
      ))}
    </VStack>
  )
}
