import {
  Button,
  Flex,  Stack
} from '@chakra-ui/react';
import {Input} from '../components/Form/Input';
import * as yup from 'yup';
import {SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres')
})

export default function SignIn() {
  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const {errors} = formState;
  const handleSignIn:SubmitHandler<SignInFormData> = async (values) =>{
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('values: ', values);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8" //padding de 8 -  medida do chakra
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
            <Input name="email" type="email" label="E-mail"  {...register('email')} error={errors.email}/>
            <Input name="password" type="password" label="Password"  {...register('password')} error={errors.password}/>
        </Stack>
        <Button type='submit' mt='6' colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Entrar</Button>
      </Flex>
    </Flex>
  )
}
