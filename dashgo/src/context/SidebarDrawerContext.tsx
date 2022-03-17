import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createContext, ReactNode, useContext, useEffect} from 'react'

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn

//Quais dados guardo dentro do contexto
const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure()
  const router = useRouter();
 
  /*
    Para fechar o menu toda vez que clicar na opção, vamos usar 
    o router do next para verificar se mudou o caminho da rota e disparar uma função
  */
  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath])

  return(
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);