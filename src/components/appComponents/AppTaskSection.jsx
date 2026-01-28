import React, { useState } from "react";
import AddTaskModal from "../modals/AddTaskModal";
import TaskList from "./TaskList";
import BsButton from "../ReusableFormComponents/BsButton";

const AppTaskSection = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  return (
    <section className="py-3">
      <div className="d-flex flex-column gap-3">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <h2 className="mb-0 fw-semibold">My Tasks</h2>

          <BsButton onClick={() => setShowAddTaskModal(true)}>
            ➕ Add Task
          </BsButton>
        </div>

        {/* Task List */}
        <TaskList />
      </div>

      {showAddTaskModal && (
        <AddTaskModal onClose={() => setShowAddTaskModal(false)} type={true} />
      )}
    </section>
  );
};

export default AppTaskSection;
