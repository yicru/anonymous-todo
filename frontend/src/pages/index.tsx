import {
  Box,
  Button,
  HStack,
  Input,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'

export default function IndexPage() {
  const [todos, setTodos] = useState<string[]>([])
  const [value, setValue] = useState('')

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setTodos([...todos, value])
    setValue('')
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
        {todos.map((todo) => (
          <ListItem key={todo}>{todo}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}
