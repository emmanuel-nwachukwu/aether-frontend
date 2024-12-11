import KycRequired from "../ui/KycRequired";
import { Line } from "react-chartjs-2";
import { useContext } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BalanceContext, GlobalContext } from "../contexts/useGlobalContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContent = () => {
  const { balanceTotal } = useContext(BalanceContext);
  const { userData, totalInterest, currentInvestment } =
    useContext(GlobalContext);
  const { verificationStatus } = userData || {};

  // Calculate the sum of current investments
  const totalInvestment = currentInvestment.reduce(
    (acc, curr) => acc + curr,
    0
  );
  // Example data for the chart
  const data = {
    labels: ["1AM", "5AM", "9AM", "1PM", "5PM", "9PM"],
    datasets: [
      {
        label: "24 hr Change",
        data: [400.25, 410.75, 415.5, 420.9, 430.8, 440.0], // replace with real data if available
        borderColor: "#8b4513",
        backgroundColor: "#d2b48c",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Price (USD)" } },
    },
  };

  return (
    <div>
      {verificationStatus !== "verified" && (
        <div className="my-4">
          <KycRequired />
        </div>
      )}
      <div className="flex flex-wrap items-center my-12 gap-x-[13rem] gap-y-4">
        <div className="custom-bl  flex flex-col">
          <span className="text-xl sm:text-3xl font-bold">Balance </span>
          <span className="text-xl">${balanceTotal}</span>
        </div>
        <div className="custom-bl flex flex-col">
          <span className="text-xl sm:text-3xl font-bold">
            24hr Change / Investment
          </span>
          <span className="text-xl">
            {totalInvestment.toFixed(2)} ({totalInterest.toFixed(2)})
          </span>
        </div>
      </div>
      <div>
        <span className="custom-bl text-xl sm:text-3xl font-bold">
          24 hr Change
        </span>
        <div className="mt-12">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
