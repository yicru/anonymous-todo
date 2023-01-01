import {
  Box,
  Divider,
  Grid,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { UpdateProjectNameForm } from '@src/features/project/components/UpdateProjectNameForm'
import { AddTaskForm } from '@src/features/task/components/AddTaskForm'
import { trpc } from '@src/libs/trpc'

export default function ProjectPage() {
  const router = useRouter()

  const projectQuery = trpc.project.byId.useQuery(
    { id: String(router.query.id) },
    { enabled: !!router.query.id },
  )

  return (
    <Grid gap={4} h={'full'} p={4} templateRows={'auto 1px 1fr 1px auto'}>
      <Box>
        {projectQuery.data && (
          <UpdateProjectNameForm project={projectQuery.data} />
        )}
        <Text fontSize={'xs'} color={'gray.400'} mt={1}>
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

      {projectQuery.data && <AddTaskForm project={projectQuery.data} />}
    </Grid>
  )
}
