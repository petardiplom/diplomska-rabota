import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../../axios/axios';
import { useCenter } from '../../contexts/CenterContext';

const SERVICES_QUERY_KEY = 'services';
const ARCHIVED_SERVICES_QUERY_KEY = 'services_archived'
const SERVICE_BY_ID_QUERY_KEY = 'single_service'

export const useServices = () => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [SERVICES_QUERY_KEY, centerId],
    queryFn: async () => {
      const response = await api.get('/services');
      return response.data;
    },
  });
};

export const useServiceById = (serviceId) => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [SERVICE_BY_ID_QUERY_KEY, centerId, serviceId],
    queryFn: async () => {
      const response = await api.get(`/services/${serviceId}`);
      return response.data;
    },
    enabled: !!serviceId
  });
};

export const useUpdateService = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, data }) => api.patch(`/services/${serviceId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEY, centerId] });
      toast.success('Service updated!');
    },
  });
};

export const useToggleService = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, status }) => api.patch(`/services/${serviceId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEY, centerId] });
      toast.success('Service status updated!');
    },
  });
};

export const useArchiveService = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId }) => api.patch(`/services/${serviceId}/archive`),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEY, centerId] }),
        queryClient.invalidateQueries({ queryKey: [ARCHIVED_SERVICES_QUERY_KEY, centerId] })
      ]);
      toast.success('Service archived!');
    },
  });
};

export const useRestoreService = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId }) => api.patch(`/services/${serviceId}/restore`),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEY, centerId] }),
        queryClient.invalidateQueries({ queryKey: [ARCHIVED_SERVICES_QUERY_KEY, centerId] })
      ]);
      toast.success('Service restored!');
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
