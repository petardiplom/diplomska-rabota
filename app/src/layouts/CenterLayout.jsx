import { Navigate, Outlet } from 'react-router-dom';
import { useCenter } from '../contexts/CenterContext';

const CenterLayout = () => {

  const {center, isLoading, error} = useCenter();


  if (isLoading) return <div>Loading center...</div>;
  if (!center) return <Navigate to="/centers" />;
  if (error) return <Navigate to="/centers" />;

  return (
      <Outlet />
  );
};

export default CenterLayout;
