import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../../axios/axios';

const SERVICES_QUERY_KEY = 'services';
const SERVICE_BY_ID_QUERY_KEY = 'single_service'

export const useServices = () => {
  return useQuery({
    queryKey: [SERVICES_QUERY_KEY],
    queryFn: async () => {
      const response = await api.get('/services');
      return response.data;
    },
  });
};

export const useServiceById = (serviceId) => {
  return useQuery({
    queryKey: [SERVICE_BY_ID_QUERY_KEY, serviceId],
    queryFn: async () => {
      const response = await api.get(`/services/${serviceId}`);
      return response.data;
    },
    enabled: !!serviceId
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, data }) => api.patch(`/services/${serviceId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEY] });
      toast.success('Service status updated!');
    },
  });
};

export const useToggleService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, status }) => api.patch(`/services/${serviceId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEY] });
      toast.success('Service status updated!');
    },
  });
};



export const useAddService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/services', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEY] });
    },
  });
};
