//Nosso tema do Chakra UI
import { extendTheme } from '@chakra-ui/react'

//Vou utilizar o theme padrão já existente do chakra e substituir
export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global:{
      body: {
        //usando um padrão de cor do chakra
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
})