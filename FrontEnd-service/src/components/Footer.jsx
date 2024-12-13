import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import clsx from 'clsx'

export const Footer = () => {
   const { theme } = useContext(ThemeContext)
   return (
      <footer className={clsx('p-4 w-full text-center', theme === 'dark' ? 'bg-section-dark' : 'bg-section-light')}>
         <p className="text-white font-bold">
            &copy; 2024 Pokédex. All Rights Reserved. <br />
            Developed by Krzysztof Kryczka
         </p>
      </footer>
   )
}
