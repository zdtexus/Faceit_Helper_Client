import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { PageHeader } from "../../components/page-header"
import { useAppSelector } from "../../app/hooks"
import { selectPlayer } from "../../features/player/playerSlice"
import { useParams } from "react-router-dom"
import { usePlayerClear } from "../../features/player/usePlayerClear"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react"
import { sortMatches } from "../../utils/sortUtils"
import { filterMatches } from "../../utils/filterUtils"
import { getHeaderColumns,  } from "../../utils/tableUtils"
import { ThemeContext } from "../../components/theme-provider"
import { DropdownFilter } from "../../components/dropdown-filter"
import { ArrowUpIcon } from "../../components/icons/arrow-up-icon"
import { ArrowDownIcon } from "../../components/icons/arrow-down-icon"
import { renderTableCell } from "../../components/render-table-cell"
import { MATCH_KEYS, useGetMatchesQuery } from "../../app/services/matchesApi"
import { MATCH_URL } from "../../constants"
import { countOccurrences } from "../../utils/countOccurrencesUtils"

const PlayerMatches: React.FC = React.memo(() => {
  const player = useAppSelector(selectPlayer)
  const { nickname } = useParams<{ nickname: string }>()
  usePlayerClear(nickname || "")

  const { playerFaceitId } = player
  const playerFaceitID = playerFaceitId || "#"

  const [isFiltering, setIsFiltering] = useState<boolean>(false)
  const [selectedMaps, setSelectedMaps] = useState<Set<string>>(new Set())
  const [selectedStats, setSelectedStats] = useState<Set<string>>(
    new Set([
      "hsPercent",
      "elo",
      "date",
      "kills",
      "deaths",
      "assists",
      "kdRatio",
      "krRatio",
    ])
  )
  const [selectedModes, setSelectedModes] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [originalMatches, setOriginalMatches] = useState<any[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [matches, setMatches] = useState<any[]>([])
  const [mapItems, setMapItems] = useState<{ key: string; label: string }[]>([])
  const [modeItems, setModeItems] = useState<{ key: string; label: string }[]>(
    []
  )

  const loaderRef = useRef<HTMLDivElement | null>(null)

  const { data, isLoading } = useGetMatchesQuery({
    playerId: playerFaceitID,
    offset,
  })

  const loadMatchess = useCallback(async () => {
    if (!hasMore || isLoading || isFiltering) return

    if (Array.isArray(data)) {
      setMatches(prevMatches => [...prevMatches, ...data])
      setOriginalMatches(prevMatches => [...prevMatches, ...data])
      setHasMore(data.length > 0)
      setOffset(prevOffset => prevOffset + 1)
    } else {
      console.error("Unexpected data format:", data)
      setHasMore(false)
    }
    setLoadingMore(false)
  }, [data, isFiltering, hasMore, isLoading])

  useEffect(() => {
    if (originalMatches.length > 0) {
      const mapsArray = originalMatches.map(match => match.map)
      const modesArray = originalMatches.map(match => match.mode)

      const mapCounts = countOccurrences(mapsArray)
      const modeCounts = countOccurrences(modesArray)

      const uniqueMaps = new Set(mapsArray)
      const uniqueModes = new Set(modesArray)

      setSelectedMaps(prevMaps => new Set([...prevMaps, ...uniqueMaps]))
      setSelectedModes(prevModes => new Set([...prevModes, ...uniqueModes]))

      const mapItems = Array.from(uniqueMaps).map(map => ({
        key: map,
        label: `${map} - ${mapCounts[map]}`,
      }))
      const modeItems = Array.from(uniqueModes).map(mode => ({
        key: mode,
        label: `${mode} - ${modeCounts[mode]}`,
      }))

      setMapItems(mapItems)
      setModeItems(modeItems)
    }
  }, [originalMatches])

  useEffect(() => {
    setIsFiltering(false)
  }, [selectedMaps, selectedModes, selectedStats])

  const filteredMatches = filterMatches(
    originalMatches,
    selectedMaps,
    selectedModes
  )

  const sortedMatches = sortMatches(filteredMatches, sortColumn, sortDirection)
  const headerColumns = getHeaderColumns(selectedStats)
  const eloValues = originalMatches.map(match => match["elo"] || 0)

  const { theme } = useContext(ThemeContext)
  const loadingColor = theme === "light" ? "default" : "white"

  const handleMapsChange = (keys: Set<string>) => {
    setSelectedMaps(keys)
    setIsFiltering(true)
  }

  const handleModesChange = (keys: Set<string>) => {
    setSelectedModes(keys)
    setIsFiltering(true)
  }

  const handleStatsChange = (keys: Set<string>) => {
    setSelectedStats(keys)
    setIsFiltering(true)
  }

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  const handleRowClick = useCallback((matchId: string) => {
    window.open(`${MATCH_URL}${matchId}`, "_blank")
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFiltering) {
          loadMatchess()
        }
      },
      { threshold: 1.0 }
    )

    const currentLoaderRef = loaderRef.current
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef)
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef)
      }
    }
  }, [loadMatchess, isFiltering])


  return (
    <>
      <PageHeader title="Matches" />

      <div className="grid grid-cols-3 gap-4 pb-7 pt-0">
        <DropdownFilter
          buttonLabel="Select Maps"
          items={mapItems}
          selectedKeys={selectedMaps}
          onSelectionChange={handleMapsChange}
        />

        <DropdownFilter
          buttonLabel="Select Modes"
          items={modeItems}
          selectedKeys={selectedModes}
          onSelectionChange={handleModesChange}
        />
        <DropdownFilter
          className="max-h-[450px]"
          buttonLabel="Select Stats"
          items={MATCH_KEYS}
          selectedKeys={selectedStats}
          onSelectionChange={handleStatsChange}
        />
      </div>

      <Table
        isHeaderSticky
        aria-label="Matches Table"
        selectionMode="single"
        classNames={{
          base: "max-h-[600px]",
          table: "min-h-[300px]",
          wrapper: "shadow-none scroll-rounded rounded-none p-0 pr-1 bg-inherit ease-in duration-500",
          td: "p-0 py-[5px] text-center font-medium max-w-[120px]",
          th: " dark:text-zinc-300 text-zinc-900",
        }}
        bottomContent={
          hasMore && (
            <div className="flex justify-center">
              <Spinner
                ref={loaderRef}
                role="status"
                aria-live="polite"
                className="text-default"
                color={loadingColor}
              />
            </div>
          )
        }
      >
        <TableHeader columns={headerColumns}>
          {column => (
            <TableColumn
              key={column.uid}
              className={`max-w-fit text-center cursor-pointer ${
                sortColumn === column.uid ? "font-bold" : ""
              }`}
              onClick={() => handleSort(column.uid)}
            >
              {column.name}
              {sortColumn === column.uid && (
                <span className="ml-1 absolute">
                  {sortDirection === "asc" ? (
                    <ArrowUpIcon />
                  ) : (
                    <ArrowDownIcon />
                  )}
                </span>
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={sortedMatches}
          loadingContent={
            <Spinner color={loadingColor} role="status" aria-live="polite" />
          }
        >
          {item => (  
            <TableRow
              key={item["matchId"]}
              className="cursor-pointer"
              onClick={() => handleRowClick(item["matchId"])}
            >
              {headerColumns.map(column => (
                <TableCell key={column.uid} className="text-center">
                  {renderTableCell({
                    item,
                    columnKey: column.uid,
                    eloValues: eloValues,
                    index: originalMatches.indexOf(item),
                    type: "match",
                  })}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
})

export default PlayerMatches