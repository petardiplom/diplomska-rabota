import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Box } from "@mui/material";
import Spinner from "../components/spinner/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <Spinner />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
