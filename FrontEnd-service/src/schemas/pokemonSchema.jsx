import { z } from 'zod'

export const createPokemonSchema = z.object({
   name: z.string().min(1, 'Nazwa jest wymagana'),
   weight: z.number({ invalid_type_error: 'Waga musi być > 0' }).min(1),
   height: z.number({ invalid_type_error: 'Wzrost musi być > 0' }).min(1),
   base_experience: z.number({ invalid_type_error: 'Doświadczenie musi być > 0' }).min(1),
   sprite: z.string().url('URL grafiki musi być poprawnym URL'),
})
