import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../axios/axios";
import { useCenter } from "../../contexts/CenterContext";
import { toast } from "react-toastify";

const CENTERS_QUERY_KEY = "centers";
const CENTER_GALLERY_QUERY_KEY = "center_gallery";
const CENTER_BY_ID_QUERY_KEY = "single_center";

export const useCenters = () => {
  return useQuery({
    queryKey: [CENTERS_QUERY_KEY],
    queryFn: async () => {
      const response = await api.get("/centers");
      return response.data;
    },
  });
};

export const useCenterById = (centerId, options = {}) => {
  return useQuery({
    queryKey: [CENTER_BY_ID_QUERY_KEY, centerId],
    queryFn: async () => {
      const response = await api.get(`/centers/${centerId}`);
      return response.data;
    },
    enabled: !!centerId,
    ...options,
  });
};

export const useAddCenter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/centers", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CENTERS_QUERY_KEY] });
    },
  });
};

export const useCenterGallery = () => {
  const { centerId } = useCenter();
  return useQuery({
    queryKey: [CENTER_GALLERY_QUERY_KEY, centerId],
    queryFn: async () => {
      const response = await api.get(`/centers/${centerId}/gallery`);
      return response.data;
    },
    enabled: !!centerId,
  });
};

export const useAddImageToGallery = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post(`/centers/${centerId}/gallery`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CENTER_GALLERY_QUERY_KEY, centerId],
      });
    },
  });
};

export const useAddProfilePicture = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      api.post(`/centers/${centerId}/profile-picture`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CENTER_GALLERY_QUERY_KEY, centerId],
      });
    },
  });
};

export const useUpdateCenter = () => {
  const { centerId } = useCenter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.patch(`/centers/${centerId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CENTER_BY_ID_QUERY_KEY, centerId],
      });
      toast.success("Center updated!");
    },
  });
};
