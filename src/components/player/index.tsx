import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPlayer, clearPlayer } from "../../features/player/playerSlice";
import { useContext } from "react";
import {
  CardHeader,
  CardBody,
  Image,
  Link,
  Tooltip,
  Card,
} from "@nextui-org/react";
import { LevelIndicator } from "../icons/level-Indicator";
import { RegionFlagIcon } from "../icons/region-flag-icon";
import { formatNumber } from "../../utils/formatNumberUtils";
import { PlayerFaceitIcon } from "../icons/player-faceit-icon";
import { PlayerSteamIcon } from "../icons/player-steam-icon";
import { ThemeContext } from "../theme-provider";
import { useLocation, useNavigate } from "react-router-dom";
import { CountryFlagIcon } from "../icons/сountry-flag-icon";
import { motion } from "framer-motion";
import { PlayerNavBar } from "../nav-bars";

interface PlayerProps {
  isExiting: boolean;
}

export const Player: React.FC<PlayerProps> = ({ isExiting }) => {
  const dispatch = useAppDispatch();
  const player = useAppSelector(selectPlayer);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const textBackground =
    theme === "light"
      ? "/images/default-light.webp"
      : "/images/default-dark.webp";

  if (!player) {
    return null;
  }

  const {
    nickname,
    description,
    avatarUrl,
    faceitUrl,
    elo,
    skillLevel,
    steamUrl,
    regionRank,
    countryRank,
    playerFaceitId,
    region,
    country,
  } = player;

  const lvl = skillLevel || 0;

  const defaultAvatarUrl = avatarUrl || textBackground;
  const defaultFaceitUrl = faceitUrl || "#";
  const defaultSteamUrl = steamUrl || "#";
  const playerNickname = nickname || "#";
  const playerFaceitid = playerFaceitId || "#";
  const playerRegion = region || "#";
  const playerCountry = country || "#";
  const formattedRegionRank = formatNumber(regionRank || 0);
  const formattedCountryRank = formatNumber(countryRank || 0);

  const textColor = "text-gray-900 dark:text-gray-100";

  const paths = [`/${nickname}/stats`, `/${nickname}/maps`, `/${nickname}/matches`, `/${nickname}/bans`];

  const handleClearPlayer = () => {
    dispatch(clearPlayer());
    if (paths.some(path => location.pathname.startsWith(path))) {
      navigate(`/`, { replace: true });
      return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.9 : 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl transition-theme ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'}`}
    >
      <Card className='pb-2 bg-transition'>
        <CardHeader className="p-0 pt-5 flex-col relative scale-[1.07] bg-transition z-0 select-none">
          <Image
            alt="Card player"
            className="object-cover z-0 scale-[0.96]"
            src={defaultAvatarUrl}
            width={230}
            height={230}
            loading="lazy"
          />
          <div className="flex absolute w-[223px] rounded-b-lg bottom-0 bg-zinc-950/[.85] backdrop-blur-xl py-0.5">
            <div className="flex w-full ml-2">
              <LevelIndicator level={lvl} />
              <p
                className={`flex-1 pt-0.5 text-lg font-bold text-[#ff3535] pl-2`}
              >
                {elo} Elo
              </p>
              <div className="flex gap-4 mr-3">
                <Tooltip content="Faceit Profile" delay={300} placement="top">
                  <Link href={defaultFaceitUrl} isExternal>
                    <PlayerFaceitIcon className="text-xl text-orange-600" />
                  </Link>
                </Tooltip>
                <Tooltip content="Steam Profile" delay={300} placement="top">
                  <Link href={defaultSteamUrl} isExternal>
                    <PlayerSteamIcon className="text-xl text-neutral-200" />
                  </Link>
                </Tooltip>
              </div>
            </div>
          </div>
          <button
            onClick={handleClearPlayer}
            className="flex absolute top-[23px] right-[23px] w-[27px] h-[27px] justify-center transition-all bg-red-700 hover:bg-red-600 text-white border-b-2 border-r-1 shadow-2xl border-black rounded-md z-10"
            aria-label="Close"
          >
            ✕
          </button>
        </CardHeader>
        <CardBody className="ml-2.5 mt-2 pb-0">
          <h4 className="flex justify-between ">
            <div className={`flex font-bold ${textColor}`}>{nickname}</div>
            <div className={`grid pr-10 ${textColor}`}>
              <Tooltip content={`Region: ${region}`} delay={300} placement="right">
                <span className="flex gap-1">
                  <RegionFlagIcon region={playerRegion} /> {formattedRegionRank}
                </span>
              </Tooltip>
              <Tooltip content={`Country: ${country}`} delay={300} placement="right">
                <span className="flex gap-1">
                  <CountryFlagIcon country={playerCountry} />
                  {formattedCountryRank}
                </span>
              </Tooltip>
            </div>
          </h4>
          <p className={`text-default-400 absolute bottom-0 ${textColor}`}>
            {description || undefined}
          </p>
        </CardBody>
        <PlayerNavBar
          nickname={playerNickname}
          playerFaceitId={playerFaceitid}
        />
      </Card>
    </motion.div>
  );
};
