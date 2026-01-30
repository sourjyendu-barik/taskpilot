import { useCallback, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getProjectById } from "../api/Project.api";
import AddNewTaskOfProjectModal from "./modals/AddNewTaskOfProjectModal";
import Loading from "./ReusableDetailLoadingComponents/Loading";
import ErrorComponent from "./ReusableDetailLoadingComponents/ErrorComponent";
import BsButton from "./ReusableFormComponents/BsButton";
const DetailsOfProject = ({ id }) => {
  const [showAddNewTaskOfProject, setShowAddNewTaskOfProject] = useState(false);
  const projectDetails = useCallback(() => getProjectById(id), [id]);
  const { data, loading, error } = useAxios(projectDetails);
  if (loading) {
    return <Loading message={"Project details is loading"} />;
  }
  if (error) {
    return <ErrorComponent message="Error while loading project details" />;
  }

  const projectData = data?.data || {};
  if (projectData.success === false) {
    return <p>No project data found</p>;
  }
  const { name, description } = projectData;
  return (
    <div>
      <h1>{name}</h1>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
      {!description && <p> No description is available</p>}
      <div className="d-flex justify-content-end">
        <BsButton onClick={() => setShowAddNewTaskOfProject(true)}>
          Add New Task
        </BsButton>
      </div>
      {showAddNewTaskOfProject && (
        <AddNewTaskOfProjectModal
          id={id}
          name={name}
          onClose={() => setShowAddNewTaskOfProject(false)}
        />
      )}
    </div>
  );
};

export default DetailsOfProject;
