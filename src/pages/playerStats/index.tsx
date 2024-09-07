// pages/playerStats/index.tsx
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectPlayer } from "../../features/player/playerSlice"
import { fetchMatches } from "../../features/matches/matchesThunks"
import { RootState } from "../../app/store"
import { Button, Spinner } from "@nextui-org/react"
import { ThemeContext } from "../../components/theme-provider"
import MatchStatsChart from "../../components/match-stats-chart"
import { calculateAverages } from "../../utils/calculateAverages"
import StatsHeader from "../../components/stats-header"
import StatsValue from "../../components/stats-value"
import FooterText from "../../components/footer-text"
import AllStatsDisplay from "../../components/all-stats-display"
import FunnyIcon from "../../components/icons/funny-icon"
import { usePlayerClear } from "../../features/player/usePlayerClear"
import { PageHeader } from "../../components/page-header"
import ButtonGroup from "../../components/button-group"
import MatchChartButtons from "../../components/match-chart-buttons"
import MatchEloChart from "../../components/match-elo-chart"

const PlayerStats: React.FC = React.memo(() => {
  const { nickname } = useParams<{ nickname: string }>()
  const dispatch = useAppDispatch()
  const player = useAppSelector((state: RootState) => selectPlayer(state))
  const { loading, error, matches } = useAppSelector(
    (state: RootState) => state.matches
  )

  const [matchCountElo, setMatchCountElo] = useState(30)
  const [matchCountStats, setMatchCountStats] = useState(15)
  const [matchCountStatsFull, setMatchCountStatsFull] = useState(15)
  const [selectedButtonElo, setSelectedButtonElo] = useState<number>(30)
  const [selectedButtonAimStats, setSelectedButtonAimStats] =
    useState<string>("All")
  const [selectedButtonGrenadesStats, setSelectedButtonGrenadesStats] =
    useState<string>("Utility Dmg")
  const [selectedButtonBoolean, setSelectedButtonBoolean] =
    useState<string>("Aim")

  const { theme } = useContext(ThemeContext)
  const loadingColor = theme === "light" ? "default" : "white"

  usePlayerClear(nickname || "")

  useEffect(() => {
    if (player?.playerFaceitId) {
      dispatch(fetchMatches(player.playerFaceitId))
    }
  }, [dispatch, player?.playerFaceitId])

  const handleMatchCountChangeElo = useCallback((count: number) => {
    setMatchCountElo(count)
    setSelectedButtonElo(count)
  }, [])

  const handleMatchCountChangeStats = useCallback((count: number) => {
    setMatchCountStats(count)
  }, [])

  const handleMatchCountChangeStatsFull = useCallback((count: number) => {
    setMatchCountStatsFull(count)
  }, [])

  const handleButtonChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
      setter(value)
    },
    []
  )

  const aimStatsButtons = useMemo(
    () => [
      { key: "All", label: "All" },
      { key: "kills", label: "Kills" },
      { key: "deaths", label: "Deaths" },
      { key: "assists", label: "Assists" },
      { key: "kdRatio", label: "K/D" },
      { key: "krRatio", label: "K/R" },
      { key: "adr", label: "ADR" }
    ],
    []
  )
  
  const grenadesStatsButtons = useMemo(
    () => [
      { key: "utilityDmg", label: "Utility Dmg" },
      { key: "enemiesFlash", label: "Enemies Flash" },
      { key: "utilityCount", label: "Utility Count" },
      { key: "utilityEnemies", label: "Utility Enemies" }
    ],
    []
  )

  const modeButtons = useMemo(
    () => [
      { key: "Aim", label: "Aim" },
      { key: "Grenades", label: "Grenades" }
    ],
    []
  )

  const {
    currentAverage: currentStatsAverage,
    previousAverage: previousStatsAverage,
    showPrevious,
  } = calculateAverages(matches, matchCountStats, selectedButtonAimStats)

  const currentAverageNum = parseFloat(String(currentStatsAverage))
  const previousAverageNum = parseFloat(String(previousStatsAverage ?? "0"))

  const difference = currentAverageNum - previousAverageNum


  return (
    <>
      <PageHeader title="Stats" />
      <div className="grid grid-rows-9 relative h-full mb-6">
        <div className="flex row-span-1 rounded-md items-center max-h-[30px]">
          <ButtonGroup
            buttons={modeButtons}
            selectedButton={selectedButtonBoolean}
            onSelect={value =>
              handleButtonChange(setSelectedButtonBoolean, value)
            }
          />
          <p className="bg-black dark:bg-zinc-500 pointer-events-none select-none mx-3 w-[1px] h-full"></p>
            {selectedButtonBoolean === "Aim" ? (
              <ButtonGroup
                buttons={aimStatsButtons}
                selectedButton={selectedButtonAimStats}
                onSelect={value =>
                  handleButtonChange(setSelectedButtonAimStats, value)
                }
              />
            ) : (
              <ButtonGroup
                buttons={grenadesStatsButtons}
                selectedButton={selectedButtonGrenadesStats}
                onSelect={value =>
                  handleButtonChange(setSelectedButtonGrenadesStats, value)
                }
              />
            )}
        </div>
        {selectedButtonBoolean === "Aim" ? (
          selectedButtonAimStats === "All" ? (
            <>
              <div className="flex absolute top-0 right-0 z-50 items-center">
                <p className="mr-2">Stats |</p>
                <MatchChartButtons
                  selectedButton={matchCountStatsFull}
                  onSelect={handleMatchCountChangeStatsFull}
                  options={[15, 30, matches.length]}
                />
              </div>
              <AllStatsDisplay
                matchCount={matchCountStatsFull}
                selectedStat={selectedButtonAimStats}
                matches={matches}
              />
            </>
          ) : (
            <div className="row-span-3 relative pl-2 select-none">
              <div className="flex mt-[-74px] absolute top-0 right-0 z-50 items-center">
                <p className="mr-2">Chart |</p>
                <MatchChartButtons
                  selectedButton={matchCountStats}
                  onSelect={handleMatchCountChangeStats}
                  options={[15, 30, matches.length]}
                />
              </div>
              <StatsHeader
                matchCount={matchCountStats}
                selectedStat={selectedButtonAimStats}
              />
              <div className="max-w-[185px]">
                <StatsValue
                  currentAverage={String(currentStatsAverage)}
                  previousAverage={String(previousStatsAverage)}
                  difference={difference}
                  showPrevious={showPrevious}
                />
              </div>
              <FooterText />
              <MatchStatsChart
                matchCount={matchCountStats}
                selectedStat={selectedButtonAimStats}
              />
            </div>
          )
        ) : (
          <div className="flex row-span-3 text-2xl dark:text-zinc-500 text-zinc-500 justify-center">
            Under development
          </div>
        )}

        <div className="row-span-5 mt-4 pt-2">
          <div className="flex items-center justify-between rounded-md">
            <span className="text-lg font-semibold ml-2 select-none">
              CS2 ELO
            </span>
            <Button
              className="z-40 h-8 p-0 !min-w-14 rounded-md mb-[-5px]"
              variant="light"
            >
              <FunnyIcon />
            </Button>
          </div>
          {loading === "loading" && !matches.length && (
            <div className="flex justify-center pt-[110px] pl-[50px]">
              <Spinner
                role="status"
                aria-live="polite"
                className="text-default"
                color={loadingColor}
              />
            </div>
          )}
          {loading === "failed" && <div>Error: {error}</div>}
          {matches.length > 0 && (
            <div className="absolute">
              <div className="flex items-center ml-24 mt-[-26px] absolute z-50 gap-2">
                <MatchChartButtons
                  selectedButton={matchCountElo}
                  onSelect={handleMatchCountChangeElo}
                  options={[30, 100, matches.length]}
                />
              </div>
              <MatchEloChart matchCount={matchCountElo} />
            </div>
          )}
        </div>
      </div>
    </>
  )
})

export default PlayerStats
