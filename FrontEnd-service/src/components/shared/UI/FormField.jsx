import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Error } from './Error'

export const FormField = ({ label, type, name, min, disabled, valueAsNumber }) => {
   const {
      register,
      formState: { errors },
   } = useFormContext()

   return (
      <div>
         <label className="block font-semibold mb-2">{label}</label>
         <input
            type={type}
            {...register(name, { valueAsNumber })}
            min={min}
            disabled={disabled}
            className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 dark:bg-dark-input disabled:opacity-50 dark:disabled:opacity-30 disabled:cursor-not-allowed dark:bg-none"
         />
         {errors[name] && <Error>{errors[name]?.message}</Error>}
      </div>
   )
}
