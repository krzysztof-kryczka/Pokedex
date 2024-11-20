import React from 'react'

export const Loader = () => {
   return (
      <div className="flex justify-center items-center h-screen">
         <div
            className={`border-8 border-gray-200 border-t-8 border-t-blue-500 rounded-full w-28 h-28 animate-spin`}
         />
      </div>
   )
}
