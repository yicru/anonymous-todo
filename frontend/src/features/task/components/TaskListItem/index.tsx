import {
  Checkbox,
  HStack,
  ListItem,
  ListItemProps,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { Task } from '@prisma/client'
import { format } from 'date-fns'

import { trpc } from '@src/libs/trpc'

type Props = {
  task: Task
} & ListItemProps

export const TaskListItem = ({ task, ...listItemProps }: Props) => {
  const trpcContext = trpc.useContext()
  const toggleTask = trpc.task.toggle.useMutation({
    onSuccess: async () => {
      await trpcContext.project.byId.invalidate()
    },
  })

  const onChecked = async () => {
    await toggleTask.mutateAsync({ id: task.id })
  }

  return (
    <ListItem {...listItemProps}>
      <HStack>
        <Checkbox isChecked={!!task.completedAt} onChange={onChecked}>
          {task.title}
        </Checkbox>
        <Spacer />
        {task.completedAt && (
          <Text fontSize={'xs'} color={'gray.600'}>
            完了日時：{format(task.completedAt, 'yyyy/M/d HH:mm')}
          </Text>
        )}
      </HStack>
    </ListItem>
  )
}
