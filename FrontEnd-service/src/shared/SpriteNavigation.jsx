import React from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'

export const SpriteNavigation = ({ spriteUrl, handleSpriteNavigation, isSpriteUsed }) => (
   <div className="flex items-center justify-center">
      <button
         type="button"
         onClick={() => handleSpriteNavigation('prev')}
         className="text-blue-500 hover:text-blue-700 text-5xl"
      >
         <IoIosArrowDropleftCircle />
      </button>
      <img
         src={spriteUrl}
         alt={`sprite`}
         className={`w-48 h-48 mx-4 ${isSpriteUsed(spriteUrl) ? 'opacity-50 grayscale' : ''}`}
      />
      <button
         type="button"
         onClick={() => handleSpriteNavigation('next')}
         className="text-blue-500 hover:text-blue-700 text-5xl"
      >
         <IoIosArrowDroprightCircle />
      </button>
   </div>
)
