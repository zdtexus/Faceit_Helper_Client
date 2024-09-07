import { formatDate } from "../../utils/dateUtils"
import { getCellDetails } from "../../utils/getCellDetails"
import { Tooltip } from "@nextui-org/react"
import { getEloDifference } from "../../utils/getEloDifferenceUtils"
import { MapImage } from "../map-image"

interface RenderTableCellProps {
  item: any
  columnKey: string
  eloValues?: number[]
  index?: number
  type: "ban" | "map" | "match"
}

export const renderTableCell: React.FC<RenderTableCellProps> = ({
  item,
  columnKey,
  eloValues,
  index,
  type,
}) => {
  const statValue =
    type === "ban"
      ? item[columnKey]
      : type === "match"
        ? { value: item[columnKey] }
        : item.stats?.[columnKey as string]

  const { cellClass, tooltipContent } = getCellDetails(
    typeof statValue === "object" && statValue !== null
      ? statValue.value
      : statValue,
    columnKey,
    item,
  )

  let difference, colorClass

  if (index !== undefined && eloValues !== undefined) {
    const result = getEloDifference(index, eloValues)
    difference = result.difference
    colorClass = result.colorClass
  }

  const formatStatValue = (value: any, key: string) => {
    if (typeof value === "object" && value !== null) {
      value = value.value
    }
    if (key === "Win Rate %" || key === "Average Headshots %") {
      return `${value || "N/A"}%`
    }
    return value || "N/A"
  }


  switch (columnKey) {
    case "reason":
      return (
        <div className={`${cellClass}`}>
          {item[columnKey] == null
            ? "~"
            : item[columnKey] === "unsportsmanlike conduct"
              ? "unsp-like conduct"
              : item[columnKey]}
        </div>
      )
    case "banStart":
    case "banEnd":
      return (
        <div className={`${cellClass}`}>
          {item[columnKey] == null ? "~" : formatDate(item[columnKey])}
        </div>
      )

    case "expired":
      return (
        <div
          className={`${cellClass} ${item[columnKey] === "true" ? "text-green-400" : "text-red-400"}`}
        >
          {item[columnKey] == null ? "~" : item[columnKey]}
        </div>
      )

    case "label":
      if (type === "map") {
        return (
          <MapImage mapName={item.label?.toLowerCase()} altMap={item.img} />
        )
      }
      break

    case "mode":
      return type === "map" ? (
        item.mode
      ) : type === "match" ? (
        item[columnKey] == null ? (
          "~"
        ) : (
          <p>{item[columnKey] || "~"}</p>
        )
      ) : null

    case "date":
      if (type === "match") {
        return <span className="text-xs">{formatDate(item[columnKey])}</span>
      }
      break

    case "elo":
      if (type === "match") {
        return item[columnKey] == null ? (
          "~"
        ) : (
          <div className={`relative inline-block ml-3 mr-10`}>
            {item[columnKey]}
            {difference && (
              <sup className={`absolute mx-1 top-[-5px] font-bold  text-xs ${colorClass}`}>
                {difference}
              </sup>
            )}
          </div>
        )
      }
      break

    case "map":
      if (type === "match") {
        return item[columnKey] == null ? (
          "~"
        ) : (
          <MapImage
            mapName={item[columnKey]}
            altMap="/images/maps/default-map.webp"
          />
        )
      }
      break

    case "score":
      if (type === "match") {
        return (
          <div className="flex flex-col items-center justify-center text-xs font-bold">
            {item.result === "0" && (
              <div className="bg-red-500 w-fit text-white px-2 py-0.5 rounded-md">
                Loss
              </div>
            )}
            {item.result === "1" && (
              <div className="bg-green-500 w-fit text-white px-2 py-0.5 rounded-md">
                Win
              </div>
            )}
            <p className="mt-1">{item[columnKey] || "~"}</p>
          </div>
        )
      }
      break

    case "HS %":
      if (type === "match") {
        return item[columnKey] == null ? (
          `~`
        ) : (
          <div className={`${cellClass}`}>{`${item[columnKey] || `~`}%`}</div>
        )
      }
      break

    default:
      return (
        <div className={`${cellClass}`}>
          {tooltipContent.length ? (
            <Tooltip
              content={
                <div className="text-center">
                  {tooltipContent.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              }
              delay={600}
              placement="bottom"
            >
              {formatStatValue(statValue, columnKey)}
            </Tooltip>
          ) : (
            <span>{formatStatValue(statValue, columnKey)}</span>
          )}
        </div>
      )
  }
  return <div className={`${cellClass}`}>{item[columnKey] || "~"}</div>
}
