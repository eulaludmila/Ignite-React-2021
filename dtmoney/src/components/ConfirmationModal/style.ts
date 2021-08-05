import styled from 'styled-components'

export const ContainerButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button[data-name=remove]{

    padding: 0 1.5rem;
    height: 3rem;
    background: var(--green);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;
    transition: filter 0.2s;

  }
  button[data-name=cancel]{

    padding: 0 1.5rem;
    height: 3rem;
    background: var(--red);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;
    transition: filter 0.2s;
  }

  button{
    &:hover{
      filter: brightness(0.9);
    }
  }
`