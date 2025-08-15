import { useQuery } from "@tanstack/react-query";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";

export const CALENDAR_EVENTS_QUERY_KEY = "calendar_events";

export const useCalendarEvents = (date, options = {}) => {
  const { centerId } = useCenter();

  return useQuery({
    queryKey: [CALENDAR_EVENTS_QUERY_KEY, centerId, date],
    queryFn: async () => {
      const response = await api.get(`/calendar-events`, {
        params: { date },
      });
      return response.data;
    },
    ...options,
  });
};
