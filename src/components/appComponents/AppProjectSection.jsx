import React, { useState } from "react";
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";
import BsButton from "../ReusableFormComponents/BsButton";

const AppProjectSection = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <section className="py-3">
      {/* Header */}
      <div className="d-flex flex-column gap-3">
        <div className="row align-items-center">
          <div className="col-md-6 col-12">
            <h2 className="mb-0 fw-semibold">My Projects</h2>
          </div>

          <div className="col-md-6 col-12">
            <div className="d-flex flex-wrap justify-content-md-end gap-2">
              <select
                aria-label="Filter"
                className="form-select form-select-sm w-auto"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Projects</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <BsButton onClick={() => setShowAddProject(true)}>
                ➕ Add Project
              </BsButton>
            </div>
          </div>
        </div>

        {/* Project List */}
        <ProjectList filterStatus={filterStatus} />
      </div>

      {showAddProject && (
        <AddProject onClose={() => setShowAddProject(false)} />
      )}
    </section>
  );
};

export default AppProjectSection;
