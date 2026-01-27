import { useCallback, useContext, createContext } from "react";
import useAxios from "../hooks/useAxios";
import { useAuthContxt } from "./AuthProvider";
import { getUserProjects, getUserTasks } from "../api/UserData.api";

const UserDataContext = createContext();
export const useUserDataContext = () => useContext(UserDataContext);

const UserDataProvider = ({ children }) => {
  const { currentUser, isAuthChecking } = useAuthContxt();
  const id = currentUser?.userId;

  const apiFunProject = useCallback(() => {
    if (!id || isAuthChecking) return null;
    return getUserProjects(id);
  }, [id, isAuthChecking]);

  const apiFunTask = useCallback(() => {
    if (!id || isAuthChecking) return null;
    return getUserTasks(id);
  }, [id, isAuthChecking]);
  const {
    data: projectsData,
    loading: projectDataLoading,
    error: projectDataError,
  } = useAxios(apiFunProject);

  const {
    data: taskdata,
    loading: taskdataLoading,
    error: taskdataError,
  } = useAxios(apiFunTask);

  const shouldFetch = !isAuthChecking && !!id;
  const userProjectsData = shouldFetch ? projectsData?.data || [] : [];
  const userTasksData = shouldFetch ? taskdata?.data || [] : [];
  const value = {
    userProjectsData,
    projectDataLoading,
    projectDataError,
    userTasksData,
    taskdataLoading,
    taskdataError,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
