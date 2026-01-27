import React, { useState } from "react";
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";

const AppProjectSection = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <>
      <div className="d-flex justify-content-between my-3 align-items-center">
        <h2>My Projects</h2>

        <div className="d-flex gap-2  align-items-center">
          <select
            aria-label="Filter"
            className="form-select form-select-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Projects</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
          <div className="d-flex align-items-center flex-shrink-0 p-2">
            <button
              className="btn btn-primary px-4 py-2 m-0"
              onClick={() => setShowAddProject(true)}
            >
              ➕ Add New Project
            </button>
          </div>
        </div>
      </div>
      <ProjectList filterStatus={filterStatus} />
      {showAddProject && (
        <AddProject onClose={() => setShowAddProject(false)} />
      )}
    </>
  );
};

export default AppProjectSection;
