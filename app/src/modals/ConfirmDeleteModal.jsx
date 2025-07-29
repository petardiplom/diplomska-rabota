import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm archive",
  buttonTitle = "Archive",
  message = "Are you sure you want to archive?",
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="error"
          variant="contained"
          autoFocus
        >
          {buttonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
