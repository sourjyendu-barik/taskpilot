import { createContext, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { getProjects } from "../api/Project.api";
const ProjectContext = createContext();
export const useProjectContext = () => useContext(ProjectContext);
const ProjectContextProvider = ({ children }) => {
  const {
    data,
    loading: projectDataloading,
    error: projectDataError,
  } = useAxios(getProjects);
  const projectData = data?.data || [];
  const value = { projectData, projectDataError, projectDataloading };
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
