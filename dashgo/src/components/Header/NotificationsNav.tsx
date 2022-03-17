import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export default function NotificationsNav() {
  return (
    <>
      {/* Horizontal Stack - Espaçamento Horizontal */}
      < HStack 
      spacing={["6","8"]}
      mx={["6","8"]}
      pr={["6","8"]} 
      py="1" 
      color="gray.300" 
      borderRightWidth={1} 
      borderColor="gray.700" >
        <Icon as={RiNotificationLine} fontSize={28} />
        <Icon as={RiUserAddLine} fontSize={28} />
      </HStack >
    </>
  )
}