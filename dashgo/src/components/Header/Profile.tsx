import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export default function Profile({showProfileData = true}: ProfileProps) {
  return (
    <Flex align="center">
      {
        showProfileData && (
          <Box mr="4" textAlign="right">
            <Text>Eula Ludmila</Text>
            <Text color="gray.300" fontSize="small">eulaludimila12@gmail.com</Text>
          </Box>
        )
      }
      <Avatar size="md" name="Eula Ludmila" src="https://github.com/eulaludmila.png" />
    </Flex>
  )
}