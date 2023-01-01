import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  useClipboard,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { UpdateProjectNameForm } from '@src/features/project/components/UpdateProjectNameForm'
import { AddTaskForm } from '@src/features/task/components/AddTaskForm'
import { trpc } from '@src/libs/trpc'

export default function ProjectPage() {
  const router = useRouter()

  const { hasCopied, onCopy, setValue } = useClipboard('')

  const { data, isLoading } = trpc.project.byId.useQuery(
    { id: String(router.query.id) },
    { enabled: !!router.query.id },
  )

  useEffect(() => {
    setValue(process.env.NEXT_PUBLIC_APP_URL + router.asPath)
  }, [router.asPath, setValue])

  return (
    <Grid gap={4} h={'full'} p={4} templateRows={'auto 1px 1fr 1px auto'}>
      <Box>
        <Skeleton isLoaded={!isLoading} height={'32px'}>
          {data && <UpdateProjectNameForm project={data} />}
        </Skeleton>
        <Skeleton isLoaded={!isLoading} mt={1} height={'18px'}>
          <HStack>
            <Text fontSize={'xs'} color={'gray.400'} mt={1}>
              ID: {data?.id}
            </Text>
            <Button variant={'outline'} size={'xs'} onClick={onCopy}>
              {hasCopied ? 'コピーしました！' : '共有URLをコピー'}
            </Button>
          </HStack>
        </Skeleton>
      </Box>

      <Divider />

      <Skeleton isLoaded={!isLoading}>
        <UnorderedList overflowY={'scroll'}>
          {data?.tasks.map((task) => (
            <ListItem key={task.id}>{task.title}</ListItem>
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
