import { Text } from "@chakra-ui/react";

export default function Logo() {
  return (
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
  )
}