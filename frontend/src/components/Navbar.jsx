import { Box, Flex, Link, Spacer, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <Box bg="teal.500" px={4} py={2} color="white">
      <Flex align="center">
        <Link as={RouterLink} to="/" fontWeight="bold" fontSize="xl" mr={4}>
          SkillSync
        </Link>
        <Spacer />
        <Link as={RouterLink} to="/requests" mr={4}>Requests</Link>
        <Button as={RouterLink} to="/profile" variant="outline" colorScheme="whiteAlpha">
          Profile
        </Button>
        <Button as={RouterLink} to="/login" ml={4} colorScheme="whiteAlpha" variant="solid">
          Login
        </Button>
      </Flex>
    </Box>
  )
}