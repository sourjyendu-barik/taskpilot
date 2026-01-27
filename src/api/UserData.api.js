import { ENDPOINT } from "./Endpoint";
import { AxiosInstance } from "./AxiosInstance";

export const getUserProjects = (id) => {
  return AxiosInstance.get(`/auth/projects/user/${id}`);
};
export const getUserTasks = (id) => {
  return AxiosInstance.get(`/auth/tasks/user/${id}`);
};
