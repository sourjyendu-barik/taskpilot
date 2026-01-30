import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import InputGroup from "../ReusableFormComponents/InputGroup";
import SelectTeam from "../ReusableFormComponents/SelectTeam";
import SelectUsers from "../ReusableFormComponents/SelectUsers";
import BsButton from "../ReusableFormComponents/BsButton";
import { AxiosInstance } from "../../api/AxiosInstance";
import { toast } from "react-toastify";
const AddNewTaskOfProjectModal = ({ id, name, onClose }) => {
  const [taskData, setTaskData] = useState({
    name: "",
    project: id,
    team: null,
    owners: [],
    timeToComplete: 0,
    dueDate: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: taskData.name,
      project: id,
      team: taskData.team?.value || null,
      owners: taskData.owners.map((u) => u.value),
      timeToComplete: Number(taskData.timeToComplete),
      dueDate: taskData.dueDate,
    };
    try {
      await AxiosInstance.post("/task", payload);
      toast.success("New task added successfully");

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };
  return (
    <ModalWrapper onClose={onClose}>
      <h4>{`Create new task for ${name}`}</h4>
      <form onSubmit={onSubmit}>
        <InputGroup
          label="Task Name: "
          name="name"
          value={taskData.name}
          onChange={onChangeHandler}
          placeholder="Enter task name"
          required
        />

        <SelectTeam
          value={taskData.team}
          onChange={(selectedTeam) =>
            setTaskData((prev) => ({ ...prev, team: selectedTeam }))
          }
        />

        <SelectUsers
          value={taskData.owners}
          onChange={(selectedOwners) =>
            setTaskData((prev) => ({ ...prev, owners: selectedOwners }))
          }
          placeholder="select owners"
          label="Select Owners"
        />
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <InputGroup
            label="Select Due date: "
            name="dueDate"
            type="date"
            value={taskData.dueDate}
            onChange={onChangeHandler}
            placeholder="Select date"
            required
          />
          <InputGroup
            label="Estimated time: "
            name="timeToComplete"
            type="number"
            value={taskData.timeToComplete}
            onChange={onChangeHandler}
            placeholder="Enter time in days"
            required
          />
        </div>
        <div className="d-flex justify-content-end align-item-center gap-2">
          <BsButton color="secondary" onClick={onClose}>
            Close
          </BsButton>
          <BsButton type="submit">Create New Task</BsButton>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddNewTaskOfProjectModal;
