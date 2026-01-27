import { AxiosInstance } from "./AxiosInstance";
import { ENDPOINT } from "./Endpoint";

export const getAllTeams = () => {
  return AxiosInstance.get(ENDPOINT.TEAMS);
};

export const getTeamById = (teamId) => {
  return AxiosInstance.get(`${ENDPOINT.TEAMS}/${teamId}`);
};
