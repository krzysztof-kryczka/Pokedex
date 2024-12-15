import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import clsx from 'clsx'

export const FormField = ({ label, type, defaultValue, register, name, min, errors, disabled, valueAsNumber }) => {
   const { theme } = useContext(ThemeContext)

   return (
      <div>
         <label className="block font-semibold mb-2">{label}</label>
         <input
            type={type}
            defaultValue={defaultValue}
            {...register(name, { valueAsNumber })}
            min={min}
            disabled={disabled}
            className={clsx(
               'w-full px-4 py-2 border rounded-lg disabled:cursor-not-allowed',
               theme === 'dark' ? 'bg-dark-search disabled:opacity-30' : '',
            )}
         />
         {errors && <p className="text-red-500 font-bold mt-2">{errors.message}</p>}
      </div>
   )
}
