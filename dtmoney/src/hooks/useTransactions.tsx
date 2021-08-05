import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

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

// interface TransactionInput{
//   title:string,
//   category:string,
//   value:number,
//   type:string,
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: (transactionId: number) => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
  );


export function TransactionsProvider({children}: TransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    });
    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction,
    ])
  }

  function removeTransaction(transactionId: number){
    api.delete(`/transactions/${transactionId}`)
      .then(() => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionId);
        setTransactions(updatedTransactions);
      })
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction, removeTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionsContext)

  return context;
}