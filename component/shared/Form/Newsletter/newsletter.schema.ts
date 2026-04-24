import { z } from 'zod';

export const NewsletterSchema = z.object({
  email: z.string().nonempty('O e-mail é obrigatório').email({
    message: 'Formato de e-mail inválido',
    pattern: z.regexes.html5Email,
  }),
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  telephone: z
    .string()
    .trim()
    .nonempty('O telefone é obrigatório')
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length <= 11, {
      message: 'Telefone deve ter DDD + número',
    }),
});

export type NewsletterSchemaType = z.infer<typeof NewsletterSchema>;
