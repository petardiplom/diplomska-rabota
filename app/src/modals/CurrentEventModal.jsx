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
import { useStaff } from "../hooks/apiHooks/useStaff";

const CustomTitleSubtitle = ({ primary, secondary }) => (
  <Box margin={1}>
    <Typography variant="subtitle2" color="textSecondary">
      {primary}
    </Typography>
    <Typography variant="body1">{secondary}</Typography>
  </Box>
);
const CurrentEventModal = ({ open, onClose, event }) => {
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
        {event.title} - {event.subservice_name}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column">
          <CustomTitleSubtitle
            primary="Service"
            secondary={event.subservice_name}
          />
          <CustomTitleSubtitle
            primary="Customer"
            secondary={event.customer_email}
          />
          <CustomTitleSubtitle primary="Staff" secondary={event.staff_email} />
          <CustomTitleSubtitle
            primary="Period"
            secondary={`${printDateTime(event.start)} - ${printTime(
              event.end
            )}`}
          />
          <CustomTitleSubtitle
            primary="Price"
            secondary={printPrice(event.price)}
          />
          <CustomTitleSubtitle primary="Duration" secondary={event.duration} />
          <Box margin={1}>
            <Typography variant="subtitle2" color="textSecondary">
              Status
            </Typography>
            <Chip
              size="small"
              color={event.status === "active" ? "success" : "error"}
              label={event.status}
            />
          </Box>
          {cancelledBy && cancelledBy.email && (
            <Box margin={1}>
              <Typography variant="subtitle2" color="textSecondary">
                Cancelled by
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {`${cancelledBy.email} at ${printDateTime(event.cancelled_at)}`}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="error"
            disabled={event.status === "cancelled"}
          >
            Cancel reservation
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CurrentEventModal;
