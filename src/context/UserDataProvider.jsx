import {
  useCallback,
  useContext,
  createContext,
  useState,
  useMemo,
} from "react";
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
    refetch: refetchProjectData,
  } = useAxios(apiFunProject);

  const {
    data: taskdata,
    loading: taskdataLoading,
    error: taskdataError,
    refetch: refetchTaskData,
  } = useAxios(apiFunTask);

  const shouldFetch = !isAuthChecking && !!id;
  const userProjectsData = shouldFetch ? projectsData?.data || [] : [];
  const userTasksData = shouldFetch ? taskdata?.data || [] : [];

  //code for filtereddata
  const [searchTerm, setSearchTerm] = useState("");
  // const filteredProjects = useMemo(() => {
  //   if (!searchTerm) {
  //     return userProjectsData;
  //   }
  //   return userProjectsData.filter((p) =>
  //     p.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );
  // }, [searchTerm, userProjectsData]);
  const filteredTasks = useMemo(() => {
    if (!searchTerm) {
      return userTasksData;
    }
    return userTasksData.filter((t) =>
      t.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, userTasksData]);
  const value = {
    userProjectsData,
    projectDataLoading,
    projectDataError,
    refetchProjectData,
    userTasksData,
    taskdataLoading,
    taskdataError,
    //filtered data
    // filteredProjects,
    searchTerm,
    setSearchTerm,
    filteredTasks,
    refetchTaskData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
