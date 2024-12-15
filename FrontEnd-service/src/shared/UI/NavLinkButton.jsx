import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import clsx from 'clsx'

export const NavLinkButton = ({ to, children, onClick }) => {
   const { theme } = useContext(ThemeContext)

   return (
      <Link
         to={to}
         onClick={onClick}
         className={clsx(
            'btn text-center flex justify-center py-2 px-4 rounded-lg transition duration-200 font-bold text-white',
            theme === 'dark'
               ? 'bg-dark-button hover:bg-dark-button-hover'
               : 'bg-light-button hover:bg-light-button-hover',
         )}
      >
         {children}
      </Link>
   )
}
