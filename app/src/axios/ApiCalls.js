import api from "./axios";
import { format } from "date-fns";

export const getServices = async () => {
  const response = await api.get("/services");
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getArchivedServices = async () => {
  const response = await api.get("/services/archived");
  return response.data;
};

export const getStaff = async () => {
  const response = await api.get("/staff");
  return response.data;
};

export const getCustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

export const getArchivedCustomers = async () => {
  const response = await api.get("/customers/archived");
  return response.data;
};

export const getAvailableTimeslots = async (date, staffId, subserviceId) => {
  const formatted = format(date, "yyyy-MM-dd");
  const response = await api.get(
    `/timeslots?date=${formatted}&staffId=${staffId}&subserviceId=${subserviceId}`
  );
  return response.data;
};
