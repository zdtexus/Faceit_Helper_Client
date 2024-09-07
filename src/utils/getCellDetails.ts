import { type Map } from "../app/services/mapsApi"

export const getCellDetails = (statValue: string, key: string, map?: Map) => {
  let cellClass = ""
  const tooltipContent: string[] = []

  const value = Number(+statValue)

  switch (key) {
    case "kills":
      if (value < 10) cellClass = "text-red-600"
      else if (value < 12) cellClass = "text-red-300"
      else if (value > 20) cellClass = "dark:text-green-500 text-green-700"
      else if (value > 16) cellClass = "dark:text-green-400 text-green-600"
      else if (value >= 12) cellClass = "dark:text-green-300 text-green-500"
      break

    case "deaths":
      if (value > 18) cellClass = "text-red-500"
      else if (value > 16) cellClass = "text-red-300"
      else if (value < 11) cellClass = "dark:text-green-500 text-green-700"
      else if (value < 13) cellClass = "dark:text-green-300 text-green-500"
      else if (value <= 16) cellClass = "dark:text-green-300 text-green-500"
      break

    case "assists":
      if (value < 2) cellClass = "text-red-500"
      else if (value < 3) cellClass = "text-red-300"
      else if (value > 6) cellClass = "dark:text-green-500 text-green-700"
      else if (value > 4) cellClass = "dark:text-green-300 text-green-500"
      else if (value >= 3) cellClass = "dark:text-green-300 text-green-500"
      break

    case "kdRatio":
      if (value < 0.7) cellClass = "text-red-500"
      else if (value < 1) cellClass = "text-red-300"
      else if (value > 1.5) cellClass = "dark:text-green-500 text-green-700"
      else if (value > 1.2) cellClass = "dark:text-green-300 text-green-500"
      else if (value >= 1) cellClass = "dark:text-green-300 text-green-500"
      break

    case "krRatio":
      if (value < 0.6) cellClass = "text-red-500"
      else if (value < 0.68) cellClass = "text-red-300"
      else if (value > 0.9) cellClass = "dark:text-green-500 text-green-700"
      else if (value > 0.8) cellClass = "dark:text-green-300 text-green-500"
      else if (value >= 0.68) cellClass = "dark:text-green-300 text-green-500"
      break

    case "hsPercent":
      if (value < 40) cellClass = "text-red-500"
      else if (value < 50) cellClass = "text-red-300"
      else if (value > 70) cellClass = "dark:text-green-500 text-green-700"
      else if (value > 60) cellClass = "dark:text-green-300 text-green-500"
      else if (value >= 50) cellClass = "dark:text-green-300 text-green-500"
      break

    case "mode":
      cellClass = "text-white hover:text-white"
      break

    case "banEnd": {
      const banEndDate = new Date(value)
      const currentDate = new Date()

      if (banEndDate > currentDate) {
        cellClass = "text-red-600"
      } else {
        cellClass = "dark:text-green-300 text-green-600"
      }
      break
    }

    case "banStart":
      cellClass = "dark:text-red-300 text-red-600"
      break

    case "Average K/D Ratio":
      tooltipContent.push(`Kills: ${map?.stats["Kills"] || "N/A"}`)
      tooltipContent.push(`Deaths: ${map?.stats["Deaths"] || "N/A"}`)
      if (value < 0.9) cellClass = "text-red-600"
      else if (value < 1) cellClass = "text-red-300"
      else if (value > 1.25) cellClass = "dark:text-green-500 text-green-700"
      else if (value > 1.1) cellClass = "dark:text-green-400 text-green-600"
      else if (value >= 1) cellClass = "dark:text-green-300 text-green-500"
      break

    case "Average K/R Ratio":
      tooltipContent.push(`Kills: ${map?.stats["Kills"] || "N/A"}`)
      tooltipContent.push(`Rounds: ${map?.stats["Rounds"] || "N/A"}`)
      if (value < 0.6) cellClass = "text-red-500"
      else if (value < 0.7) cellClass = "text-red-300"
      else if (value > 0.9) cellClass = "dark:text-green-500 text-green-700"
      else if (value > 0.8) cellClass = "dark:text-green-300 text-green-500"
      else if (value >= 0.7) cellClass = "dark:text-green-300 text-green-500"
      break

    case "ADR":
      if (value < 55) cellClass = "text-red-500"
      else if (value < 70) cellClass = "text-red-300"
      else if (value > 95) cellClass = "dark:text-green-500 text-green-700"
      else if (value > 80) cellClass = "dark:text-green-400 text-green-600"
      else if (value > 70) cellClass = "dark:text-green-300 text-green-500"
      break

    case "Average Kills":
      tooltipContent.push(`Kills: ${map?.stats["Kills"] || "N/A"}`)
      if (value <= 12) cellClass = "text-red-500"
      else if (value <= 14) cellClass = "text-red-300"
      else if (value >= 20) cellClass = "dark:text-green-500 text-green-700"
      else if (value >= 17) cellClass = "dark:text-green-400 text-green-600"
      else if (value >= 14) cellClass = "dark:text-green-300 text-green-500"
      break

    case "Average Deaths":
      tooltipContent.push(`Deaths: ${map?.stats["Deaths"] || "N/A"}`)
      if (value >= 20) cellClass = "text-red-600"
      else if (value >= 17.5) cellClass = "text-red-400"
      else if (value >= 16.5) cellClass = "text-red-300"
      else if (value <= 13) cellClass = "dark:text-green-500 text-green-700"
      else if (value <= 15) cellClass = "dark:text-green-400 text-green-600"
      else if (value <= 16.5) cellClass = "dark:text-green-300 text-green-500"
      break

    case "Average Assists":
      tooltipContent.push(`Assists: ${map?.stats["Assists"] || "N/A"}`)
      if (value <= 2) cellClass = "text-red-500"
      else if (value <= 4) cellClass = "text-red-300"
      else if (value >= 6) cellClass = "dark:text-green-500 text-green-700"
      else if (value >= 5) cellClass = "dark:text-green-400 text-green-600"
      else if (value >= 4) cellClass = "dark:text-green-300 text-green-500"
      break

    case "Average Triple Kills":
      tooltipContent.push(
        `Triple Kills: ${map?.stats["Triple Kills"] || "N/A"}`,
      )
      break

    case "Entry Success Rate":
      tooltipContent.push(
        `Total Entry: ${map?.stats["Total Entry Count"] || "N/A"}`,
      )
      break

    case "Flash Success Rate":
      tooltipContent.push(
        `Total Flash: ${map?.stats["Total Flash Count"] || "N/A"}`,
      )
      tooltipContent.push(
        `Enemies Flashed: ${map?.stats["Enemies Flashed per Round"] || "N/A"}`,
      )
      tooltipContent.push(
        `Flash/Round: ${map?.stats["Flashes per Round"] || "N/A"}`,
      )
      break

    case "Utility Usage per Round":
      tooltipContent.push(
        `Utility Damage Rate: ${map?.stats["Utility Damage Success Rate"] || "N/A"}`,
      )
      tooltipContent.push(
        `Total Utility Damage: ${map?.stats["Total Utility Damage"] || "N/A"}`,
      )
      break

    case "Utility Damage per Round":
      tooltipContent.push(
        `Utility Count: ${map?.stats["Total Utility Count"] || "N/A"}`,
      )
      tooltipContent.push(
        `Utility Rate: ${map?.stats["Utility Success Rate"] || "N/A"}`,
      )
      break

    case "Average Quadro Kills":
      tooltipContent.push(
        `Quadro Kills: ${map?.stats["Quadro Kills"] || "N/A"}`,
      )
      break

    case "Average Penta Kills":
      tooltipContent.push(`Penta Kills: ${map?.stats["Penta Kills"] || "N/A"}`)
      break

    case "Average MVPs":
      tooltipContent.push(`MVPs: ${map?.stats["MVPs"] || "N/A"}`)
      break

    case "Sniper Kill Rate per Round":
      tooltipContent.push(
        `Total Sniper Kills: ${map?.stats["Total Sniper Kills"] || "N/A"}`,
      )
      break

    case "Win Rate %":
      tooltipContent.push(`Wins: ${map?.stats["Wins"] || "N/A"}`)
      if (value < 40) cellClass = "text-red-500"
      else if (value < 50) cellClass = "text-red-300"
      else if (value > 70) cellClass = "dark:text-green-500 text-green-700"
      else if (value >= 50) cellClass = "dark:text-green-400 text-green-600"
      break

    case "Average Headshots %":
      tooltipContent.push(`Total HS: ${map?.stats["Headshots"] || "N/A"}`)
      tooltipContent.push(
        `HS/Match: ${map?.stats["Headshots per Match"] || "N/A"}`,
      )
      if (value < 40) cellClass = "text-red-500"
      else if (value < 50) cellClass = "text-red-300"
      else if (value > 70) cellClass = "dark:text-green-500 text-green-700"
      else if (value >= 50) cellClass = "dark:text-green-400 text-green-600"
      break

    default:
      break
  }

  return { cellClass, tooltipContent }
}

