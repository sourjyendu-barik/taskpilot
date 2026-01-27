import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { chartOptions } from "../../config/chart.config";
import { CHART_COLORS } from "../../config/chart.colors";

const TasksByOwners = ({ data }) => {
  const chartData = useMemo(() => {
    // Safe guard against undefined/null data
    if (!data || Object.keys(data).length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }
    const labels = Object.keys(data);
    return {
      labels,
      datasets: [
        {
          label: "Tasks Closed",
          data: Object.values(data),
          borderRadius: 6,
          backgroundColor: CHART_COLORS.slice(0, labels.length),
        },
      ],
    };
  }, [data]);

  return <Bar data={chartData} options={chartOptions} />;
};

export default TasksByOwners;
