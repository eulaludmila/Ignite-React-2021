import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";

//terá todas as outras propriedades do input do chakra
interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
}

export default function Input({name,label, ...rest}: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor='pink.500'
        bgColor="gray.900"
        variant="filled"
        _hover={{ bgColor: 'gray.p00' }}
        size="lg"
        {...rest}
      />
    </FormControl>
  )
}