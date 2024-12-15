import React from 'react'

export const Error = props => {
   return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
         <p className="text-center font-bold text-red-700" {...props}>
            {props.children}
         </p>
      </div>
   )
}
