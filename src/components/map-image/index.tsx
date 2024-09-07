import { Image } from "@nextui-org/react";
import { useMemo } from "react";

interface MapImageProps {
  mapName: string;
  altMap?: string;
}

const validMaps = [
  "mirage",
  "nuke",
  "dust2",
  "inferno",
  "anubis",
  "ancient",
  "overpass",
  "vertigo",
];

export const MapImage: React.FC<MapImageProps> = ({ mapName, altMap }) => {
  const mapImage = useMemo(() => {
    if (validMaps.includes(mapName.toLowerCase())) {
      return `/images/maps/${mapName.toLowerCase()}.webp`;
    }
    return altMap || `/images/maps/default-map.webp`;
  }, [mapName, altMap]);

  return (
    <div className="flex min-h-[59px] min-w-[117px] max-w-[130px] pr-2">
      <Image
        src={mapImage}
        alt={mapName}
        className="!w-[95px] !h-[56px] select-none pointer-events-none rounded-sm"
      />
      <p className="cursor-default max-h-[55px] writing-mode-vertical-lr text-xs uppercase font-medium ml-0.5">
        {mapName}
      </p>
    </div>
  );
};
