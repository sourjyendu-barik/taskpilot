import React, { createContext, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { getTask } from "../api/Task.api";
const TaskContext = createContext();
export const useTaskContext = () => useContext(TaskContext);
const TaskContextProvider = ({ children }) => {
  const {
    data,
    loading: taskDataLoading,
    error: errorTaskData,
  } = useAxios(getTask);
  const taskData = data?.data || [];
  const value = { taskData, taskDataLoading, errorTaskData };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
