import GreenArrow from "../icons/arrow-green"
import RedArrow from "../icons/arrow-red"

interface StatsValueProps {
  currentAverage: string
  previousAverage?: string
  difference: number
  showPrevious: boolean
}

const StatsValue: React.FC<StatsValueProps> = ({
  currentAverage,
  previousAverage,
  difference,
  showPrevious,
}) => (
  <div className="flex">
    <div className="grid justify-items-center">
      <div className="mb-1 text-2xl gap-1 flex relative">
        {currentAverage}
        {showPrevious && (
          <div className="absolute right-[-25px]">
            {difference > 0 && <GreenArrow />}
            {difference < 0 && <RedArrow />}
          </div>
        )}
      </div>
      <p className="text-base dark:text-zinc-400 text-zinc-700">Current</p>
    </div>
    {showPrevious && <span className="flex w-full"></span>}
    {showPrevious && (
      <div className="grid justify-items-center">
        <p className="mb-1 text-2xl ">{previousAverage}</p>
        <p className="text-base dark:text-zinc-400 text-zinc-700">Previous</p>
      </div>
    )}
  </div>
)

export default StatsValue
