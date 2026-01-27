import { AxiosInstance } from "./AxiosInstance";
import { ENDPOINT } from "./Endpoint";

export const getTask = () => {
  return AxiosInstance.get(ENDPOINT.TASKS);
};

export const getTaskById = (id) => {
  return AxiosInstance.get(`${ENDPOINT.TASKS}/${id}`);
};
