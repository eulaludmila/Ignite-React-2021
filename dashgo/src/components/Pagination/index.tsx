import { Stack, Box, Text} from '@chakra-ui/react'
import PaginationItem from './PaginationItem'

interface PaginationProps{
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

/*Quantidade de páginas que quero exibir na página atual (5)
1 ... 4 5 6 ... 10
*/
const siblingsCount = 1;
function generatePagesArray(from: number, to:number){
  //to = 5 ; from = 2
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  }).filter( page => page > 0)
}

//prop drilling - repassar uma prop de pai para filho...

export default function Pagination({ 
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
 }: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);
  const previousPages = currentPage > 1 
  ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
  : [];
  const  nextPages =  currentPage < lastPage
  ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
  : [];
  return (
    <Stack
      direction={["column","row"]}
      mt="8"
      justify="space-between"
      align='center'
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>{registersPerPage}</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {
          currentPage > (1+siblingsCount) && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1}/>
              {currentPage > (1 + siblingsCount) && <Text color="gray.300" width={8} textAlign="center">...</Text>}
            </>
          )
        }

        
        {
          previousPages.length > 0 && previousPages.map(page => (
            <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
          ))
        }

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent/>
        {
          currentPage === 1 && <PaginationItem onPageChange={onPageChange} number={2}/>
        }
        {
          previousPages.length > 0 && nextPages.map(page => (
            <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
          ))
        }

        
        {
          (currentPage + siblingsCount) < lastPage && (
            <>
                {(currentPage + 1 + siblingsCount) < lastPage && <Text color="gray.300" width={8} textAlign="center">...</Text>}
                <PaginationItem onPageChange={onPageChange} number={lastPage}/>
            </>
          )
        }
      </Stack>
    </Stack>
  )
}