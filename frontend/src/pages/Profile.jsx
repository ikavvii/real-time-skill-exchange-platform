import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user.name) return (
    <Box mt={10} p={6} maxW="md" mx="auto">
      <Text>You need to log in to view your profile. <Button onClick={() => navigate('/login')}>Login</Button></Text>
    </Box>
  )

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Heading size="md" mb={2}>Profile</Heading>
      <VStack align="start" spacing={2}>
        <Text><b>Name:</b> {user.name}</Text>
        <Text><b>Email:</b> {user.email || "Not shown"}</Text>
        <Text><b>Skills to Teach:</b> {user.skillsToTeach && user.skillsToTeach.join(", ")}</Text>
      </VStack>
      <Button mt={5} colorScheme="red" onClick={logout}>Logout</Button>
    </Box>
  )
}