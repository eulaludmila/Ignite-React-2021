import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

//terá todas as outras propriedades do input do chakra
interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest },
  ref
) => {
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
        ref={ref}
        {...rest}
      />
    </FormControl>
  )
}

//forwardRef faz o encaminhamento da ref. Usada para que consigamos usar ref no componente, pois não podemos só passar a propriedade ref, pois não existe fazer isso
export const Input = forwardRef(InputBase);