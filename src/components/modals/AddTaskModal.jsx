import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import InputGroup from "../ReusableFormComponents/InputGroup";
import { toast } from "react-toastify";
import SelectProject from "../ReusableFormComponents/SelectProject";
import SelectTeam from "../ReusableFormComponents/SelectTeam";
import SelectUsers from "../ReusableFormComponents/SelectUsers";
import BsButton from "../ReusableFormComponents/BsButton";
import { AxiosInstance } from "../../api/AxiosInstance";
import SelectStatus from "../ReusableFormComponents/SelectStatus";
import SelectTags from "../ReusableFormComponents/SelectTags";
// import { Axios } from "axios";
const AddTaskModal = ({ onClose, defualtData = null, type }) => {
  const [taskData, setTaskData] = useState({
    name: "",
    project: null,
    team: null,
    owners: [],
    timeToComplete: 0,
    dueDate: "",
  });
  useEffect(() => {
    if (defualtData) {
      setTaskData(defualtData);
    }
  }, [defualtData]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: taskData.name,
      project: taskData.project?.value || null,
      team: taskData.team?.value || null,
      owners: taskData.owners.map((u) => u.value),
      timeToComplete: Number(taskData.timeToComplete),
      dueDate: taskData.dueDate,
    };
    try {
      // Conditional API call based on type prop
      if (!type) {
        // type === false = UPDATE
        await AxiosInstance.put(`/task/${taskData.id}`, payload);
        toast.success("Task updated successfully");
      } else {
        // type === true = CREATE
        await AxiosInstance.post("/task", payload);
        toast.success("New task added successfully");
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };
  return (
    <ModalWrapper onClose={onClose}>
      <h4 className="text-center">
        {type ? "Create new Task" : "Update Task"}
      </h4>
      <form onSubmit={onSubmit}>
        <InputGroup
          label="Task Name: "
          name="name"
          value={taskData.name}
          onChange={onChangeHandler}
          placeholder="Enter task name"
          required
        />
        <SelectProject
          value={taskData.project}
          onChange={(selectedProject) =>
            setTaskData((prev) => ({ ...prev, project: selectedProject }))
          }
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
        {!type && (
          <>
            <SelectStatus
              value={taskData.status}
              onChange={(selectedStatus) => {
                setTaskData((prev) => ({ ...prev, status: selectedStatus }));
              }}
            />
            <SelectTags
              value={taskData.tags}
              onChange={(selectedSTags) => {
                setTaskData((prev) => ({ ...prev, tags: selectedSTags }));
              }}
            />
          </>
        )}
        <div className="d-flex justify-content-between">
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
          <BsButton type="submit"> {type ? "Create" : "Update"}</BsButton>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTaskModal;
