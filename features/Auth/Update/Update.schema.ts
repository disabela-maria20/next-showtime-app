import { z } from 'zod';

// opções fixas conforme UI
export const interestOptions = [
  'acao',
  'aventura',
  'comedia',
  'drama',
  'romance',
  'suspense',
  'terror',
  'documentario',
  'shows',
] as const;

export const UpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome é muito longo')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  phone: z
    .string()
    .trim()
    .nonempty('O telefone é obrigatório')
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: 'Telefone deve ter DDD + número (10 ou 11 dígitos)',
    }),

  favoriteGenres: z
    .array(z.enum(interestOptions))
    .min(1, 'Selecione pelo menos uma marca de interesse')
    .max(5, 'Você pode selecionar no máximo 5 opções'),
});

export type UpdateSchemaType = z.infer<typeof UpdateSchema>;
