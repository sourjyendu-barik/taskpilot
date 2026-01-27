export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1, // integers only
        precision: 0,
      },
    },
  },
};

export const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        padding: 16,
        usePointStyle: true,
      },
    },

    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw;
          const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
          const percentage = total ? ((value / total) * 100).toFixed(0) : 0;

          return `${context.label}: ${value} (${percentage}%)`;
        },
      },
    },
  },

  layout: {
    padding: 10,
  },

  scales: {}, // 🚫 no axes for pie
};
