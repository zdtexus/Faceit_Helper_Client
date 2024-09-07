export const sortMatches = (
  matches: any[],
  sortColumn: string,
  sortDirection: "asc" | "desc"
): any[] => {
  return matches.sort((a, b) => {
    const aValue = a[sortColumn] ?? "";
    const bValue = b[sortColumn] ?? "";

    const isNumberColumn = ["kills", "deaths", "assists", "hsPercent", "mvps", "score"].includes(sortColumn);
    const aNum = isNumberColumn ? parseFloat(aValue) : aValue;
    const bNum = isNumberColumn ? parseFloat(bValue) : bValue;

    if (sortDirection === "asc") {
      return isNumberColumn ? aNum - bNum : aValue.localeCompare(bValue);
    } else {
      return isNumberColumn ? bNum - aNum : bValue.localeCompare(aValue);
    }
  });
};
