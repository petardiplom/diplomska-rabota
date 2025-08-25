import CustomTitleSubtitle from "./CustomTitleSubtitle";
import { printDateTime, printPrice, printTime } from "../../utils/printUtils";
import { Box, Typography } from "@mui/material";
import StatusChip from "./StatusChip";

const Fields = ({ event, cancelledBy }) => {
  return (
    <>
      <CustomTitleSubtitle
        primary="Service"
        secondary={event.subservice_name}
      />
      <CustomTitleSubtitle primary="Staff" secondary={event.staff_email} />
      <CustomTitleSubtitle
        primary="Period"
        secondary={`${printDateTime(event.start)} - ${printTime(event.end)}`}
      />
      <CustomTitleSubtitle
        primary="Price & Duration"
        secondary={`${printPrice(event.price)} for ${event.duration} minutes`}
      />

      <Box margin={1}>
        <Typography variant="subtitle2" color="textSecondary">
          Status
        </Typography>
        <StatusChip status={event.status} />
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
    </>
  );
};

export default Fields;
