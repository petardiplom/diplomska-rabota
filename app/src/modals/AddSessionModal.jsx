import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateSession from "../pages/calendar/sessions";

const AddSessionModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>Add session</DialogTitle>
        <IconButton onClick={onClose} sx={{ mr: 2 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers>
        <CreateSession onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSessionModal;
