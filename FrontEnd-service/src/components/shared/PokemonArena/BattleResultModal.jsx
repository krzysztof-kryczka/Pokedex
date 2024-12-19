import React from 'react'
import { Button } from '../UI/Button'
import { FaTrophy } from 'react-icons/fa'
import { Header } from '../UI/Header'

export const BattleResultModal = ({ result, onClose }) => {
   const capitalizeFirstLetter = string => {
      return string.charAt(0).toUpperCase() + string.slice(1)
   }

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="p-14 rounded-lg shadow-lg text-center border bg-light-background dark:bg-dark-background dark:border-dark-border">
            {result.winner && result.loser ? (
               <>
                  <Header variant="h1">Gratulacje</Header>
                  <Header variant="h2">
                     {capitalizeFirstLetter(result.winner.name)} wygrał walkę!
                     <FaTrophy className="inline-block text-5xl text-yellow-500 ml-2" />
                  </Header>
                  <p className="text-xl mb-4 pb-4">{capitalizeFirstLetter(result.loser.name)} przegrał walkę.</p>
               </>
            ) : (
               <h2 className="text-2xl font-bold mb-4">Remis!</h2>
            )}
            <Button onClick={onClose}>Opuść arenę</Button>
         </div>
      </div>
   )
}
