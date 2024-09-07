import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { RootState } from "../../app/store";
import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { ThemeContext } from "../theme-provider";
import { formatDate } from "../../utils/dateUtils";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale
);

interface MatchStatsChartProps {
  matchCount: number;
  selectedStat: string;
}

const MatchStatsChart: React.FC<MatchStatsChartProps> = ({ matchCount, selectedStat }) => {
  const matches = useSelector((state: RootState) => state.matches.matches);
  const [statValues, setStatValues] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const selectedMatches = matches.slice(0, matchCount);
    const statsArray: number[] = selectedMatches.map(match =>
      match[selectedStat] !== null ? parseFloat(match[selectedStat]) : NaN
    );
    const datesArray: string[] = selectedMatches.map(match => formatDate(match["date"]));

    setStatValues(statsArray);
    setDates(datesArray);
  }, [matches, matchCount, selectedStat]);

  const gridBg = theme === "light" ? "#d3d3d3" : "#262626";

  const data: ChartData<"bar", number[], string > = {
    labels: statValues.map((_, index) => `${matches.length - index - 1}`),
    datasets: [
      {
        label: selectedStat,
        data: statValues,
        backgroundColor: "#0254B4",
        borderColor: "#0254B4",
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 0,
          padding: 25,
        },
      },
      tooltip: {
        callbacks: {
          label: tooltipItem => {
            const date = dates[tooltipItem.dataIndex];
            return [`${selectedStat}: ${tooltipItem.raw}`, `Date: ${date}`];
          },
        },
        usePointStyle: true,
        displayColors: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: gridBg,
        },
        reverse: true,
      },
      y: {
        display: true,
        grid: {
          color: gridBg,
        },
      },
    },
  };

  useEffect(() => {
    const chartInstance = ChartJS.getChart('chart');

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className=" w-full max-w-[505px] h-[250px] absolute right-1 bottom-0">
      <Bar data={data} options={options} id="chart" />
    </div>
  );
};

export default MatchStatsChart;
