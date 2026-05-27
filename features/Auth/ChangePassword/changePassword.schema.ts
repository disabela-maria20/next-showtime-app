import { z } from 'zod';

export const ChangePassword = z
  .object({
    currentPassword: z.string().nonempty('A senha atual é obrigatória'),

    password: z
      .string()
      .nonempty('A nova senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .max(50, 'A senha deve ter no máximo 50 caracteres'),

    ['repeat-password']: z.string().nonempty('Confirme sua senha'),
  })
  .refine((data) => data.password === data['repeat-password'], {
    message: 'As senhas não coincidem',
    path: ['repeat-password'],
  })
  .refine((data) => data.currentPassword !== data.password, {
    message: 'A nova senha deve ser diferente da senha atual',
    path: ['password'],
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePassword>;
