import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";

const CENTER_SCHEDULE_QUERY_KEY = "center_schedule";
const STAFF_SCHEDULE_QUERY_KEY = "staff_schedule";

export const useCenterSchedule = () => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [CENTER_SCHEDULE_QUERY_KEY, centerId],
    queryFn: async () => {
      const response = await api.get("/schedules");
      return response.data;
    },
  });
};

export const useUpdateCenterSchedule = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }) => api.patch(`/schedules`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CENTER_SCHEDULE_QUERY_KEY, centerId],
      });
      toast.success("Schedule updated!");
    },
  });
};

export const useStaffSchedule = (staffId) => {
  const { centerId } = useCenter();

  return useQuery({
    queryKey: [STAFF_SCHEDULE_QUERY_KEY, centerId, staffId],
    queryFn: async () => {
      const response = await api.get(`/schedules/staff/${staffId}`);
      return response.data;
    },
    enabled: !!staffId,
  });
};

export const useUpdateStaffSchedule = (staffId) => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }) => api.patch(`/schedules`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [STAFF_SCHEDULE_QUERY_KEY, centerId, staffId],
      });
      toast.success("Schedule updated!");
    },
  });
};
