import React, { useState } from "react";
import Layout from "../components/Layout";
import { useProjectContext } from "../context/ProjectContextProvider";
import { useNavigate } from "react-router";
import BsButton from "../components/ReusableFormComponents/BsButton";
import ProjectUpdateModal from "../components/modals/ProjectUpdateModal";
import Loading from "../components/ReusableDetailLoadingComponents/Loading";
const Project = () => {
  const { projectData, projectDataError, projectDataloading } =
    useProjectContext();
  const navigate = useNavigate();
  const [showProjectUpdateModal, setShowUpdateModal] = useState(false);
  const [currentProjectData, setCurrentProjectData] = useState(null);
  if (projectDataloading) {
    return <Loading message={"Project data loading"} />;
  }
  if (projectDataError) {
    return <Error message="Error while loading project data" />;
  }
  if (!projectDataloading && !projectDataError && projectData?.length === 0) {
    return <p>Curently no project data available.</p>;
  }
  console.log(projectData);
  return (
    <>
      <Layout>
        <h1>Projects</h1>
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
                      <BsButton onClick={() => {}} color="danger">
                        Delete
                      </BsButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {showProjectUpdateModal && (
          <ProjectUpdateModal
            defaultData={currentProjectData}
            onClose={() => setShowUpdateModal(false)}
          />
        )}
      </Layout>
    </>
  );
};

export default Project;
