export const filterMatches = (
  matches: any[],
  selectedMaps: Set<string>,
  selectedModes: Set<string>,
) => {
  return matches.filter(
    match =>
      selectedMaps.has(match["map"]) &&
      (selectedModes.size === 0 || selectedModes.has(match["mode"])),
  )
}

export const filterMaps = (
maps: any[],
selectedMaps: Set<string>,
selectedModes: Set<string>,
) => {
return maps.filter(
  map =>
    selectedMaps.has(map["map"]) &&
    (selectedModes.size === 0 || selectedModes.has(map["mode"])),
)
}
