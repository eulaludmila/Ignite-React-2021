import { useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { ContainerButton } from './style';

interface ConfirmationModalProps {
  closeModal: () => void,
  isOpenModal: boolean,
  removeTransaction: () => void,
}


export default function ConfirmationModal({closeModal,isOpenModal,removeTransaction}:ConfirmationModalProps) {

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content-confirmation"
    >

      <button type="button" onClick={closeModal} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <p>Tem certeza que deseja excluir essa transação?</p>

      <ContainerButton>
        <button type="button" data-name="cancel" onClick={closeModal}> Cancelar </button>
        <button type="button" data-name="remove" onClick={removeTransaction}> Excluir </button>
      </ContainerButton>
    </Modal>
  )
}