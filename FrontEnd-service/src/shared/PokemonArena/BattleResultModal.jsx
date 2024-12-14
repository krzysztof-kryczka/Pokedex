import React, { useContext } from 'react'
import { StyledButton } from '../StyledButton'

import clsx from 'clsx'
import { ThemeContext } from '../../context/ThemeContext'

export const BattleResultModal = ({ result, onClose }) => {
   const { theme } = useContext(ThemeContext)

   const capitalizeFirstLetter = string => {
      return string.charAt(0).toUpperCase() + string.slice(1)
   }

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div
            className={clsx(
               'p-4 rounded shadow-lg text-center',
               theme === 'dark' ? 'bg-dark-background text-white' : 'bg-light-background text-black',
            )}
         >
            {result.winner && result.loser ? (
               <>
                  <h2 className="text-2xl font-bold mb-4 pb-4">
                     {capitalizeFirstLetter(result.winner.name)} wygrał walkę!
                  </h2>
                  <p className="text-xl mb-4 pb-4">{capitalizeFirstLetter(result.loser.name)} przegrał walkę.</p>
               </>
            ) : (
               <h2 className="text-2xl font-bold mb-4">Remis!</h2>
            )}
            <StyledButton onClick={onClose}>Opuść arenę</StyledButton>
         </div>
      </div>
   )
}
