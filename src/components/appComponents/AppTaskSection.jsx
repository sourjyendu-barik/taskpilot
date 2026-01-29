import { useState } from "react";
import AddTaskModal from "../modals/AddTaskModal";
import TaskList from "./TaskList";
import BsButton from "../ReusableFormComponents/BsButton";

const AppTaskSection = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <section className="py-3">
      <div className="d-flex flex-column gap-3">
        <div className="row">
          <div className="col-md-6 mb-2">
            <h2 className="mb-0 fw-semibold">My Tasks</h2>
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
                <option value="all">All Tasks</option>
                <option value="To Do">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        <TaskList filterStatus={filterStatus} />
        <div className="d-flex justify-content-end">
          <BsButton onClick={() => setShowAddTaskModal(true)}>
            ➕ Add New Task
          </BsButton>
        </div>
      </div>

      {showAddTaskModal && (
        <AddTaskModal onClose={() => setShowAddTaskModal(false)} type={true} />
      )}
    </section>
  );
};

export default AppTaskSection;
