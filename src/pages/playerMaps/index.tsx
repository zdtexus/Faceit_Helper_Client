import { PageHeader } from "../../components/page-header"
import { useAppSelector } from "../../app/hooks"
import { selectPlayer } from "../../features/player/playerSlice"
import { useParams } from "react-router-dom"
import { usePlayerClear } from "../../features/player/usePlayerClear"
import React, { useContext, useMemo } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Spinner,
  TableCell,
} from "@nextui-org/react"
import { MAPS_KEYS, useGetMapsQuery } from "../../app/services/mapsApi"
import { ThemeContext } from "../../components/theme-provider"
import { headerColumns,  } from "../../utils/tableUtils"
import { DropdownFilter } from "../../components/dropdown-filter"
import { ArrowUpIcon } from "../../components/icons/arrow-up-icon"
import { ArrowDownIcon } from "../../components/icons/arrow-down-icon"
import { mapGroupByMap, mapGroupByMode } from "../../utils/selectGroups"
import { renderTableCell } from "../../components/render-table-cell"

 const PlayerMaps: React.FC = React.memo(() => {
  const player = useAppSelector(selectPlayer)

  const { nickname } = useParams<{ nickname: string }>()

  usePlayerClear(nickname || "")

  const { playerFaceitId } = player
  const playerFaceitid = playerFaceitId || "#"

  const { data, error, isLoading } = useGetMapsQuery(playerFaceitid)

  const [selectedModes, setSelectedModes] = React.useState<Set<string>>(
    new Set(["5v5"]),
  )
  const [selectedStats, setSelectedStats] = React.useState<Set<string>>(
    new Set([
      "Matches",
      "Win Rate %",
      "Average Headshots %",
      "Average Kills",
      "Average Deaths",
      "Average Assists",
      "Average K/R Ratio",
      "Average K/D Ratio",
      "ADR",
    ]),
  )
  const [selectedMaps, setSelectedMaps] = React.useState<Set<string>>(
    new Set([
      "Mirage",
      "Dust2",
      "Anubis",
      "Ancient",
      "Vertigo",
      "Inferno",
      "Overpass",
      "Nuke",
    ]),
  )

  const [sortColumn, setSortColumn] = React.useState<string>("Matches")
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc",
  )

  const { theme } = useContext(ThemeContext)
  const loadingColor = theme === "light" ? "default" : "white"

  const maps = useMemo(() => (Array.isArray(data) ? data : []), [data])

  if (error) {
    return <p className="mx-auto select-none text-2xl text-red-500">Error</p>
  }
  



  const mapGroups = mapGroupByMap(maps)
  const modeGroups = mapGroupByMode(maps)

  const filteredMaps = Object.entries(mapGroups).flatMap(([label, modes]) => {
    if (selectedMaps.has(label)) {
      return Object.values(modes).filter(map => selectedModes.has(map.mode))
    }
    return []
  })

  
  const sortedMaps = [...filteredMaps].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = Number(a.stats[sortColumn]) || 0
    const bValue = Number(b.stats[sortColumn]) || 0

    return sortDirection === "asc"
      ? aValue > bValue
        ? -1
        : 1
      : aValue < bValue
        ? -1
        : 1
  })

  const handleModesChange = (keys: Set<string>) => {
    setSelectedModes(keys)
  }

  const handleStatsChange = (keys: Set<string>) => {
    setSelectedStats(keys)
  }

  const handleMapsChange = (keys: Set<string>) => {
    setSelectedMaps(keys)
  }

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  const HeaderColumns = headerColumns(selectedStats)
  
  return (
    <>
      <PageHeader title="Maps" />

        <div className="grid grid-cols-3 gap-4 pb-7 pt-0">
          <DropdownFilter
            buttonLabel="Select Maps"
            items={Array.from(
              new Set(
                Object.keys(mapGroups).map(label => ({ key: label, label })),
              ),
            )}
            selectedKeys={selectedMaps}
            onSelectionChange={handleMapsChange}
          />
          <DropdownFilter
            buttonLabel="Select Modes"
            items={Array.from(
              new Set(
                Object.keys(modeGroups).map(label => ({ key: label, label })),
              ),
            )}
            selectedKeys={selectedModes}
            onSelectionChange={handleModesChange}
          />
          <DropdownFilter
            buttonLabel="Select Stats"
            items={MAPS_KEYS}
            selectedKeys={selectedStats}
            onSelectionChange={handleStatsChange}
          />
        </div>

        {selectedModes.size > 0 && !isLoading && sortedMaps.length === 0 && (
          <p className="absolute flex justify-center w-full text-xl text-zinc-600 dark:text-zinc-300 select-none top-[200px] z-10">
            No maps found for the selected filters
          </p>
        )}

        {isLoading && (
          <Spinner
            className="absolute flex justify-center w-full top-[400px] z-10"
            color={loadingColor}
          />
        )}

        <Table
          isHeaderSticky
          isStriped
          aria-label="Maps Table"
          className="overflow-y-none max-h-[600px]"
          classNames={{
            wrapper: "shadow-none scroll-rounded min-h-[600px] bg-inherit p-0 pr-1 rounded-md",
            td: "p-0 py-[5px] text-center font-medium",
            th: "dark:text-zinc-300 text-zinc-900",
          }}
        >
          <TableHeader columns={HeaderColumns}>
            {column => (
              <TableColumn
                key={column.uid}
                className={`${column.uid === "label" ? "!text-left pl-11" : ""} 
                max-w-fit text-center cursor-pointer 
                ${sortColumn === column.uid ? "dark:text-zinc-100 text-zinc800 font-bold" : ""}`}
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
            items={sortedMaps}
            loadingContent={
              <Spinner color={loadingColor} role="status" aria-live="polite" />
            }
          >
            {item => (
              <TableRow key={`${item["label"]}+${item["mode"]}`}>
                {HeaderColumns.map(column => (
                  <TableCell key={column.uid}>
                    {renderTableCell({
                      item,
                      columnKey: column.uid,
                      type: "map",
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

export default PlayerMaps