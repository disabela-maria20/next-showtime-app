'use client';

import { LoginSchema, LoginSchemaType } from './login.schema';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StreamButton from '@/component/shared/StreamButton';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Messages } from 'primereact/messages';
import { useAuthStore } from '@/store/authStore';
import { translateError } from '@/lib/errors/error-map';
import { loginUser } from '../services';
import { AuthResponse } from '../types';

export default function Form() {
  const router = useRouter();
  const msgs = useRef<Messages>(null);

  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const validateSubmit = (data: LoginSchemaType) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      return await loginUser(data);
    },
    onSuccess: (data: AuthResponse) => {
      login(data.user, data.token);
      router.replace('/favoritos');
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

        {/* PASSWORD */}
        <label className="flex flex-col">
          <span className="font-semibold px-1">Senha</span>

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Password
                placeholder="Senha"
                feedback={false}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                inputClassName="w-full bg-transparent placeholder-white text-white border-2 border-white rounded px-3 py-2 focus:outline-none"
              />
            )}
          />

          {errors.password && (
            <span className="text-red-400 text-sm">
              {errors.password.message}
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
            loading={mutation.isPending || mutation.isSuccess}
          >
            {!mutation.isPending || !mutation.isSuccess ? 'Entrar' : 'Entrando'}
          </StreamButton>

          <StreamButton href="/cadastro" fullWidth variant="blue-inverted">
            Cadastrar
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
}
