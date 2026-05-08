'use client';

import { translateError } from '@/lib/errors/error-map';
import React, { useRef } from 'react';
import { NewPasswordResponse } from '../types';
import { updateNewPassword } from '../services';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Messages } from 'primereact/messages';
import { InputText } from 'primereact/inputtext';
import { StreamButton } from '@/component';
import { NewPassword, NewPasswordSchemaType } from './newPassword.schema';
import { useRouter } from 'next/navigation';

interface FormProps {
  token: string;
}

const Form = ({ token }: FormProps) => {
  const msgs = useRef<Messages>(null);
  const router = useRouter();
  console.log(token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPassword),
    defaultValues: {
      'repeat-password': '',
      password: '',
      token: token,
    },
  });

  const validateSubmit = (data: NewPasswordSchemaType) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: async (
      data: NewPasswordSchemaType
    ): Promise<NewPasswordResponse> => {
      return updateNewPassword(data);
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

  return (
    <div className="md:w-120">
      <form
        className="flex flex-col gap-4 p-8 rounded bg-[#bfbfbf1a] opacity-[0.99] drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]"
        onSubmit={handleSubmit(validateSubmit)}
      >
        <input type="hidden" {...register('token')} />
        <label className="flex flex-col">
          <span className="font-semibold px-1">Senha</span>

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

        {/* BUTTONS */}
        <div className="flex gap-2">
          <StreamButton
            type="submit"
            fullWidth
            variant="blue"
            disabled={mutation.isPending}
            loading={mutation.isPending}
          >
            {!mutation.isPending ? 'Alterar Senha' : 'Alterando...'}
          </StreamButton>
        </div>
      </form>

      {/* LINKS */}
      <ul className="flex flex-col items-center md:flex-row md:justify-center gap-2 mt-4">
        <li>
          <a href="/recuperar-senha" className="transition hover:text-blue-600">
            Esqueci minha senha
          </a>
        </li>
        <li>
          <a href="/ajuda" className="transition hover:text-blue-600">
            Preciso de Ajuda
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Form;
