import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
import { AddProductToWIshListProps } from './AddProductToWIshList'
// import { AddProductToWIshList } from './AddProductToWIshList'

const AddProductToWIshList = dynamic<AddProductToWIshListProps>(() => {
  return import('./AddProductToWIshList').then(mod => mod.AddProductToWIshList)
}, { loading: () => <span>Carregando ...</span> })

interface ProductItemProps {
  product: {
    id: number,
    price: number,
    priceFormatted: string,
    title: string
  }
  onAddToWishlist: (id: number) => void
}

//shalloow compare -> comparação rasa (verifica a igualdade as informações dentro da propriedade)

//{} === {} // false
/*igualdade referencial, compara se os objetos ocupam a mesma 
posição da memória*/

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps): any {

  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>
      {
        isAddingToWishlist &&
        <AddProductToWIshList
          onAddToWishList={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      }
    </div>
  )
}

export const ProductItem: any = memo(ProductItemComponent, (prevProps, nextProps) => {
  //condição para satisfazer se vai ter informações iguais ou não
  return Object.is(prevProps.product, nextProps.product)
})