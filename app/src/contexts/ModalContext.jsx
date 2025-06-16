import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalId, setModalId] = useState(null);
  const [modalProps, setModalProps] = useState({});

  const openModal = (id, props = {}) => {
    setModalId(id);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalId(null);
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{ modalId, modalProps, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
