import React, { useMemo } from 'react';
import { calculateAverages } from '../../utils/calculateAverages';
import StatsValue from '../stats-value';

interface AllStatsDisplayProps {
  matchCount: number;
  selectedStat: string;
  matches: any[];
}

interface StatType {
  key: string;
  label: string;
}

const AllStatsDisplay: React.FC<AllStatsDisplayProps> = ({ matchCount, matches }) => {
  const allStatsTypes = useMemo<StatType[]>(
    () => [
      { key: "kills", label: "Kills" },
      { key: "deaths", label: "Deaths" },
      { key: "assists", label: "Assists" },
      { key: "kdRatio", label: "K/D" },
      { key: "krRatio", label: "K/R" },
      { key: "adr", label: "ADR" },
    ],
    []
  );

  return (
    <div className="grid row-span-3 grid-cols-3 gap-4 mx-0 -translate-y-3">
      {allStatsTypes.map(stat => {
        const {
          currentAverage,
          previousAverage,
          showPrevious
        } = calculateAverages(matches, matchCount, stat.key);
        
        const currentAverageNum = parseFloat(String(currentAverage));
        const previousAverageNum = parseFloat(String(previousAverage ?? "0"));
        const difference = currentAverageNum - previousAverageNum;

        return (
          <div key={stat.key} className="grid px-4 pb-2 pt-2 dark:bg-zinc-800/50 bg-zinc-200/60 rounded-md">
            <p className="flex text-base justify-center top-1.5">{stat.label}</p>
            <StatsValue
              currentAverage={String(currentAverage)}
              previousAverage={String(previousAverage)}
              difference={difference}
              showPrevious={showPrevious}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllStatsDisplay;
