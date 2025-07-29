import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CreateReservation from "../pages/calendar/reservation";

const AddReservationModal = ({ open, onClose }) => {
  const isLoading = false;
  const handleSubmit = () => {};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add reservation</DialogTitle>
      <DialogContent dividers>
        <CreateReservation />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          variant="contained"
          color="primary"
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReservationModal;
