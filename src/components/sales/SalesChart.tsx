import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

type SalesChartProps = {
  monthlySales: number[];
};

const SalesChart = ({ monthlySales }: SalesChartProps) => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales",
        data: monthlySales,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Sales Performance",
      },
    },
  };

  return (
    <div className="relative w-full h-64 sm:h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;
