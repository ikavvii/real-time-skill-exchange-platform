import { useState, useEffect } from "react"
import { Box, Heading, Input, Button, VStack, Text, List, ListItem, Link } from "@chakra-ui/react"
import { API_BASE } from "../config"
import { Link as RouterLink } from "react-router-dom"

export default function Requests() {
  const [requests, setRequests] = useState([])
  const [skill, setSkill] = useState("")
  const [desc, setDesc] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`${API_BASE}/api/requests`)
      .then(res => res.json())
      .then(data => setRequests(data))
  }, [])

  async function postRequest() {
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    if (!user.id) {
      setError("You must log in to post a request.")
      return
    }
    const resp = await fetch(`${API_BASE}/api/requests`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill, description: desc, requester: user.id })
    })
    const data = await resp.json()
    if (resp.ok) {
      setSkill("")
      setDesc("")
      setRequests(rs => [...rs, { skill, description: desc, requester: { name: user.name } }])
      setError("")
    } else setError(data.error || "Failed to post")
  }

  return (
    <Box maxW="lg" mx="auto" mt={10} p={5}>
      <Heading size="md" mb={3}>Request Help</Heading>
      <VStack spacing={2}>
        <Input value={skill} onChange={e => setSkill(e.target.value)} placeholder="Skill needed (e.g., JavaScript)" />
        <Input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe your issue" />
        <Button colorScheme="teal" onClick={postRequest}>Post Request</Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
      <Heading size="md" mt={8} mb={2}>Active Requests</Heading>
      <List spacing={2}>
        {requests.map((r, i) => (
          <ListItem key={i} borderWidth={1} borderRadius="md" p={3}>
            <Text fontWeight="bold">{r.skill}</Text>
            <Text>{r.description}</Text>
            <Text fontSize="sm">By: {r.requester?.name || "Anonymous"}</Text>
            <Button as={RouterLink} to={`/chat/${r._id}`} size="sm" mt={2} colorScheme="teal">
              Join Chat
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}