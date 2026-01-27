import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { pieChartOptions } from "../../config/chart.config";
import { CHART_COLORS } from "../../config/chart.colors";
const TotalTasksStatus = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || !data.totalTasks) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const pending = data.totalPendingTasks || 0;
    const completed = data.totalTasks - pending;

    return {
      labels: ["Pending Tasks", "Completed Tasks"],
      datasets: [
        {
          data: [pending, completed],
          backgroundColor: CHART_COLORS.slice(0, 2),
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  return <Pie data={chartData} options={pieChartOptions} />;
};

export default TotalTasksStatus;
