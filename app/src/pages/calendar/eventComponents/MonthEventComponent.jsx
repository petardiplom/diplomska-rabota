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

const MonthEventComponent = ({ event }) => {
  return (
    <Box display="flex" flexDirection="column">
      <CustomTypography>
        {event.title} - {event.subservice_name}
      </CustomTypography>
      <CustomTypography>
        {`${printTime(event.start)} - ${printTime(event.end)}`}
      </CustomTypography>
      <CustomTypography>{event.customer_email}</CustomTypography>
    </Box>
  );
};

export default MonthEventComponent;
