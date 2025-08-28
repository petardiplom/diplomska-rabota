import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";
import { toast } from "react-toastify";
import { CALENDAR_EVENTS_QUERY_KEY } from "./useCalendarEvents";

const SESSIONS_QUERY_KEY = "sessions";
const SESSION_SUBSCRIPTION_QUERY_KEY = "session_subscription";

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

export const useSessionSubscriptions = (sessionId) => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [SESSION_SUBSCRIPTION_QUERY_KEY, centerId, sessionId],
    queryFn: async () => {
      const response = await api.get(`/sessions/${sessionId}/subscriptions`);
      return response.data;
    },
    enabled: !!sessionId,
  });
};

export const useAddSubscription = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, customerId }) =>
      api.post(`/sessions/${sessionId}/subscription`, { customerId }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [CALENDAR_EVENTS_QUERY_KEY, centerId],
      });
      queryClient.invalidateQueries({
        queryKey: [SESSION_SUBSCRIPTION_QUERY_KEY, centerId],
      });
      toast.success("Subscription added!");
    },
  });
};

export const useCancelSession = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId }) => api.patch(`/sessions/${sessionId}/cancel`),
    onSuccess: async (_, variables) => {
      const { sessionId } = variables;
      queryClient.invalidateQueries({
        queryKey: [CALENDAR_EVENTS_QUERY_KEY, centerId],
      });
      queryClient.invalidateQueries({
        queryKey: [SESSION_SUBSCRIPTION_QUERY_KEY, centerId, sessionId],
      });
      toast.success("Session cancelled!");
    },
  });
};

export const useCancelSubscription = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ subscriptionId, sessionId }) =>
      api.patch(`/sessions/subscription/${subscriptionId}/cancel`, {
        sessionId,
      }),
    onSuccess: async (_, variables) => {
      const { sessionId } = variables;
      queryClient.invalidateQueries({
        queryKey: [SESSION_SUBSCRIPTION_QUERY_KEY, centerId, sessionId],
      });
      toast.success("Subscription cancelled!");
    },
  });
};
