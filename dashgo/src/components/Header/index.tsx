import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../context/SidebarDrawerContext';
import Logo from './Logo';
import NotificationsNav from './NotificationsNav';
import Profile from './Profile';
import SearchBox from './SearchBox';

export function Header() {
  const { onOpen } = useSidebarDrawer();

  //Criando breakpoint para quando estiver no celular não aparecer, e no large aparecer
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex 
    w="100%" 
    as="header" 
    maxWidth={1480} 
    h="20" 
    mx="auto" 
    mt="4" 
    px="6"
    align="center">
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="28"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}

      <Logo />
      {
        isWideVersion && (
          <SearchBox />
        )
      }

      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}