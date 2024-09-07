export const mapGroupByMap = (maps: any[]) => {
  return maps.reduce((acc: Record<string, Record<string, any>>, map) => {
    const mapName = map["label"]
    if (!acc[mapName]) {
      acc[mapName] = {}
    }
    acc[mapName][map["mode"]] = map
    return acc
  }, {})
}

export const mapGroupByMode = (maps: any[]) => {
  return maps.reduce((acc: Record<string, Record<string, any>>, map) => {
    const mode = map["mode"]
    if (!acc[mode]) {
      acc[mode] = {}
    }
    acc[mode][map["mode"]] = map
    return acc
  }, {})
}