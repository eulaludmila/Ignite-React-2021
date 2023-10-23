export interface AddProductToWIshListProps {
  onAddToWishList: () => void;
  onRequestClose: () => void
}

export function AddProductToWIshList({
  onAddToWishList,
  onRequestClose
}: AddProductToWIshListProps
) {
  return(
    <span>
      Deseja adicionar aos favoritos?

      <button onClick={onAddToWishList}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </span>
  )
}