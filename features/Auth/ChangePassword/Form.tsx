'use client';

import { translateError } from '@/lib/errors/error-map';
import React, { useRef } from 'react';
import { ChangePasswordResponse, NewPasswordResponse } from '../types';
import { updateChangePassword } from '../services';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Messages } from 'primereact/messages';
import { InputText } from 'primereact/inputtext';
import { StreamButton } from '@/component';
import {
  ChangePassword,
  ChangePasswordSchemaType,
} from './changePassword.schema';
import { useRouter } from 'next/navigation';

const Form = () => {
  const msgs = useRef<Messages>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePassword),
    defaultValues: {
      currentPassword: '',
      password: '',
      'repeat-password': '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (
      data: ChangePasswordSchemaType
    ): Promise<ChangePasswordResponse> => {
      console.log(data);

      return updateChangePassword(data);
    },

    onSuccess: () => {
      msgs.current?.clear();

      msgs.current?.show([
        {
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Senha alterada com sucesso',
          life: 3500,
        },
      ]);

      setTimeout(() => {
        router.push('/entrar');
      }, 3500);
    },

    onError: (error: any) => {
      const message = translateError(
        error?.response?.data?.error || error?.error,
        error?.message
      );

      msgs.current?.clear();

      msgs.current?.show([
        {
          severity: 'error',
          summary: 'Erro',
          detail: message,
          life: 5000,
        },
      ]);
    },
  });

  const validateSubmit = (data: ChangePasswordSchemaType) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 p-8 rounded bg-[#bfbfbf1a] opacity-[0.99] drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]"
        onSubmit={handleSubmit(validateSubmit)}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white ">Alterar Senha</h2>
          </div>
        </div>
        <label className="flex flex-col">
          <span className="font-semibold px-1">Senha Atual</span>

          <InputText
            {...register('currentPassword')}
            type="password"
            pt={{
              root: {
                className:
                  'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0',
              },
            }}
          />

          {errors.currentPassword && (
            <span className="text-red-400 text-sm">
              {errors.currentPassword.message}
            </span>
          )}
        </label>

        <label className="flex flex-col">
          <span className="font-semibold px-1">Nova Senha</span>

          <InputText
            {...register('password')}
            type="password"
            pt={{
              root: {
                className:
                  'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0',
              },
            }}
          />

          {errors.password && (
            <span className="text-red-400 text-sm">
              {errors.password.message}
            </span>
          )}
        </label>

        <label className="flex flex-col">
          <span className="font-semibold px-1">Confirmar Senha</span>

          <InputText
            {...register('repeat-password')}
            type="password"
            pt={{
              root: {
                className:
                  'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0',
              },
            }}
          />

          {errors['repeat-password'] && (
            <span className="text-red-400 text-sm">
              {errors['repeat-password'].message}
            </span>
          )}
        </label>

        <Messages ref={msgs} />

        <StreamButton
          type="submit"
          fullWidth
          variant="blue"
          disabled={mutation.isPending}
          loading={mutation.isPending}
        >
          {mutation.isPending ? 'Alterando...' : 'Alterar Senha'}
        </StreamButton>
      </form>
    </div>
  );
};

export default Form;
