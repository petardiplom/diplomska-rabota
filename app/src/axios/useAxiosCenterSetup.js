import { useEffect } from "react";
import api from "./axios";
import { useCenter } from "../contexts/CenterContext";

export const useAxiosCenterSetup = () => {
  const { centerId } = useCenter();

  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (centerId) {
        config.headers["x-center-id"] = centerId;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [centerId]);
};
