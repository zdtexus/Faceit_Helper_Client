import React, { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { ThemeMoonIcon } from "../icons/theme-moon-icon"
import { ThemeSunIcon } from "../icons/theme-sun-icon"
import { CS2Logo } from "../icons/cs2-logo"
import { useLocation, useNavigate } from "react-router-dom"

export const Header = React.memo(() => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const location = useLocation()

  const logoFill = theme === "light" ? "black" : "white"
  const logoFillHover =
    theme === "light" ? "hover:opacity-75" : "hover:opacity-75"

  const handleBrandClick = () => {
    if (location.pathname !== "/") {
      navigate(`/`)
    }
  }

  return (
    <Navbar className="pt-3 default-navbar bg-transparent">
      <NavbarBrand
        className={`ms-14 transition-all hover:opacity-70 dark:hover:opacity-75 cursor-pointer ${logoFillHover}`}
        onClick={handleBrandClick}
      >
        <div
          className={`flex transition-theme ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          <p className={`font-bold text-black dark:text-white text-3xl mx-4`}>
            Faceit-helper
          </p>
          <CS2Logo fill={logoFill} />
        </div>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem
          className={`duration-150 hover:scale-110 text-3xl cursor-pointer transition-all absolute right-[190px] mt-1 ${logoFillHover}`}
          onClick={toggleTheme}
        >
          {theme === "light" ? <ThemeMoonIcon /> : <ThemeSunIcon />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
})
