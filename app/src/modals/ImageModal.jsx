import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImageModal = ({ open, onClose, selectedImage }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ position: "relative", p: 0 }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>
        {selectedImage && (
          <img
            src={selectedImage.imageUrl}
            alt={selectedImage.title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
