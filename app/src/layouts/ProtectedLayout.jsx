import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Box } from "@mui/material";
import Layout from "./Layout";
import Spinner from "../components/spinner/Spinner";

const ProtectedLayout = () => {
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

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedLayout;
