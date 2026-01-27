import { useNavigate } from "react-router";
import { useUserDataContext } from "../../context/UserDataProvider";

import Loading from "../ReusableDetailLoadingComponents/Loading";
import Error from "../ReusableDetailLoadingComponents/ErrorComponent";
import StatusWithColor from "../StatusWithColor";

const ProjectList = ({ filterStatus = "all" }) => {
  const { userProjectsData, projectDataLoading, projectDataError } =
    useUserDataContext();
  const navigate = useNavigate();

  if (projectDataLoading) {
    return <Loading message={"Projects data is loading"} />;
  }
  if (projectDataError) {
    return <Error message={"Error while loading project data"} />;
  }
  if (
    !projectDataLoading &&
    !projectDataError &&
    (!userProjectsData || userProjectsData?.length === 0)
  ) {
    return <p>Currently no project data available.</p>;
  }

  const projects = userProjectsData?.data || userProjectsData || [];
  const filteredProjects = projects.filter((project) => {
    if (filterStatus === "all") return true;
    return project.projectStatus === filterStatus;
  });
  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">
          No projects match the selected filter:{" "}
          <strong>"{filterStatus}"</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="row">
      {filteredProjects.map((p) => {
        const { _id, name, description, projectStatus } = p;
        return (
          <div className="col-md-4 mb-2" key={_id}>
            <div className="card h-100 bg-light cursor-pointer">
              <div className="card-body">
                <StatusWithColor status={projectStatus} />
                <h4>{name}</h4>
                {description && (
                  <p>
                    <strong>Description: </strong>
                    {description}
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate(`projectDetails/${_id}`)}
                >
                  Project Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
