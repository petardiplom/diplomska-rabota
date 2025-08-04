import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";
// const ARCHIVED_SERVICES_QUERY_KEY = "services_archived";

const SUBSERVICES_QUERY_KEY = "subservices";

export const useSubservices = () => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [SUBSERVICES_QUERY_KEY, centerId],
    queryFn: async () => {
      const response = await api.get("/subservices");
      return response.data;
    },
  });
};

export const useUpdateSubservice = () => {
  return useMutation({
    mutationFn: ({ subserviceId, data }) =>
      api.patch(`/subservices/${subserviceId}`, data),
    onSuccess: () => {
      toast.success("Subservice updated!");
    },
  });
};
