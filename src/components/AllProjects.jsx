import { useState } from "react";
import { useProjectContext } from "../context/ProjectContextProvider";
import { useNavigate } from "react-router";
import BsButton from "./ReusableFormComponents/BsButton";
import ProjectUpdateModal from "./modals/ProjectUpdateModal";
import Loading from "./ReusableDetailLoadingComponents/Loading";
import { AxiosInstance } from "../api/AxiosInstance";
import { toast } from "react-toastify";
import AddProject from "./appComponents/AddProject";
import Searchbar from "./Searchbar";
import ErrorComponent from "./ReusableDetailLoadingComponents/ErrorComponent";
const AllProjects = () => {
  const {
    filteredProjectData: projectData,
    searchTerm,
    setSearchTerm,
    projectDataError,
    projectDataloading,
    refetchProjectData,
  } = useProjectContext();
  const navigate = useNavigate();
  const [showProjectUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [currentProjectData, setCurrentProjectData] = useState(null);
  if (projectDataloading) {
    return <Loading message={"Project data loading"} />;
  }
  if (projectDataError) {
    return <ErrorComponent message="Error while loading project data" />;
  }
  if (!projectDataloading && !projectDataError && projectData?.length === 0) {
    return <p>Curently no project data available.</p>;
  }
  const onDelete = (id) => {
    AxiosInstance.delete(`/projects/${id}`)
      .then(() => {
        toast.success("project deleted successfully");
        refetchProjectData();
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      });
  };
  return (
    <>
      <div className="my-2">
        <Searchbar
          label={"Enter project name"}
          placeholder={"Enter project name"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {projectData.map((p) => {
          const { _id, name, description } = p;
          return (
            <div className="col-md-4 mb-2" key={_id}>
              <div className="card h-100 bg-light">
                <div className="card-body">
                  <h4>{name}</h4>
                  {description && (
                    <p>
                      <strong>Description: </strong>
                      {description}
                    </p>
                  )}
                  {!description && <p>No description available</p>}
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-end gap-2">
                    <BsButton
                      onClick={() => navigate(`/projectDetails/${_id}`)}
                    >
                      Details
                    </BsButton>
                    <BsButton
                      onClick={() => {
                        setCurrentProjectData((prev) => p);
                        setShowUpdateModal(true);
                      }}
                      color="secondary"
                    >
                      Update
                    </BsButton>
                    <BsButton onClick={() => onDelete(_id)} color="danger">
                      Delete
                    </BsButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-end py-2">
        <BsButton onClick={() => setShowAddProject(true)}>
          ➕ Add New Project
        </BsButton>
      </div>
      {showProjectUpdateModal && (
        <ProjectUpdateModal
          defaultData={currentProjectData}
          onClose={() => setShowUpdateModal(false)}
          refetch={refetchProjectData}
        />
      )}
      {showAddProject && (
        <AddProject onClose={() => setShowAddProject(false)} />
      )}
    </>
  );
};

export default AllProjects;
