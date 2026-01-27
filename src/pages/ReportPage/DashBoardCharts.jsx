import React from "react";
import { useReportContext } from "../../context/ReportContextProviedr";
import TasksByTeam from "../../components/charts/TasksByTeam";
import TasksByOwners from "../../components/charts/TasksByOwners";
import ChartCard from "../../components/ReusableDetailLoadingComponents/ChartCard";
import TotalTasksStatus from "../../components/charts/TotalTasksStatus";
import DashBoardGrid from "./DasBoardGrid";
import TasksDoneLastWeek from "../../components/charts/TasksDoneLastWeek";
const DashBoardCharts = () => {
  const {
    weeklyReport,
    pendingWork,
    tasksByOwners,
    tasksByTeams,
    loadingWeekly,
    loadingPending,
    loadingOwners,
    loadingTeams,
    errorWeekly,
    errorPending,
    errorOwners,
    errorTeams,
  } = useReportContext();
  return (
    <DashBoardGrid>
      <ChartCard
        title="Work Done Last Week"
        loading={loadingWeekly}
        error={errorWeekly}
        empty={!weeklyReport}
      >
        <TasksDoneLastWeek data={weeklyReport} />
      </ChartCard>

      <ChartCard
        title="Pending Work"
        loading={loadingPending}
        error={errorPending}
        empty={!pendingWork}
      >
        <TotalTasksStatus data={pendingWork} />
      </ChartCard>

      <ChartCard
        title="Tasks by Owner"
        loading={loadingOwners}
        error={errorOwners}
        empty={Object.keys(tasksByOwners).length === 0}
      >
        <TasksByOwners data={tasksByOwners} />
      </ChartCard>

      <ChartCard
        title="Tasks by Team"
        loading={loadingTeams}
        error={errorTeams}
        empty={Object.keys(tasksByTeams).length === 0}
      >
        <TasksByTeam data={tasksByTeams} />
      </ChartCard>
    </DashBoardGrid>
  );
};

export default DashBoardCharts;
