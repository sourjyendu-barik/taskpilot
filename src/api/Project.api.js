import { AxiosInstance } from "./AxiosInstance";
import { ENDPOINT } from "./Endpoint";

export const getProjects = () => {
  return AxiosInstance.get(ENDPOINT.PROJECTS);
};

export const getProjectById = (id) => {
  return AxiosInstance.get(`${ENDPOINT.PROJECTS}/${id}`);
};
