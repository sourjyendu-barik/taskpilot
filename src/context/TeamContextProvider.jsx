import { createContext, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { getAllTeams } from "../api/Team.api";
const TeamContext = createContext();
export const useTeamContext = () => useContext(TeamContext);

const TeamContextProvider = ({ children }) => {
  const {
    data,
    loading: teamsDataLoading,
    error: teamsDataError,
    refetch,
  } = useAxios(getAllTeams);
  const allTeams = data?.data || [];
  // console.log(allTeams);
  const value = { allTeams, teamsDataLoading, teamsDataError, refetch };
  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};
export default TeamContextProvider;
