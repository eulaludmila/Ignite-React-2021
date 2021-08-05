import { Container } from "./styles"
import { useTransactions } from "../../hooks/useTransactions";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import ConfirmationModal from '../ConfirmationModal'

export function TransactionsTable() {
  const { transactions, removeTransaction } = useTransactions();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [idRemove, setIdRemove] = useState(0);

  function handleOpenConfirmationModal(id: number) {
    setIdRemove(id)
    setIsConfirmationModalOpen(true)
  }

  function handleCloseConfirmationModal() {
    setIsConfirmationModalOpen(false)
  }

  function handleRemoveTransaction() {
    removeTransaction(idRemove);
    handleCloseConfirmationModal()
  }

  return (
    <Container>
      <ConfirmationModal
        isOpenModal={isConfirmationModalOpen}
        closeModal={handleCloseConfirmationModal}
        removeTransaction={handleRemoveTransaction} />
      <table>
        <thead>
          <tr>
            <td>Título</td>
            <td>Valor</td>
            <td>Categoria</td>
            <td>Data</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map(transaction =>
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
                </td>
                <td>
                  <MdDelete size={20} style={{ cursor: 'pointer' }} onClick={() => handleOpenConfirmationModal(transaction.id)} />
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </Container>
  )
}