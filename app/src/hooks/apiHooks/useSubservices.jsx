import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../axios/axios";
// const ARCHIVED_SERVICES_QUERY_KEY = "services_archived";

export const useUpdateSubservice = () => {
  return useMutation({
    mutationFn: ({ subserviceId, data }) =>
      api.patch(`/subservices/${subserviceId}`, data),
    onSuccess: () => {
      toast.success("Subservice updated!");
    },
  });
};
