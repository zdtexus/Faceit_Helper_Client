import type React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../theme-provider'

type Props = {
    children: React.ReactNode
    className?: string
}

export const PageContainer: React.FC<Props> = ({ children, className }) => {

  const { theme } = useContext(ThemeContext)

  return (
    <div className={`flex flex-col px-6 pt-4 min-h-[762px] h-full transition-theme rounded-xl shadow-xl ${className} ${theme === 'light' ? 'bg-white text-black' : 'bg-zinc-900 text-white'}`}>
      {children}
    </div>
  )
}
