import { useQuery } from "@tanstack/react-query";
import api from "../../axios/axios";

const CENTER_SCHEDULE_QUERY_KEY = "center_schedule";

export const useCenterSchedule = () => {
  return useQuery({
    queryKey: [CENTER_SCHEDULE_QUERY_KEY],
    queryFn: async () => {
      const response = await api.get("/schedules");
      return response.data;
    },
  });
};
