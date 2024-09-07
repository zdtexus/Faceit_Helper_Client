import React, { useState, useEffect } from "react"

type ThemeContextType = {
  theme: "dark" | "light"
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem("theme")
  const currentTheme = storedTheme ? (storedTheme as "dark" | "light") : "dark"

  const [theme, setTheme] = useState(currentTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main
        className={`text-foreground selection:bg-lime-400 selection:text-black transition-theme ${
          theme === "light" ? "bg-zinc-50" : "bg-[#121212]"
        }`}
      >
        {children}
      </main>
    </ThemeContext.Provider>
  )
}
