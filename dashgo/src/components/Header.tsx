import { Flex, Text, Input, Icon, HStack, Box, Avatar } from '@chakra-ui/react'
import { RiNotificationLine, RiSearchLine, RiUserAddLine } from 'react-icons/ri';

export function Header() {
  return (
    <Flex w="100%" as="header" maxWidth={1480} h="20" mx="auto" mt="4" align="center">
      <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
        mt="4"
        px="6"
        align="center"
      >
        dashgo
        <Text as="span" ml="1" color="pink.500">.</Text>
      </Text>
      <Flex
        as="label"
        flex="1"
        py="4"
        px="6"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          placeholder="Buscar na plataforma"
          px="4"
          mr="4"
          size="md"
          _placeholder={{ color: 'gray.400' }}
        />

        <Icon as={RiSearchLine} fontSize="28" />
      </Flex>

      <Flex
        align="center"
        ml="auto"
      >
        {/* Horizontal Stack - Espaçamento Horizontal */}
        <HStack spacing="8" mx="8" pr="8" py="1" color="gray.300" borderRightWidth={1} borderColor="gray.700"> 
          <Icon as={RiNotificationLine} fontSize={28} />
          <Icon as={RiUserAddLine} fontSize={28} />
        </HStack>

        <Flex align="center">
          <Box mr="4" textAlign="right">
              <Text>Eula Ludmila</Text>
              <Text color="gray.300" fontSize="small">eulaludimila12@gmail.com</Text>
          </Box>
          <Avatar size="md" name="Eula Ludmila" src="https://github.com/eulaludmila.png"/>
        </Flex>
      </Flex>
    </Flex>
  )
}