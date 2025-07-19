import { Box, Paper } from "@mui/material";

const ErrorComponent = ({ refetch }) => {
  return (
    <Paper elevation={3}>
      <Box
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Box textAlign="center">
          <div>⚠️ Failed to load data.</div>
          <div style={{ fontSize: 14, color: "#666" }}>
            Please try again later.
          </div>
          <Box mt={2}>
            <button onClick={() => refetch()}>Retry</button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ErrorComponent;
