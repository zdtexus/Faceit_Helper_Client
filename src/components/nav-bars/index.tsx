import React, { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ThemeContext } from "../theme-provider"

import { NavBotIcon } from "../icons/nav-bot-icon"
import { NavEseaIcon } from "../icons/nav-esea-icon"
import { NavRankingIcon } from "../icons/nav-ranking-icon"
import { NavSearchIcon } from "../icons/nav-search-icon"
import { PlayerStatsIcon } from "../icons/player-stats-icon"
import { PlayerMatchesIcon } from "../icons/player-matches-icon"
import { PlayerMapsIcon } from "../icons/player-maps-icon"
import { PlayerBansIcon } from "../icons/player-bans-icon"

import { Button } from "../button"

type NavButtonProps = {
  children: React.ReactNode
  icon?: JSX.Element
  href?: string
  className?: string
}

export const NavButton: React.FC<NavButtonProps> = ({
  children,
  icon,
  href,
  className,
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    if (href) {
      navigate(href)
    }
  }

  const isActive = href && location.pathname === href

  return (
    <Button
      disableRipple={true}
      className={`flex justify-start transition duration-200 hover:scale-[1.02] button-container hover:bg-inherit hover:text-zinc-950/[0.8] dark:hover:text-white/[0.8] text-xl w-full ${isActive ? "text-zinc-800 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 active" : ""} ${className}`}
      icon={icon}
      onClick={handleClick}
      data-hover={false}
    >
      <div className="line-container">{children}</div>
    </Button>
  )
}

export const NavBar = React.memo(() => {
  const { theme } = useContext(ThemeContext)

  return (
    <nav>
      <div
        className={`flex flex-col gap-4 px-3 py-4 transition-theme ${theme === "light" ? "bg-white text-black" : "bg-zinc-900 text-white"}`}
      >
        <NavButton href="/" icon={<NavSearchIcon />}>
          Search
        </NavButton>
        <NavButton href="/ranking" icon={<NavRankingIcon />}>
          Rankings
        </NavButton>
        <NavButton href="/esea" icon={<NavEseaIcon />}>
          Esea
        </NavButton>
        <NavButton href="/tg-bot" icon={<NavBotIcon />}>
          Tg-bot
        </NavButton>
      </div>
    </nav>
  )
})

interface PlayerNavBarProps {
  nickname: string
  playerFaceitId: string
}

export const PlayerNavBar: React.FC<PlayerNavBarProps> = React.memo(
  ({ nickname }) => {
    const height = "pl-0 pl-2 max-h-[44px]"

    return (
      <nav>
        <div className="flex flex-col gap-0 px-3 pb-2 mt-2">
          <NavButton
            href={`/${nickname}/stats`}
            className={height}
            icon={<PlayerStatsIcon />}
          >
            Stats
          </NavButton>
          <NavButton
            href={`/${nickname}/matches`}
            className={height}
            icon={<PlayerMatchesIcon />}
          >
            Matches
          </NavButton>
          <NavButton
            href={`/${nickname}/maps`}
            className={height}
            icon={<PlayerMapsIcon />}
          >
            Maps
          </NavButton>
          <NavButton
            href={`/${nickname}/bans`}
            className={height}
            icon={<PlayerBansIcon />}
          >
            Bans
          </NavButton>
        </div>
      </nav>
    )
  },
)
