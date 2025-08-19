import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";
import { toast } from "react-toastify";
import { CALENDAR_EVENTS_QUERY_KEY } from "./useCalendarEvents";

const SESSIONS_QUERY_KEY = "sessions";

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  const { centerId } = useCenter();

  return useMutation({
    mutationFn: (data) => {
      return api.post("/sessions", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSIONS_QUERY_KEY, centerId],
      });
      queryClient.invalidateQueries({
        queryKey: [CALENDAR_EVENTS_QUERY_KEY, centerId],
      });
      toast.success("Session created!");
    },
  });
};

export const useCancelSession = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId }) => api.patch(`/sessions/${sessionId}/cancel`),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [CALENDAR_EVENTS_QUERY_KEY, centerId],
        }),
      ]);
      toast.success("Session cancelled!");
    },
  });
};
