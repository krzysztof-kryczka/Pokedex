import React from 'react'
import poke from '../../assets/poke.png'

export const PlaceholderCard = () => (
   <div className="border-2 border-dashed border-gray-300 flex items-center justify-center p-4 h-64">
      <img src={poke} alt="Placeholder" className="h-48 w-48" />
   </div>
)
