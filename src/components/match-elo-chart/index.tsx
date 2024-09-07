import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { RootState } from "../../app/store";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { ThemeContext } from "../theme-provider";
import { formatDate } from "../../utils/dateUtils";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

interface MatchEloChartProps {
  matchCount: number;
}

interface EloData {
  label: string;
  value: number;
  date: string;
}

const MatchEloChart: React.FC<MatchEloChartProps> = ({ matchCount }) => {
  const matches = useSelector((state: RootState) => state.matches.matches);
  const [eloValues, setEloValues] = useState<EloData[]>([]);
  const [isPointsVisible, setIsPointsVisible] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  const { theme } = useContext(ThemeContext);

  const tension = matchCount <= 100 || matches.length <= 100
    ? 0.01
    : matchCount <= 200
    ? 0.5
    : 1;

  const gridBg = theme === "light" ? "#d3d3d3" : "#262626";

  useEffect(() => {
    const selectedMatches = matches.slice(0, matchCount);

    const eloArray: EloData[] = selectedMatches.map((match, index) => ({
        label: `Match ${matches.length - index}`,
        value: match["elo"] !== null ? parseInt(match["elo"], 10) : NaN,
      date: formatDate(match["date"]),
    }));

    const filledArray = eloArray.reduce<EloData[]>((acc, item, index) => {
      if (isNaN(item.value) || item.value === 0) {
        const lastValue = acc.length ? acc[acc.length - 1].value : 0;
        acc.push({ ...item, value: lastValue, label: `Hub ${matches.length - index}` });
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

          setEloValues(filledArray.reverse());

          setIsPointsVisible(false);
          setResetAnimation(true);
      
          const timer = setTimeout(() => {
            setIsPointsVisible(true);
            setResetAnimation(false);
          }, 1500);
      
          return () => clearTimeout(timer);
        }, [matches, matchCount]);

  const minElo = Math.min(...eloValues.map(e => e.value));
  const maxElo = Math.max(...eloValues.map(e => e.value));

  const data: ChartData<"line", number[], string> = {
    labels: eloValues.map(e => e.label),
    datasets: [
      {
        label: `                                                                      Min ELO | ${minElo}`,
        data: eloValues.map((_, index) =>
          eloValues[index].value === minElo
            ? eloValues[index].value
            : NaN
        ),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        pointRadius: isPointsVisible ? 6 : 0,
        pointHoverRadius: isPointsVisible ? 6 : 0,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderWidth: 2,
        pointHoverBorderColor: 'red',
        animation: {
          duration: resetAnimation ? 1000 : 1000,
          delay: 500,
          easing: 'easeOutCubic',
        },
      },
      {
        label: `Max ELO | ${maxElo}`,
        data: eloValues.map((_, index) =>
          eloValues[index].value === maxElo
            ? eloValues[index].value
            : NaN
        ),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        pointRadius: isPointsVisible ? 6 : 0,
        pointHoverRadius: isPointsVisible ? 6 : 0,
        pointHoverBackgroundColor: 'green',
        pointHoverBorderWidth: 2,
        pointHoverBorderColor: 'green',
        animation: {
          duration: resetAnimation ? 1000 : 1000,
          delay: 500,
          easing: 'easeOutCubic',
        },
      },
            {
        label: '',
        data: eloValues.map(e => e.value),
        borderColor: "#0254B4",
        backgroundColor: "rgba(0, 157, 255, 0.07)",
        fill: true,
        tension: tension,
        pointRadius: 1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 0,
          boxHeight: 70,
          padding: 15,
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: tooltipItem => {
            const dataPoint = eloValues[tooltipItem.dataIndex];
            return [`ELO: ${tooltipItem.raw}`, `Date: ${dataPoint.date}`];
          },
        },
        usePointStyle: true,
        displayColors: false,
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          autoSkip: true,
          maxRotation: 45,
        },
        grid: {
          color: gridBg,
        },
      },
      y: {
        display: true,
        grid: {
          color: gridBg,
        },
      },
    },
  };

  return (
    <div className="relative w-[735px] h-[370px] translate-y-[-3.8rem]">
      <Line data={data} options={options} />
    </div>
  );
};

export default MatchEloChart;