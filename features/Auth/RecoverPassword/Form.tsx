'use client';

import { InputText } from 'primereact/inputtext';
import React, { useRef } from 'react';
import {
  RecoverPassword,
  RecoverPasswordSchemaType,
} from './recoverPassword.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { StreamButton } from '@/component';
import { useMutation } from '@tanstack/react-query';
import { AuthResponse, RecoverPasswordResponse } from '../types';
import { Controller, useForm } from 'react-hook-form';
import { updateRecoverPassword } from '../services';
import { translateError } from '@/lib/errors/error-map';
import { Messages } from 'primereact/messages';
const Form = () => {
  const msgs = useRef<Messages>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecoverPasswordSchemaType>({
    resolver: zodResolver(RecoverPassword),
    defaultValues: {
      email: '',
    },
  });

  const validateSubmit = (data: RecoverPasswordSchemaType) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: async (
      data: RecoverPasswordSchemaType
    ): Promise<RecoverPasswordResponse> => {
      return updateRecoverPassword(data);
    },
    onSuccess: (data: RecoverPasswordResponse) => {
      msgs.current?.clear();
      msgs.current?.show([
        {
          severity: 'success',
          summary: 'Enviado',
          detail: 'E-mail de recuperação de senha enviado com sucesso',
          life: 5000,
        },
      ]);
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
        {/* EMAIL */}
        <label className="flex flex-col">
          <span className="font-semibold px-1">E-mail</span>

          <InputText
            placeholder="E-mail"
            {...register('email')}
            pt={{
              root: {
                className:
                  'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0',
              },
            }}
          />

          {errors.email && (
            <span className="text-red-400 text-sm">{errors.email.message}</span>
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
            loading={mutation.isPending || mutation.isSuccess}
          >
            {!mutation.isPending || !mutation.isSuccess
              ? 'Enviar'
              : 'Enviando...'}
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
