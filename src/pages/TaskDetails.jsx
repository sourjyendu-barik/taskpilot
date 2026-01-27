import React from "react";
import { useParams } from "react-router";
import DetailsOfTask from "../components/DetailsOfTask";
import SideBar from "../components/SideBar";
const TaskDetails = () => {
  const { id } = useParams();
  return (
    <div className="app-layout">
      <SideBar />
      <main className="content-wrapper flex-grow-1 p-3">
        <DetailsOfTask id={id} />
      </main>
    </div>
  );
};

export default TaskDetails;
