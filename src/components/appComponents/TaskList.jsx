import React from "react";
import { useUserDataContext } from "../../context/UserDataProvider";
import StatusWithColor from "../StatusWithColor";
import { useNavigate } from "react-router";
import getStringDate from "../../hooks/getStringDate";
import Loading from "../ReusableDetailLoadingComponents/Loading";
import Error from "../ReusableDetailLoadingComponents/ErrorComponent";
const TaskList = () => {
  const navigate = useNavigate();
  const {
    filteredTasks: userTasksData,
    taskdataLoading,
    taskdataError,
  } = useUserDataContext();
  if (taskdataLoading) {
    return <Loading message={"Task data is loading"} />;
  }
  if (taskdataError) {
    return <Error message={"Error while loading task data"} />;
  }
  if (!taskdataLoading && !taskdataError && userTasksData?.length === 0) {
    return <p>no Task data present.</p>;
  }

  return (
    <div className="row">
      {userTasksData.map((t) => {
        const { _id: id, name, status, dueDate, owners } = t;
        return (
          <div className="col-md-4" key={id}>
            <div className="card cursor-pointer mb-2">
              <div className="card-body">
                <StatusWithColor status={status} />
                <h4>{name}</h4>
                <p>Due date {getStringDate(dueDate)}</p>
                <p>
                  Owners:{" "}
                  {owners.map((o) => (
                    <span
                      key={o._id}
                      className="badge rounded-pill bg-secondary-subtle text-secondary fw-medium px-2"
                    >
                      {o?.name}
                    </span>
                  ))}
                </p>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate(`taskDetails/${id}`)}
                >
                  Task Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
