import {
  Box,
  Divider,
  Grid,
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { UpdateProjectNameForm } from '@src/features/project/components/UpdateProjectNameForm'
import { AddTaskForm } from '@src/features/task/components/AddTaskForm'
import { trpc } from '@src/libs/trpc'

export default function ProjectPage() {
  const router = useRouter()

  const { data, isLoading } = trpc.project.byId.useQuery(
    { id: String(router.query.id) },
    { enabled: !!router.query.id },
  )

  return (
    <Grid gap={4} h={'full'} p={4} templateRows={'auto 1px 1fr 1px auto'}>
      <Box>
        <Skeleton isLoaded={!isLoading} height={'32px'}>
          {data && <UpdateProjectNameForm project={data} />}
        </Skeleton>
        <Skeleton isLoaded={!isLoading} mt={1} height={'18px'}>
          <Text fontSize={'xs'} color={'gray.400'} mt={1}>
            ID: {data?.id}
          </Text>
        </Skeleton>
      </Box>

      <Divider />

      <Skeleton isLoaded={!isLoading}>
        <UnorderedList overflowY={'scroll'}>
          {data?.tasks.map((task) => (
            <ListItem key={task.title}>{task.title}</ListItem>
          ))}
        </UnorderedList>
      </Skeleton>

      <Divider />

      <Skeleton isLoaded={!isLoading} height={'40px'}>
        {data && <AddTaskForm project={data} />}
      </Skeleton>
    </Grid>
  )
}
