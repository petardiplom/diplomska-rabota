import { Box, Typography } from "@mui/material";

const CustomTitleSubtitle = ({ primary, secondary }) => (
  <Box margin={1}>
    <Typography variant="subtitle2" color="textSecondary">
      {primary}
    </Typography>
    <Typography variant="body1">{secondary}</Typography>
  </Box>
);

export default CustomTitleSubtitle;
