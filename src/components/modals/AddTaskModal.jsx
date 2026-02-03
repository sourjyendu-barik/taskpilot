import React, { useEffect, useState } from "react";
import { useUserDataContext } from "../../context/UserDataProvider";
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
import { useReportContext } from "../../context/ReportContextProviedr";

const AddTaskModal = ({
  onClose,
  defualtData = null,
  type,
  refetch = () => {},
}) => {
  const [taskData, setTaskData] = useState({
    name: "",
    project: null,
    team: null,
    owners: [],
    status: null,
    timeToComplete: 0,
    dueDate: "",
    tags: [],
  });
  const { refetchProjectData } = useUserDataContext();
  const { refetchAllReport } = useReportContext();
  useEffect(() => {
    if (defualtData) {
      setTaskData({
        name: defualtData.name || "",
        project: defualtData.project || null,
        team: defualtData.team || null,
        owners: defualtData.owners || [],
        status: defualtData.status || null,
        timeToComplete: defualtData.timeToComplete || 0,
        dueDate: defualtData.dueDate || "",
        tags: defualtData.tags || [],
      });
    } else {
      // Reset for create
      setTaskData({
        name: "",
        project: null,
        team: null,
        owners: [],
        status: null,
        timeToComplete: 0,
        dueDate: "",
        tags: [],
      });
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
      ...(type === false && {
        status: taskData.status?.value || null,
        tags: taskData.tags.map((t) => t.value),
      }),
    };

    try {
      if (!type) {
        // UPDATE
        await AxiosInstance.post(`/task/${defualtData.id}`, payload);
        toast.success("Task updated successfully");
      } else {
        // CREATE
        await AxiosInstance.post("/task", payload);
        toast.success("New task added successfully");
      }
      refetch();
      refetchProjectData();
      refetchAllReport();
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
              onChange={(selectedTags) => {
                setTaskData((prev) => ({ ...prev, tags: selectedTags }));
              }}
            />
          </>
        )}
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
        <div className="d-flex justify-content-end align-items-center gap-2">
          <BsButton color="secondary" onClick={onClose}>
            Close
          </BsButton>
          <BsButton type="submit">{type ? "Create" : "Update"}</BsButton>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTaskModal;
