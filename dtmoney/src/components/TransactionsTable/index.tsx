import { Container } from "./styles"

export function TransactionsTable(){
  return(
    <Container>
      <table>
        <thead>
          <tr>
            <td>Título</td>
            <td>Valor</td>
            <td>Categoria</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento de Website</td>
            <td className="deposit">R$12.000,00</td>
            <td>Desenvolvimento</td>
            <td>10/01/2021</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$1.100,00</td>
            <td>Casa</td>
            <td>17/02/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}