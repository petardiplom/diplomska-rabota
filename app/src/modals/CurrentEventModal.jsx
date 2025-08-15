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

const CustomTitleSubtitle = ({ primary, secondary }) => (
  <Box margin={1}>
    <Typography variant="subtitle2" color="textSecondary">
      {primary}
    </Typography>
    <Typography variant="body1">{secondary}</Typography>
  </Box>
);
const CurrentEventModal = ({ open, onClose, event }) => {
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
              color={event.status === "active" ? "success" : "error"}
              label={event.status}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CurrentEventModal;
