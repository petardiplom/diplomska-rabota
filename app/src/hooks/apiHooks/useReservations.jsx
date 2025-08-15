import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";
import { toast } from "react-toastify";
import { CALENDAR_EVENTS_QUERY_KEY } from "./useCalendarEvents";

const RESERVATIONS_QUERY_KEY = "reservations";

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  const { centerId } = useCenter();

  return useMutation({
    mutationFn: (data) => {
      return api.post("/reservations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RESERVATIONS_QUERY_KEY, centerId],
      });
      queryClient.invalidateQueries({
        queryKey: [CALENDAR_EVENTS_QUERY_KEY, centerId],
      });
      toast.success("Reservation created!");
    },
  });
};

export const useCancelReservation = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reservationId }) =>
      api.patch(`/reservations/${reservationId}/cancel`),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [CALENDAR_EVENTS_QUERY_KEY, centerId],
        }),
      ]);
      toast.success("Service archived!");
    },
  });
};
