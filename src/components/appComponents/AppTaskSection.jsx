import React, { useState } from "react";
import AddTaskModal from "../modals/AddTaskModal";
import TaskList from "./TaskList";

const AppTaskSection = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2>My Tasks</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddTaskModal(true)}
        >
          Add new task
        </button>
      </div>
      <TaskList />
      {showAddTaskModal && (
        <AddTaskModal onClose={() => setShowAddTaskModal(false)} type={true} />
      )}
    </>
  );
};

export default AppTaskSection;
