import { useQuery } from "@tanstack/react-query";
import { useCenter } from "../../contexts/CenterContext";
import { getAvailableTimeslots } from "../../axios/ApiCalls";

export const TIMESLOTS_QUERY_KEY = "timeslots";

export const useTimeslots = (date, staffId, subserviceId) => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [TIMESLOTS_QUERY_KEY, centerId, staffId, subserviceId, date],
    queryFn: () => getAvailableTimeslots(date, staffId, subserviceId),
    enabled: !!centerId && !!staffId && !!date,
    staleTime: 0,
    refetchOnMount: "always",
  });
};
