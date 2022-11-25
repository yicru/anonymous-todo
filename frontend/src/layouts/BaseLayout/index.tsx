import { Box, Container, Grid } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <Box bg={'gray.50'}>
      <Container
        as={Grid}
        bg={'white'}
        templateColumns={'100%'}
        templateRows={'1fr'}
        sx={{
          '&': {
            height: '100dvh',
          },
          height: '100vh',
        }}
      >
        <Box sx={{ overflow: 'scroll' }}>{children}</Box>
      </Container>
    </Box>
  )
}
