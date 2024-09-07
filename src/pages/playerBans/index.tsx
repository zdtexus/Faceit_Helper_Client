import React, { useContext, useEffect, useMemo, useState } from "react"
import { PageHeader } from "../../components/page-header"
import { useParams } from "react-router-dom"
import { usePlayerClear } from "../../features/player/usePlayerClear"
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { ArrowUpIcon } from "../../components/icons/arrow-up-icon"
import { ArrowDownIcon } from "../../components/icons/arrow-down-icon"
import { DropdownFilter } from "../../components/dropdown-filter"
import { useGetBansQuery } from "../../app/services/bansApi"
import { selectPlayer } from "../../features/player/playerSlice"
import { useAppSelector } from "../../app/hooks"
import { ThemeContext } from "../../components/theme-provider"
import { formatDuration } from "../../utils/formatDurationUtils"
import { renderTableCell } from "../../components/render-table-cell"

const PlayerBans: React.FC = React.memo(() => {
  const player = useAppSelector(selectPlayer)
  const { playerFaceitId } = player
  const playerFaceitid = playerFaceitId || "#"

  const { nickname } = useParams<{ nickname: string }>()
  const [selectedBanReason, setSelectedBanReason] = useState<Set<string>>(
    new Set(),
  )
  const [selectedExpired, setSelectedExpired] = useState<Set<string>>(new Set())
  const { data, error, isLoading } = useGetBansQuery(playerFaceitid)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  usePlayerClear(nickname || "")
  const { theme } = useContext(ThemeContext)
  const loadingColor = theme === "light" ? "default" : "white"

  const bans = useMemo(() => (Array.isArray(data) ? data : []), [data])

  const headerColumns = useMemo(
    () => [
      { uid: "reason", name: "Reason" },
      { uid: "banStart", name: "Start" },
      { uid: "banEnd", name: "End" },
      { uid: "banDuration", name: "Ban Duration" },
      { uid: "expired", name: "Expired" },
    ],
    [],
  )

  useEffect(() => {
    if (bans && Array.isArray(bans)) {
      const uniqueExpired = new Set(bans.map(ban => ban["expired"]))
      setSelectedExpired(new Set(uniqueExpired))

      const uniqueReason = new Set(bans.map(ban => ban["reason"]))
      setSelectedBanReason(new Set(uniqueReason))
    }
  }, [bans])

  if (error) {
    return <p className="mx-auto select-none text-2xl text-red-500">Error</p>
  }

  const handleBanReasonChange = (keys: Set<string>) => {
    setSelectedBanReason(keys)
  }

  const handleExpiredChange = (keys: Set<string>) => {
    setSelectedExpired(keys)
  }

  const filteredBans = bans.filter(
    ban =>
      (selectedExpired.size === 0 || selectedExpired.has(ban.expired)) &&
      (selectedBanReason.size === 0 || selectedBanReason.has(ban.reason)),
  )

  const sortedBans = [...filteredBans].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn] || 0
    const bValue = b[sortColumn] || 0

    return sortDirection === "asc"
      ? aValue > bValue
        ? -1
        : 1
      : aValue < bValue
        ? -1
        : 1
  })
  

  const uniqueExpired = Array.from(new Set(bans.map(ban => ban["expired"])))
  const uniqueReason = Array.from(new Set(bans.map(ban => ban["reason"])))

  return (
    <>
      <PageHeader title="Bans" />
      <div className="grid grid-cols-2 gap-4 pb-7 pt-0">
          <DropdownFilter
            buttonLabel="Select Expired"
            items={uniqueExpired.map(ban => ({ key: ban, label: ban }))}
            selectedKeys={selectedExpired}
            onSelectionChange={handleExpiredChange}
          />
          <DropdownFilter
            buttonLabel="Select Reasons"
            items={uniqueReason.map(ban => ({ key: ban, label: ban }))}
            selectedKeys={selectedBanReason}
            onSelectionChange={handleBanReasonChange}
          />
        </div>

        {selectedExpired.size === 0 &&
          selectedBanReason.size === 0 &&
          !isLoading && (
            <p className="absolute flex justify-center w-full text-xl text-zinc-600 dark:text-zinc-300 select-none top-[200px] z-10">
              No Bans found for the selected filters
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
          aria-label="Bans Table"
          className="overflow-y-none max-h-[600px]"
          classNames={{
            wrapper: "shadow-none min-h-[600px] bg-inherit p-0 pr-1 rounded-md",
            td: "p-0 py-[5px] text-center font-medium",
            th: " dark:text-zinc-300 text-zinc-900",
            tr: "h-[35px]",
          }}
        >
          <TableHeader columns={headerColumns}>
            {column => (
              <TableColumn
                key={column.uid}
                className={`${column.uid === "label" ? "!text-left pl-11" : ""} 
                max-w-fit text-center
                ${sortColumn === column.uid ? "dark:text-zinc-100 text-zinc800 font-bold" : ""}`}
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
            items={sortedBans}
            loadingContent={
              <Spinner color={loadingColor} role="status" aria-live="polite" />
            }
          >
            {item => (
              <TableRow key={item["banStart"]}>
                {columnKey => (
                  <TableCell key={columnKey}>
                    {columnKey === "banDuration"
                      ? formatDuration(item.banStart, item.banEnd)
                      : renderTableCell({
                          item,
                          columnKey: columnKey as string,
                          type: "ban",
                        })}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
    </>
  )
})

export default PlayerBans