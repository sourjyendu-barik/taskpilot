import { AxiosInstance } from "./AxiosInstance";
import { ENDPOINT } from "./Endpoint";

export const getTags = () => {
  return AxiosInstance.get(ENDPOINT.TAGS);
};

export const deleteTagsById = (id) => {
  return AxiosInstance.delete(`${ENDPOINT.TAGS}/${id}`);
};
