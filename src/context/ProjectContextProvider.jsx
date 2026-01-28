import { createContext, useContext, useMemo, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getProjects } from "../api/Project.api";
const ProjectContext = createContext();
export const useProjectContext = () => useContext(ProjectContext);
const ProjectContextProvider = ({ children }) => {
  const {
    data,
    loading: projectDataloading,
    error: projectDataError,
    refetch: refetchProjectData,
  } = useAxios(getProjects);
  const projectData = data?.data || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjectData = useMemo(() => {
    if (!searchTerm) {
      return projectData;
    }
    return projectData.filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, projectData]);
  const value = {
    projectData,
    projectDataError,
    projectDataloading,
    filteredProjectData,
    searchTerm,
    setSearchTerm,
    refetchProjectData,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
