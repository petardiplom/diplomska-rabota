import { useQuery } from "@tanstack/react-query";
import api from "../../axios/axios";

export const useCurrentUser = (user) => {
  return useQuery({
    queryKey: ["dbUser"],
    queryFn: async () => {
      if (!user) throw new Error("No Firebase user");

      const response = await api.get("/users/me");
      return response.data;
    },
    enabled: !!user,
    retry: false,
  });
};
