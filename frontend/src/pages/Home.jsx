import { Box, Center, Heading, Text, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Home() {
  return (
    <Center py={16}>
      <Box>
        <Heading mb={4}>Welcome to SkillSync</Heading>
        <Text mb={8}>Instant skill exchange. Get help or offer help – live!</Text>
        <Button as={RouterLink} to="/register" colorScheme="teal" mr={2}>
          Join Now
        </Button>
        <Button as={RouterLink} to="/requests" colorScheme="gray">
          Browse Requests
        </Button>
      </Box>
    </Center>
  )
}