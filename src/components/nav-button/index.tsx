import { Button } from "../button"
import { useNavigate, useLocation } from "react-router-dom"

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  href?: string
  className?: string
}

export const NavButton: React.FC<Props> = ({ children, icon, href, className }) => {
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
