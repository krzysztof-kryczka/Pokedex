import { z } from 'zod'

export const createPokemonSchema = z.object({
   name: z.string().min(1, 'Nazwa jest wymagana'),
   weight: z.number().min(0, 'Waga musi być dodatnia'),
   height: z.number().min(0, 'Wzrost musi być dodatni'),
   base_experience: z.number().min(0, 'Doświadczenie musi być dodatnie'),
   sprite: z.string().url('URL grafiki musi być poprawnym URL'),
})
