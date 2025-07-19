import { Navigate, Outlet } from "react-router-dom";
import { useCenter } from "../contexts/CenterContext";
import Spinner from "../components/spinner/Spinner";

const CenterLayout = () => {
  const { center, isLoading, error } = useCenter();

  if (isLoading) return <Spinner />;
  if (!center) return <Navigate to="/centers" />;
  if (error) return <Navigate to="/centers" />;

  return <Outlet />;
};

export default CenterLayout;
