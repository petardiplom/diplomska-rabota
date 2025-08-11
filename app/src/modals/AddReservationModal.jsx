import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
} from "@mui/material";
import CreateReservation from "../pages/calendar/reservation";
import CloseIcon from "@mui/icons-material/Close";

const AddReservationModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>Add reservation</DialogTitle>
        <IconButton onClick={onClose} sx={{ mr: 2 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers>
        <CreateReservation onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddReservationModal;
