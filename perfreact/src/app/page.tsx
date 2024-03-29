"use client"

import { useState, FormEvent, useCallback } from "react"
import { SearchResults } from "./components/SearchResults";

type Results = {
  totalPrice: number
  data: any[]
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    const formater = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    //IMPORTANTE: mandar informações com as formatações já realizadas quando for buscar
    const products = data.map((product: any) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formater.format(product.price)
      }
    })

    const totalPrice = data.reduce((total: number, product: any) => {
      return total + product.price
    }, 0)

    setResults({totalPrice, data: products});
  }

  const addToWishList  = useCallback(async (id: number) => {
    console.log("id: ", id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">
          Buscar
        </button>
      </form>

      <SearchResults 
      results={results.data} 
      totalPrice={results.totalPrice}
      onAddToWishlist={addToWishList}/>
    </div>
  )
}

/**
 * useCallback (memorizar função)
 * 
 * 1. Usado em casos em que a função for ser usada por componentes filhos
 */