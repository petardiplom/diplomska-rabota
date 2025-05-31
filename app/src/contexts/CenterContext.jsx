import { createContext, useContext, useState } from 'react';

const CenterContext = createContext();

export const useCenter = () => useContext(CenterContext);

export const CenterProvider = ({ children }) => {
  const [center, setCenter] = useState(null);

  const loadCenter = async (centerId) => {
    try {
      const res = await fetch(`/api/centers/${centerId}`);
      if (!res.ok) throw new Error('Center not found');
      const data = await res.json();
      setCenter(data);
      return true;
    } catch (err) {
      setCenter(null);
      return false;
    }
  };

  return (
    <CenterContext.Provider value={{ center, setCenter, loadCenter }}>
      {children}
    </CenterContext.Provider>
  );
};