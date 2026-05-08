import { z } from 'zod';

export const RecoverPassword = z.object({
  email: z.string().nonempty('O e-mail é obrigatório').email({
    message: 'Formato de e-mail inválido',
    pattern: z.regexes.html5Email,
  }),
});

export type RecoverPasswordSchemaType = z.infer<typeof RecoverPassword>;
