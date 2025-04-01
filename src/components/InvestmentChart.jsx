import { Line } from "react-chartjs-2";
import { useGlobalState } from "../context/GlobalState";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const InvestmentChart = () => {
  const { investmentData } = useGlobalState();

  // Ensure investmentData is an array and contains valid numeric values
  const processedData = Array.isArray(investmentData)
    ? investmentData.filter(
        (value) => typeof value === "number" && !isNaN(value)
      )
    : [];

  // Generate labels dynamically
  const labels = processedData.map((_, index) => `Month ${index + 1}`);

  // Define chart dataset
  const chartData = {
    labels,
    datasets: [
      {
        label: "Investment Growth ($)",
        data: processedData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#ddd" }, beginAtZero: true },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Investment Growth
      </h2>
      <div className="h-64">
        {processedData.length ? (
          <Line data={chartData} options={options} />
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No investment data available
          </p>
        )}
      </div>
    </div>
  );
};

export default InvestmentChart;
