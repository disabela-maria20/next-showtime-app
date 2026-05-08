import { z } from 'zod';

export const NewPassword = z
  .object({
    password: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .max(50, 'A senha deve ter no máximo 50 caracteres'),

    ['repeat-password']: z.string().nonempty('Confirme sua senha'),

    token: z.string(),
  })
  .refine((data) => data.password === data['repeat-password'], {
    message: 'As senhas não coincidem',
    path: ['repeat-password'],
  });

export type NewPasswordSchemaType = z.infer<typeof NewPassword>;
