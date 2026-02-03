import { createContext, useContext, useMemo } from "react";
import useAxios from "../hooks/useAxios";
import {
  getWeeklyReport,
  getPendingWork,
  getTasksByOwners,
  getTasksByTeams,
} from "../api/Charts.api";

const ReportContext = createContext();
export const useReportContext = () => useContext(ReportContext);

const ReportContextProvider = ({ children }) => {
  // Independent API calls
  const weekly = useAxios(getWeeklyReport);
  const pending = useAxios(getPendingWork);
  const byOwners = useAxios(getTasksByOwners);
  const byTeams = useAxios(getTasksByTeams);

  // Memoize context value
  const value = useMemo(
    () => ({
      // Data
      weeklyReport: weekly.error ? null : weekly?.data?.data,
      pendingWork: pending.error ? null : pending?.data?.data,
      tasksByOwners: byOwners?.data?.data ?? {},
      tasksByTeams: byTeams?.data?.data ?? {},

      // Loading
      loadingWeekly: weekly.loading,
      loadingPending: pending.loading,
      loadingOwners: byOwners.loading,
      loadingTeams: byTeams.loading,

      // Error
      errorWeekly: weekly.error,
      errorPending: pending.error,
      errorOwners: byOwners.error,
      errorTeams: byTeams.error,

      // Refetch
      refetchWeekly: weekly.refetch,
      refetchPending: pending.refetch,
      refetchOwners: byOwners.refetch,
      refetchTeams: byTeams.refetch,
      refetchAllReport: () => {
        weekly.refetch();
        pending.refetch();
        byOwners.refetch();
        byTeams.refetch();
      },
    }),
    [
      weekly.data,
      weekly.loading,
      weekly.error,
      weekly.refetch,
      pending.data,
      pending.loading,
      pending.error,
      pending.refetch,
      byOwners.data,
      byOwners.loading,
      byOwners.error,
      byOwners.refetch,
      byTeams.data,
      byTeams.loading,
      byTeams.error,
      byTeams.refetch,
    ],
  );

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};

export default ReportContextProvider;
