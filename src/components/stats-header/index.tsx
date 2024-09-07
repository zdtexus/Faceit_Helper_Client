import KillsIcon from "../icons/kills-icon";

interface StatsHeaderProps {
  matchCount: number;
  selectedStat: string;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ matchCount, selectedStat }) => (
  <div className="text-lg mb-4 mt-[-10px] ml-[-4px] gap-0.5 flex select-none">
    <KillsIcon />
    Last {matchCount} matches {selectedStat}
  </div>
);

export default StatsHeader;