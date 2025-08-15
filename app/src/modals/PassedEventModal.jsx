import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const PassedEventModal = ({ open, onClose, event }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Passed event: {event.title} - {event.subservice_name}
      </DialogTitle>
      <DialogContent dividers>
        <Typography>{event.customer_email}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PassedEventModal;
