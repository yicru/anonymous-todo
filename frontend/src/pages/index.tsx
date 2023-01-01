import { Box, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { trpc } from '@src/libs/trpc'

export default function IndexPage() {
  const router = useRouter()

  const addProject = trpc.project.add.useMutation({
    onSuccess: async (project) => {
      await router.push(`/projects/${project.id}`)
    },
  })

  const onCreate = async () => {
    await addProject.mutateAsync()
  }

  return (
    <Box py={8} px={4}>
      <Button onClick={onCreate} w={'full'}>
        リストを作成する
      </Button>
    </Box>
  )
}
