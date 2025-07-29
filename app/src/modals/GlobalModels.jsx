import { useModal } from "../contexts/ModalContext";
import AddCenterModal from "./AddCenterModal";
import AddReservationModal from "./AddReservationModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditServiceModal from "./EditServiceModal";
import EditSubserviceModal from "./EditSubserviceModal";
import ImageModal from "./ImageModal";
import UploadImageModal from "./UploadImageModal";

const MODAL_COMPONENTS = {
  addCenter: AddCenterModal,
  editService: EditServiceModal,
  editSubservice: EditSubserviceModal,
  confirmDelete: ConfirmDeleteModal,
  previewImage: ImageModal,
  uploadImage: UploadImageModal,
  createReservation: AddReservationModal,
};

const GlobalModals = () => {
  const { modalId, closeModal, modalProps } = useModal();
  const ModalComponent = MODAL_COMPONENTS[modalId] || null;

  return ModalComponent ? (
    <ModalComponent open onClose={closeModal} {...modalProps} />
  ) : null;
};

export default GlobalModals;
