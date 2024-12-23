import React, { useContext } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { ThemeContext } from '../../../context/ThemeContext'

export const ThemeToggle = () => {
   const { theme, toggleTheme } = useContext(ThemeContext)
   return (
      <div
         className="relative flex items-center justify-center w-16 h-8 bg-dark-background rounded-full cursor-pointer"
         onClick={toggleTheme}
      >
         <div className="absolute w-11 h-11 rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 bg-light-background -translate-x-3 dark:bg-dark-background dark:translate-x-3">
            {theme === 'dark' ? <FaMoon className="text-blue-500" /> : <FaSun className="text-yellow-500" />}
         </div>
      </div>
   )
}
