import { format } from "date-fns"

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  
  let formattedDate = format(date, "MMM dd, yyyy HH:mm")

  if (formattedDate.includes("2024")) {
    formattedDate = formattedDate.replace("2024", "").trim()
  }

  formattedDate = formattedDate.replace("minutes", "m222").replace("hours", "h")
  formattedDate = formattedDate.replace(/(\d{2}):(\d{2})/, (match, p1, p2) => {
    return `${p1}h ${p2}m`
  })

  return formattedDate
}
