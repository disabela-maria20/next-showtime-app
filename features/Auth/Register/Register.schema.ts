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

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'O nome deve ter pelo menos 2 caracteres')
      .max(100, 'O nome é muito longo')
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Formato de e-mail inválido')
      .max(150, 'E-mail muito longo'),

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

    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .max(100, 'Senha muito longa')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        'A senha deve conter pelo menos uma letra e um número'
      ),

    'repeat-password': z.string(),
  })
  .refine((data) => data.password === data['repeat-password'], {
    message: 'As senhas não coincidem',
    path: ['repeat-password'],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
