import { useMemo } from 'react'
import { ProductItem } from "./ProductItem";
import { List, AutoSizer, ListRowRenderer } from 'react-virtualized'

interface SearchResultsProps {
  results: Array<{
    id: number,
    price: number,
    priceFormatted: string,
    title: string
  }>
  totalPrice: number
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ results, onAddToWishlist, totalPrice }: SearchResultsProps) {
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price
  //   }, 0)
  // }, [results])

  const rowRenderer: ListRowRenderer = ({
    index, key, style
  }) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]}
          onAddToWishlist={onAddToWishlist} />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>
        {/* Vitualização para scroll infinito em que só apareça itens que cabem na tela */}
        <AutoSizer>
          {
            ({ width, height }) => (
              <List
                height={height}
                rowHeight={30}
                width={width}
                overscanRowCount={5}//itens pré carregados
                rowCount={results.length}
                rowRenderer={rowRenderer}
              />
            )
          }
        </AutoSizer>

    </div>
  )
}


/*
* 1. Cria um nova versão do componente
* 2. Comparar com a versão anterior
* 3. Se houverem alterações, vai atualizar o que alterou
*/

/** Onde aplicar memo (vale a pena)
 * 1. Pure Functional Components (Renderiza o mesmo resultado no HTML, por exemplo)
 * 2. Renders too often (Renderiza demais)
 * 3. Re-renders with same props
 * 4. Medium to big size (não traz muitos ganhos em performance em componente pequeno)
 */

/**
 * useMemo (memorizar valor)
 * 
 * 1. Cálculos pesados (por ter custo de processamento pode não fazer efeito em coisas simples)
 * 2. Igualdade referencial, quando passa alguma informação para o componente filho mesmo que cálculo simples
 */
