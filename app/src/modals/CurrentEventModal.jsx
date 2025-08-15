import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { printDateTime, printPrice, printTime } from "../utils/printUtils";
import { useCancelReservation } from "../hooks/apiHooks/useReservations";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useStaff } from "../hooks/apiHooks/useStaff";
import { useState } from "react";

const CustomTitleSubtitle = ({ primary, secondary }) => (
  <Box margin={1}>
    <Typography variant="subtitle2" color="textSecondary">
      {primary}
    </Typography>
    <Typography variant="body1">{secondary}</Typography>
  </Box>
);
const CurrentEventModal = ({ open, onClose, event }) => {
  const [confirm, setConfirm] = useState(false);

  const { mutate } = useCancelReservation();

  const { data: staff } = useStaff();

  const handleCancel = () => {
    mutate(
      { reservationId: event.id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const cancelledBy = staff?.find((x) => x.id === event.cancelled_by);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {confirm
          ? `Confirm cancellation`
          : `${event.title} - ${event.subservice_name}`}
      </DialogTitle>
      <DialogContent dividers>
        {confirm ? (
          <Typography variant="body1">
            Are you sure you want to cancel this reservation?
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column">
            <CustomTitleSubtitle
              primary="Service"
              secondary={event.subservice_name}
            />
            <CustomTitleSubtitle
              primary="Customer"
              secondary={event.customer_email}
            />
            <CustomTitleSubtitle
              primary="Staff"
              secondary={event.staff_email}
            />
            <CustomTitleSubtitle
              primary="Period"
              secondary={`${printDateTime(event.start)} - ${printTime(
                event.end
              )}`}
            />
            <CustomTitleSubtitle
              primary="Price & Duration"
              secondary={`${printPrice(event.price)} for ${
                event.duration
              } minutes`}
            />

            <Box margin={1}>
              <Typography variant="subtitle2" color="textSecondary">
                Status
              </Typography>
              <Chip
                icon={
                  event.status === "active" ? (
                    <CheckCircleIcon />
                  ) : (
                    <CancelIcon />
                  )
                }
                size="small"
                color={event.status === "active" ? "success" : "error"}
                label={event.status === "active" ? "Active" : "Cancelled"}
              />
            </Box>

            {cancelledBy && cancelledBy.email && (
              <Box margin={1}>
                <Typography variant="subtitle2" color="textSecondary">
                  Cancelled by
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {`${cancelledBy.email} at ${printDateTime(
                    event.cancelled_at
                  )}`}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="row" gap={1}>
          {confirm ? (
            <>
              <Button
                key="confirm-button"
                onClick={handleCancel}
                variant="outlined"
                color="error"
                disabled={event.status === "cancelled"}
              >
                Confirm
              </Button>
              <Button
                key="decline-button"
                variant="outlined"
                onClick={() => setConfirm(false)}
              >
                Decline
              </Button>
            </>
          ) : (
            <>
              <Button
                key="cancel-button"
                onClick={() => setConfirm(true)}
                variant="outlined"
                color="error"
                disabled={event.status === "cancelled"}
              >
                Cancel reservation
              </Button>
              <Button key="close-button" variant="outlined" onClick={onClose}>
                Close
              </Button>
            </>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CurrentEventModal;
