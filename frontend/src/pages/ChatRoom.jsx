import React, { useState, useEffect } from 'react'
import { Box, Heading, VStack, Input, Button, Text } from '@chakra-ui/react'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function ChatRoom() {
  const { requestId } = useParams()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const username = user.name || "Guest"
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (!requestId) return
    const newSocket = io(SOCKET_URL, { transports: ['websocket'] })
    setSocket(newSocket)
    newSocket.emit('joinRoom', { roomId: requestId, username })

    newSocket.on('message', (msg) =>
      setMessages(msgs => [...msgs, msg])
    )

    return () => {
      newSocket.emit('leaveRoom', { roomId: requestId, username })
      newSocket.disconnect()
    }
  }, [requestId, username])

  const send = (e) => {
    e.preventDefault()
    if (input && socket) {
      socket.emit('sendMessage', { roomId: requestId, username, text: input })
      setInput('')
    }
  }

  return (
    <Box maxW="lg" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="md">
      <Heading size="md" mb={2}>Live Chat</Heading>
      <VStack align="stretch" spacing={2} maxH={200} overflowY="auto" borderColor="gray.200" borderWidth={1} mb={4} p={2}>
        {messages.map((msg, i) => (
          <Box key={i} p={1}>
            <Text as="span" fontWeight="bold">{msg.username}:</Text>{" "}
            <Text as="span">{msg.text}</Text>
            <Text as="span" fontSize="xs" color="gray.400" ml={2}>{new Date(msg.time).toLocaleTimeString()}</Text>
          </Box>
        ))}
      </VStack>
      <form onSubmit={send}>
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Type message..." mb={2} />
        <Button type="submit" colorScheme="teal" w="full">Send</Button>
      </form>
    </Box>
  )
}