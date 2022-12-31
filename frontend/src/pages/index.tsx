import {
  Box,
  Button,
  HStack,
  Input,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'

import { trpc } from '@src/libs/trpc'

export default function IndexPage() {
  const trpcContext = trpc.useContext()
  const tasksQuery = trpc.task.list.useQuery()

  const [value, setValue] = useState('')

  const addTask = trpc.task.add.useMutation({
    onSuccess: async () => {
      await trpcContext.task.list.invalidate()
      setValue('')
    },
  })

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await addTask.mutateAsync({
      value,
    })
  }

  return (
    <Box py={8} px={4}>
      <HStack as={'form'} onSubmit={onSubmit}>
        <Input
          isRequired
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type={'submit'}>追加</Button>
      </HStack>
      <UnorderedList mt={4}>
        {tasksQuery.data?.map((task) => (
          <ListItem key={task.value}>{task.value}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}
