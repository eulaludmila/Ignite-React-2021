import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

//Controlled component
//Uncontrolled component

//Imperativa - diz o que queremos (exemplo: focar no input manualmente)
// Declarativa - quando espero através de uma ação (exemplo: através de alguma ação de uma condição)

export default function SearchBox() {

  const searchInputRef = useRef<HTMLInputElement>(null);

  console.log("searchInputRef: ", searchInputRef.current.value);

  return (
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
        ref={searchInputRef}
      />

      <Icon as={RiSearchLine} fontSize="28" />
    </Flex>
  )
}