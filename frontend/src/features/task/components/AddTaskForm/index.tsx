import { Button, HStack, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { RouterInput, RouterOutput, trpc } from '@src/libs/trpc'

type AddTaskInput = RouterInput['task']['add']

type Props = {
  project: RouterOutput['project']['byId']
}

export const AddTaskForm = ({ project }: Props) => {
  const trpcContext = trpc.useContext()

  const { handleSubmit, register, resetField } = useForm<AddTaskInput>({
    defaultValues: {
      projectId: project.id,
      title: '',
    },
  })

  const addTask = trpc.task.add.useMutation({
    onSuccess: async () => {
      await trpcContext.project.byId.invalidate()
      resetField('title')
    },
  })

  const onSubmit = async (input: AddTaskInput) => {
    await addTask.mutateAsync({
      projectId: input.projectId,
      title: input.title,
    })
  }

  return (
    <HStack as={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Input isRequired {...register('title')} />
      <Button type={'submit'}>追加</Button>
    </HStack>
  )
}
