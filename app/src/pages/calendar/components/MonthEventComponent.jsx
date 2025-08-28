import { Box, Typography } from "@mui/material";
import { printTime } from "../../../utils/printUtils";

const CustomTypography = ({ children }) => (
  <Typography
    variant="body2"
    sx={{
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }}
  >
    {children}
  </Typography>
);

const Reservation = ({ event }) => (
  <Box display="flex" flexDirection="column">
    <CustomTypography>
      {event.title} - {event.subservice_name}
    </CustomTypography>
    <CustomTypography>{event.customer_email}</CustomTypography>
    <CustomTypography>
      {`${printTime(event.start)} - ${printTime(event.end)}`}
    </CustomTypography>
  </Box>
);

const Session = ({ event }) => (
  <Box display="flex" flexDirection="column">
    <CustomTypography>{`Capacity: ${event.active_count}/${event.capacity}`}</CustomTypography>
    <CustomTypography>
      {event.title} - {event.subservice_name}
    </CustomTypography>
    <CustomTypography>
      {`${printTime(event.start)} - ${printTime(event.end)}`}
    </CustomTypography>
  </Box>
);

const getComponentByType = (event) => {
  if (event.type === "reservation") {
    return <Reservation event={event} />;
  }
  if (event.type === "session") {
    return <Session event={event} />;
  }
};

const MonthEventComponent = ({ event }) => {
  return getComponentByType(event);
};

export default MonthEventComponent;
