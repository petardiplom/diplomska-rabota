import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCenterById } from '../hooks/apiHooks/useCenters';

const CenterContext = createContext();

export const CenterProvider = ({ children }) => {

  const [centerId, setCenterIdState] = useState(() => {
    return localStorage.getItem('centerId') || null;
  });

  const {
    data: center,
    isLoading,
    error,
  } = useCenterById(centerId);

  const setCenterId = (id) => {
    if (id) {
      localStorage.setItem('centerId', id);
    } else {
      localStorage.removeItem('centerId');
    }
    setCenterIdState(id);
  };

  useEffect(() => {
    if (!centerId || (centerId && error)) {
      setCenterId(null);
    }
  }, [centerId, error]);

  const value = useMemo(() => ({
    centerId,
    setCenterId,
    center,
    isLoading,
    error,
  }), [centerId, center, isLoading, error]);

  return (
    <CenterContext.Provider value={value}>
      {children}
    </CenterContext.Provider>
  );
};

export const useCenter = () => {
  const context = useContext(CenterContext);
  if (!context) {
    throw new Error('useCenter must be used within a CenterProvider');
  }
  return context;
};