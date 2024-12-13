import React from 'react'

export const RegisterForm = ({ register, handleSubmit, errors, onSubmit, loading, isSubmitting }) => {
   const handleFormSubmit = event => {
      event.preventDefault()
      handleSubmit(onSubmit)(event)
   }

   return (
      <form onSubmit={handleFormSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
         <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
               Imię
            </label>
            <input id="name" type="text" {...register('name')} className="mt-1 p-2 block w-full border rounded-md" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
         </div>
         <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               Email
            </label>
            <input id="email" type="email" {...register('email')} className="mt-1 p-2 block w-full border rounded-md" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
         </div>
         <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
               Hasło
            </label>
            <input
               id="password"
               type="password"
               {...register('password')}
               className="mt-1 p-2 block w-full border rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
         </div>
         <div className="mb-4">
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
               Powtórz hasło
            </label>
            <input
               id="repeatPassword"
               type="password"
               {...register('repeatPassword')}
               className="mt-1 p-2 block w-full border rounded-md"
            />
            {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword.message}</p>}
         </div>
         <StyledButton type="submit" disabled={loading || isSubmitting}>
            {loading || isSubmitting ? 'Rejestracja...' : 'Zarejestruj się'}
         </StyledButton>
      </form>
   )
}
