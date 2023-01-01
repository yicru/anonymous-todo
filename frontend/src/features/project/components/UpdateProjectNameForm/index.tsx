import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Input,
} from '@chakra-ui/react'

import { ProjectNameEditableControl } from '@src/features/project/components/ProjectNameEditableControl'
import { RouterOutput, trpc } from '@src/libs/trpc'

type Props = {
  project: RouterOutput['project']['byId']
}

export const UpdateProjectNameForm = ({ project }: Props) => {
  const trpcContext = trpc.useContext()

  const updateProjectName = trpc.project.update.useMutation({
    onSuccess: async () => {
      await trpcContext.project.byId.invalidate()
    },
  })

  const onSubmit = async (name: string) => {
    await updateProjectName.mutateAsync({
      id: project.id,
      name,
    })
  }

  return (
    <Editable
      defaultValue={project.name}
      isPreviewFocusable={false}
      onSubmit={onSubmit}
    >
      <HStack>
        <EditablePreview />
        <Input as={EditableInput} size={'sm'} />
        <ProjectNameEditableControl size={'xs'} />
      </HStack>
    </Editable>
  )
}
