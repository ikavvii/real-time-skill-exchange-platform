import { useState } from 'react'
import { Box, Heading, Input, Button, VStack, Text } from '@chakra-ui/react'
import { API_BASE } from '../config'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleLogin() {
    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        // Save user data in localStorage for now
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/profile')
      } else {
        setError(data.message || "Login failed")
      }
    } catch {
      setError("Network error")
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Heading mb={4} size="md">Login</Heading>
      <VStack spacing={3}>
        <Input name="email" placeholder="Email" onChange={handleChange} />
        <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <Button w="full" colorScheme="teal" onClick={handleLogin}>Login</Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  )
}