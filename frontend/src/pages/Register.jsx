import { useState } from 'react'
import { Box, Heading, Input, Button, VStack, Text } from '@chakra-ui/react'
import { API_BASE } from '../config'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', bio: '', skillsToTeach: '' })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleRegister() {
    try {
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          skillsToTeach: form.skillsToTeach.split(",").map(s => s.trim())
        })
      })
      const data = await res.json()
      if (res.ok) {
        navigate('/login')
      } else {
        setError(data.message || "Register failed")
      }
    } catch {
      setError("Network error")
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Heading mb={4} size="md">Register</Heading>
      <VStack spacing={3}>
        <Input name="name" placeholder="Name" onChange={handleChange} />
        <Input name="email" placeholder="Email" onChange={handleChange} />
        <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <Input name="bio" placeholder="Short bio" onChange={handleChange} />
        <Input name="skillsToTeach" placeholder="Skills you can teach (comma separated)" onChange={handleChange} />
        <Button w="full" colorScheme="teal" onClick={handleRegister}>Register</Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  )
}