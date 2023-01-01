import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { trpc } from '@src/libs/trpc'

export default function ProjectPage() {
  const router = useRouter()

  const trpcContext = trpc.useContext()
  const projectQuery = trpc.project.byId.useQuery(
    { id: String(router.query.id) },
    { enabled: !!router.query.id },
  )

  const [value, setValue] = useState('')

  const addTask = trpc.task.add.useMutation({
    onSuccess: async () => {
      await trpcContext.project.byId.invalidate()
      setValue('')
    },
  })

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await addTask.mutateAsync({
      projectId: String(router.query.id),
      title: value,
    })
  }

  return (
    <Grid
      gap={4}
      h={'full'}
      py={8}
      px={4}
      templateRows={'auto 1px 1fr 1px auto'}
    >
      <Box>
        <Text fontSize={'xs'} color={'gray.600'}>
          ID: {String(router.query.id)}
        </Text>
      </Box>

      <Divider />

      <UnorderedList overflowY={'scroll'}>
        {projectQuery.data?.tasks.map((task) => (
          <ListItem key={task.title}>{task.title}</ListItem>
        ))}
      </UnorderedList>

      <Divider />

      <HStack as={'form'} onSubmit={onSubmit}>
        <Input
          isRequired
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type={'submit'}>追加</Button>
      </HStack>
    </Grid>
  )
}
