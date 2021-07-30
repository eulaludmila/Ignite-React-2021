import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";

export const TransactionsContext = createContext<Transaction[]>([]);

interface Transaction {
  id: number,
  amount: number,
  title: string,
  category: string,
  type: string,
  createdAt: string,
}

interface TransactionsProps{
  children: ReactNode;
}

export function TransactionsProvider({children}: TransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
}