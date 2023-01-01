import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Skeleton,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { UpdateProjectNameForm } from '@src/features/project/components/UpdateProjectNameForm'
import { AddTaskForm } from '@src/features/task/components/AddTaskForm'
import { TaskTabs } from '@src/features/task/components/TaskTabs'
import { trpc } from '@src/libs/trpc'

export default function ProjectPage() {
  const router = useRouter()

  const { hasCopied, onCopy, setValue } = useClipboard('')

  const projectQuery = trpc.project.byId.useQuery(
    { id: String(router.query.id) },
    { enabled: !!router.query.id },
  )

  useEffect(() => {
    setValue(process.env.NEXT_PUBLIC_APP_ORIGIN + router.asPath)
  }, [router.asPath, setValue])

  return (
    <Grid gap={4} h={'full'} p={4} templateRows={'auto 1px 1fr 1px auto'}>
      <Box>
        <Skeleton isLoaded={!projectQuery.isLoading} height={'32px'}>
          {projectQuery.data && (
            <UpdateProjectNameForm project={projectQuery.data} />
          )}
        </Skeleton>
        <Skeleton isLoaded={!projectQuery.isLoading} mt={1} height={'18px'}>
          <HStack>
            <Text fontSize={'xs'} color={'gray.400'} mt={1}>
              ID: {projectQuery.data?.id}
            </Text>
            <Button variant={'outline'} size={'xs'} onClick={onCopy}>
              {hasCopied ? 'コピーしました！' : '共有URLをコピー'}
            </Button>
          </HStack>
        </Skeleton>
      </Box>

      <Divider />

      <Skeleton isLoaded={!projectQuery.isLoading}>
        {projectQuery.data && <TaskTabs project={projectQuery.data} />}
      </Skeleton>

      <Divider />

      <Skeleton isLoaded={!projectQuery.isLoading} height={'40px'}>
        {projectQuery.data && <AddTaskForm project={projectQuery.data} />}
      </Skeleton>
    </Grid>
  )
}
