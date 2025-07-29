import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";
import { toast } from "react-toastify";

const CUSTOMERS_QUERY_KEY = "customers";
const CUSTOMERS_ARCHIVED_QUERY_KEY = "customers_archived";

export const useCustomers = () => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [CUSTOMERS_QUERY_KEY, centerId],
    queryFn: async () => {
      const response = await api.get("/customers");
      return response.data;
    },
  });
};

export const useArchivedCustomers = () => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [CUSTOMERS_ARCHIVED_QUERY_KEY, centerId],
    queryFn: async () => {
      const response = await api.get("/customers/archived");
      return response.data;
    },
  });
};

export const useAddCustomer = () => {
  const queryClient = useQueryClient();
  const { centerId } = useCenter();
  return useMutation({
    mutationFn: (data) => api.post("/customers", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CUSTOMERS_QUERY_KEY, centerId],
      });
      toast.success("Customer added!");
    },
  });
};

export const useUpdateCustomer = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ customerId, data }) =>
      api.patch(`/customers/${customerId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CUSTOMERS_QUERY_KEY, centerId],
      });
      toast.success("Customer updated!");
    },
  });
};

export const useArchiveCustomer = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ customerId }) =>
      api.patch(`/customers/${customerId}/archive`),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [CUSTOMERS_QUERY_KEY, centerId],
        }),
        queryClient.invalidateQueries({
          queryKey: [CUSTOMERS_ARCHIVED_QUERY_KEY, centerId],
        }),
      ]);
      toast.success("Customer archived!");
    },
  });
};

export const useRestoreCustomer = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ customerId }) =>
      api.patch(`/customers/${customerId}/restore`),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [CUSTOMERS_QUERY_KEY, centerId],
        }),
        queryClient.invalidateQueries({
          queryKey: [CUSTOMERS_ARCHIVED_QUERY_KEY, centerId],
        }),
      ]);
      toast.success("Customer restored!");
    },
  });
};
