import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import clsx from 'clsx'

export const Button = ({ onClick, disabled, children, className }) => {
   const { theme } = useContext(ThemeContext)

   return (
      <button
         onClick={onClick}
         disabled={disabled}
         className={clsx(
            'px-4 py-2 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed',
            {
               'bg-light-button hover:bg-light-button-hover': theme === 'light',
               'bg-dark-button hover:bg-dark-button-hover': theme === 'dark',
            },
            className, // Add the className prop here to allow additional classes to be passed in
         )}
      >
         {children}
      </button>
   )
}
