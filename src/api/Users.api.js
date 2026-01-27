import { ENDPOINT } from "./Endpoint";
import { AxiosInstance } from "./AxiosInstance";

export const getUsers = () => {
  return AxiosInstance.get(ENDPOINT.USERS);
};
