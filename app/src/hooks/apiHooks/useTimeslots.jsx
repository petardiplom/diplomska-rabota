import { useQuery } from "@tanstack/react-query";
import { useCenter } from "../../contexts/CenterContext";
import { getAvailableTimeslots } from "../../axios/ApiCalls";

const TIMESLOTS_QUERY_KEY = "timeslots";

export const useTimeslots = (date, staffId) => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [TIMESLOTS_QUERY_KEY, centerId, staffId, date],
    queryFn: () => getAvailableTimeslots(date, staffId),
    enabled: !!centerId && !!staffId && !!date,
  });
};
