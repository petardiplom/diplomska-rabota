import { useParams, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCenter } from '../contexts/CenterContext';
import Layout from './Layout';

const CenterLayout = () => {
  const { centerId } = useParams();
  const { loadCenter } = useCenter();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const fetchCenter = async () => {
      const ok = await loadCenter(centerId);
      setValid(ok);
      setLoading(false);
    };
    fetchCenter();
  }, [centerId]);

  if (loading) return <div>Loading center...</div>;
  if (!valid) return <Navigate to="/centers" />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default CenterLayout;
