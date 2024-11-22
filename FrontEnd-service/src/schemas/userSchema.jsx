import { z } from 'zod'

export const userSchema = z
   .object({
      name: z.string().min(3, { message: 'Imię musi mieć co najmniej 3 znaki' }),
      email: z.string().email({ message: 'Nieprawidłowy adres email' }),
      password: z
         .string()
         .min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' })
         .regex(/[A-Z]/, { message: 'Hasło musi zawierać co najmniej jedną dużą literę' })
         .regex(/[0-9]/, { message: 'Hasło musi zawierać co najmniej jedną cyfrę' })
         .regex(/[@$!%*?&]/, { message: 'Hasło musi zawierać co najmniej jeden znak specjalny' }),
      repeatPassword: z.string(),
   })
   .refine(data => data.password === data.repeatPassword, {
      message: 'Hasła muszą być takie same',
      path: ['repeatPassword'],
   })
