import { Select, SelectItem } from "@nextui-org/react"
import React from "react"

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
}

const regions = [
  { key: "EU", label: "Europe" },
  { key: "NA", label: "North America" },
  { key: "SA", label: "South America" },
  { key: "SEA", label: "Southeast Asia" },
  { key: "OCE", label: "Oceania" },
]

export const RegionSelect: React.FC<CountrySelectProps> = React.memo(
  ({ value, onChange }) => {
    return (
      <Select
        aria-labelledby="regionLabel"
        aria-label="regionLabel"
        disallowEmptySelection
        placeholder="Select region"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="max-w-xs shadow-xl rounded-xl"
        defaultSelectedKeys={[ "EU"]}
      >
        {regions.map(region => (
          <SelectItem key={region.key} value={region.key} >
            {region.label}
          </SelectItem>
        ))}
      </Select>
    )
  },
)
