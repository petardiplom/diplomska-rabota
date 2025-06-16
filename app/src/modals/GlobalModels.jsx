import { useModal } from '../contexts/ModalContext';
import AddCenterModal from './AddCenterModal';

const GlobalModals = () => {
  const { modalId, closeModal } = useModal();

  return (
    <>
      {modalId === 'addCenter' && (
        <AddCenterModal
          open
          onClose={closeModal}
        />
      )}

      {/* Future modals: */}
      {/* modalId === 'editUser' && <EditUserModal ... /> */}
    </>
  );
};

export default GlobalModals;