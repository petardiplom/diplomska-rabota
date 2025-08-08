import { useQuery } from "@tanstack/react-query";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";

const STAFF_QUERY_KEY = "staff";
const SUBSERVICE_STAFF_QUERY_KEY = "subservice_staff";

export const useStaff = () => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [STAFF_QUERY_KEY, centerId],
    queryFn: async () => {
      const response = await api.get("/staff");
      return response.data;
    },
  });
};

export const useSubserviceStaff = (subserviceId) => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [SUBSERVICE_STAFF_QUERY_KEY, centerId, subserviceId],
    queryFn: async () => {
      const response = await api.get(`/staff/subservice/${subserviceId}`);
      return response.data;
    },
    enabled: !!subserviceId,
  });
};
