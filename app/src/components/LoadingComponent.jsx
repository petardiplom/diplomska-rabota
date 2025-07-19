import { Box, Paper } from "@mui/material";
import Spinner from "./spinner/Spinner";

const LoadingComponent = () => {
  return (
    <Paper elevation={3}>
      <Box
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Spinner />
      </Box>
    </Paper>
  );
};

export default LoadingComponent;
