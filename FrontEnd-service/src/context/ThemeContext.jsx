import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

   useEffect(() => {
      localStorage.setItem('theme', theme)
      // document.documentElement.classList.toggle('dark', theme === 'dark')
      document.documentElement.classList.toggle(
         'dark',
         localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
      )
   }, [theme])

   const toggleTheme = () => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
   }

   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
