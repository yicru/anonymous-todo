import {
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react'
import { HiCheck, HiPencil, HiX } from 'react-icons/hi'

type Props = ButtonGroupProps

export const ProjectNameEditableControl = ({ ...buttonGroupProps }: Props) => {
  const {
    getCancelButtonProps,
    getEditButtonProps,
    getSubmitButtonProps,
    isEditing,
  } = useEditableControls()

  return (
    <ButtonGroup {...buttonGroupProps}>
      {isEditing ? (
        <>
          <IconButton icon={<HiCheck />} {...getSubmitButtonProps()} />
          <IconButton icon={<HiX />} {...getCancelButtonProps()} />
        </>
      ) : (
        <IconButton icon={<HiPencil />} {...getEditButtonProps()} />
      )}
    </ButtonGroup>
  )
}
