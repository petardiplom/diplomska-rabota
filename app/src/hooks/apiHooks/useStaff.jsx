import { useQuery } from "@tanstack/react-query";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";

const STAFF_QUERY_KEY = "staff";

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
