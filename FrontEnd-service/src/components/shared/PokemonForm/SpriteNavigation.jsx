import React from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'
import { Button } from '../UI/Button'

export const SpriteNavigation = ({ spriteUrl, handleSpriteNavigation, isSpriteUsed }) => (
   <div className="flex items-center justify-center">
      <Button onClick={() => handleSpriteNavigation('prev')} variant="spriteNavigation" type="button">
         <IoIosArrowDropleftCircle />
      </Button>
      <img
         src={spriteUrl}
         alt={`sprite`}
         className={`w-48 h-48 mx-4 ${isSpriteUsed(spriteUrl) ? 'opacity-50 grayscale' : ''}`}
      />
      <Button onClick={() => handleSpriteNavigation('next')} variant="spriteNavigation" type="button">
         <IoIosArrowDroprightCircle />
      </Button>
   </div>
)
