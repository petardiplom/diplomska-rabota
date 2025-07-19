import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCenterById } from "../hooks/apiHooks/useCenters";
import { useAuth } from "./AuthContext";

const CenterContext = createContext();

export const CenterProvider = ({ children }) => {
  const { authLoading, user } = useAuth();
  const [centerId, setCenterIdState] = useState(() => {
    return localStorage.getItem("centerId") || null;
  });

  const {
    data: center,
    isLoading,
    error,
  } = useCenterById(centerId, {
    enabled: !!centerId && !authLoading && !!user,
  });

  const setCenterId = (id) => {
    if (id) {
      localStorage.setItem("centerId", id);
    } else {
      localStorage.removeItem("centerId");
    }
    setCenterIdState(id);
  };

  useEffect(() => {
    if (!centerId || (centerId && error)) {
      setCenterId(null);
    }
  }, [centerId, error]);

  const resetCenter = useCallback(() => {
    localStorage.removeItem("centerId");
    setCenterIdState(null);
  }, []);

  const value = useMemo(
    () => ({
      centerId,
      setCenterId,
      resetCenter,
      center,
      isLoading,
      error,
    }),
    [centerId, center, isLoading, error, resetCenter]
  );

  return (
    <CenterContext.Provider value={value}>{children}</CenterContext.Provider>
  );
};

export const useCenter = () => {
  const context = useContext(CenterContext);
  if (!context) {
    throw new Error("useCenter must be used within a CenterProvider");
  }
  return context;
};
