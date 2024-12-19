import React from 'react'

export const Button = ({ onClick, disabled, children, className, variant = 'default', type }) => {
   const buttonStyles = {
      default:
         'px-4 py-2 rounded-lg text-dark-text font-bold transition duration-500 bg-light-button dark:bg-dark-button hover:bg-light-button-hover dark:hover:bg-dark-button-hover disabled:opacity-40 disabled:cursor-not-allowed',
      spriteNavigation: 'text-blue-500 hover:text-blue-700 text-5xl',
      removeFromArena: 'absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600',
   }

   const styles = `${buttonStyles[variant]} ${className}`

   return (
      <button
         onClick={
            onClick
               ? e => {
                    console.log('Button clicked:', children)
                    onClick(e)
                 }
               : undefined
         }
         disabled={disabled}
         className={styles}
         type={type}
      >
         {children}
      </button>
   )
}
