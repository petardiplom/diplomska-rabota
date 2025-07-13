import { useModal } from '../contexts/ModalContext';
import AddCenterModal from './AddCenterModal';
import EditServiceModal from './EditServiceModal';

const MODAL_COMPONENTS = {
  addCenter: AddCenterModal,
  editService: EditServiceModal
};

const GlobalModals = () => {
  const { modalId, closeModal, modalProps } = useModal();
  const ModalComponent = MODAL_COMPONENTS[modalId] || null;

  return ModalComponent ? (
    <ModalComponent open onClose={closeModal} {...modalProps} />
  ) : null;
};

export default GlobalModals;