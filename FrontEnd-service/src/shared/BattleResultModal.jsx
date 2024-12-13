import React from 'react'
import { StyledButton } from './StyledButton'

export const BattleResultModal = ({ result, onClose }) => (
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg text-center">
         {result.winner && result.loser ? (
            <>
               <h2 className="text-2xl font-bold mb-4">{result.winner.name} wygrał walkę!</h2>
               <p>{result.loser.name} przegrał walkę.</p>
            </>
         ) : (
            <h2 className="text-2xl font-bold mb-4">Remis!</h2>
         )}
         <StyledButton onClick={onClose}>Opuść arenę</StyledButton>
      </div>
   </div>
)
