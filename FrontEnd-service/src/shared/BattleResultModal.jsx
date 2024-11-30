import React from 'react'

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
         <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
         >
            Opuść arenę
         </button>
      </div>
   </div>
)
