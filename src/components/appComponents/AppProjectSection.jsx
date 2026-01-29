import React, { useState } from "react";
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";
import BsButton from "../ReusableFormComponents/BsButton";

const AppProjectSection = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <section className="py-3">
      <div className="d-flex flex-column gap-3">
        <div className="row">
          <div className="col-md-6 mb-2">
            <h2 className="mb-0 fw-semibold">My Projects</h2>
          </div>

          <div className="col-md-6">
            <div className="d-flex justify-content-end gap-2">
              <select
                aria-label="Filter"
                className="form-select form-select-sm w-100 w-md-auto ms-md-auto"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ maxWidth: "280px" }}
              >
                <option value="all">All Projects</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <ProjectList filterStatus={filterStatus} />

        <div className="d-flex justify-content-end">
          <BsButton onClick={() => setShowAddProject(true)}>
            ➕ Add New Project
          </BsButton>
        </div>
      </div>

      {showAddProject && (
        <AddProject onClose={() => setShowAddProject(false)} />
      )}
    </section>
  );
};

export default AppProjectSection;
