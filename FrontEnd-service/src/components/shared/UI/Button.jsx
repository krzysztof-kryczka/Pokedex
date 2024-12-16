import React from 'react'

export const Button = ({ onClick, disabled, children, className }) => (
   <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-dark-text font-bold transition duration-500 bg-light-button dark:bg-dark-button hover:bg-light-button-hover dark:hover:bg-dark-button-hover disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
   >
      {children}
   </button>
)
