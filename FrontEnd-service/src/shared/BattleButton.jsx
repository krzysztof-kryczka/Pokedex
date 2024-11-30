import React from 'react'

export const BattleButton = ({ onClick, disabled }) => (
   <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white font-bold rounded ${
         disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
      }`}
   >
      WALCZ!
   </button>
)
