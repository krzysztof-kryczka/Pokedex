import clsx from 'clsx'
import React from 'react'

export const Wrapper = ({ children, className }) => {
   return (
      <div
         className={clsx(
            'p-4 max-w-7xl mx-auto pt-28 md:pt-36',
            className, // Add the className prop here to allow additional classes to be passed in
         )}
      >
         {children}
      </div>
   )
}
