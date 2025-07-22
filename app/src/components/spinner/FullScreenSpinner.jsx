import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

const FullScreenSpinner = ({ open, progress = null }) => {
  return (
    <Backdrop
      open={open}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
    >
      <Box textAlign="center">
        <CircularProgress size={80} color="inherit" />
        {progress && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Uploading... {progress}%
          </Typography>
        )}
      </Box>
    </Backdrop>
  );
};

export default FullScreenSpinner;
