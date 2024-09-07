import { MAPS_KEYS } from "../app/services/mapsApi"
import { MATCH_KEYS } from "../app/services/matchesApi"

export interface MapData {
  label: string
  mode: string
  img: string
  stats: Record<string, number>
}

export const headerColumns = (selectedStats: Set<string>) => [
  { uid: "mode", name: "Mode" },
  { uid: "label", name: "Map" },
  ...MAPS_KEYS.filter(({ key }) => selectedStats.has(key)).map(
    ({ key, label }) => ({
      uid: key,
      name: label,
    }),
  ),
]

export const getHeaderColumns = (selectedStats: Set<string>) => [
  { uid: "mode", name: "Mode" },
  { uid: "map", name: "Map" },
  { uid: "score", name: "Score" },
  ...MATCH_KEYS.filter(({ key }) => selectedStats.has(key)).map(
    ({ key, label }) => ({
      uid: key,
      name: label,
    }),
  ),
]
