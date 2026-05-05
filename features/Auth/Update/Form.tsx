'use client';

import { useState, useRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { StreamButton } from '@/component';
import { InputText } from 'primereact/inputtext';
import { Phone } from '@/hooks/useMask';
import { meUser, updateUser } from '../services';
import { useRouter } from 'next/navigation';
import { translateError } from '@/lib/errors/error-map';
import { Messages } from 'primereact/messages';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '../types';
import {
  interestOptions,
  UpdateSchema,
  UpdateSchemaType,
} from './Update.schema';
import { queryClient } from '@/services/config/queryClient';

const FormUpdate = () => {
  const msgs = useRef<Messages | null>(null);
  const updateUserStore = useAuthStore((state) => state.updateUser);
  const token = useAuthStore((state) => state.token);

  const login = useAuthStore((state) => state.login);

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['meUser'],
    queryFn: async () => {
      return await meUser();
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateSchemaType>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      name: '',
      phone: '',
      favoriteGenres: [],
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        phone: user.phone || '',
        favoriteGenres: user.favoriteGenre || [],
      });
    }
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: async (data: UpdateSchemaType) => {
      const payload = {
        ...data,
        favoriteGenre: data.favoriteGenres,
      };
      return await updateUser(payload);
    },
    onSuccess: (data: AuthResponse) => {
      if (user) {
        login(user, token ?? undefined);
      }
      queryClient.invalidateQueries({ queryKey: ['meUser'] });

      if (msgs.current) {
        msgs.current.clear();
        msgs.current?.show([
          {
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Dados atualizados com sucesso!',
            closable: true,
            life: 5000,
          },
        ]);
      }

      reset(data.user);
    },
    onError: (error: any) => {
      const message = translateError(
        error?.response?.data?.error || error?.error,
        error?.message
      );

      if (msgs.current) {
        msgs.current.clear();
        msgs.current?.show([
          {
            severity: 'error',
            summary: 'Erro',
            detail: message,
            closable: true,
            life: 5000,
          },
        ]);
      }
    },
  });

  const inputClasses =
    'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent';

  const onSubmit = (data: UpdateSchemaType) => mutation.mutate(data);

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center p-8 bg-neutral-700 rounded">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
          <p>Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-8 rounded bg-neutral-700 drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Ajuste de dados</h2>

          <label htmlFor="name" className="flex flex-col">
            <span className="font-semibold px-1 text-white">Nome</span>
            <InputText
              type="text"
              id="name"
              {...register('name')}
              disabled={mutation.isPending}
              pt={{ root: () => ({ className: inputClasses }) }}
            />
            {errors.name && (
              <span className="text-amber-400 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </label>

          <label htmlFor="tel" className="flex flex-col">
            <span className="font-semibold px-1 text-white">Telefone</span>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputText
                  type="text"
                  id="tel"
                  value={field.value || ''}
                  disabled={mutation.isPending}
                  onChange={(e) => {
                    const maskedValue = Phone(e.target.value as string);
                    field.onChange(maskedValue);
                    setValue('phone', maskedValue, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  pt={{ root: () => ({ className: inputClasses }) }}
                />
              )}
            />
            {errors.phone && (
              <span className="text-amber-400 text-sm mt-1">
                {errors.phone.message}
              </span>
            )}
          </label>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Interesses</h2>

            <label className="flex flex-col">
              <span className="font-semibold px-1 mb-2 text-white">
                Selecione seus gêneros favoritos
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {interestOptions.map((category) => (
                  <Controller
                    key={category}
                    name="favoriteGenres"
                    control={control}
                    render={({ field }) => {
                      const isChecked =
                        field.value?.includes(category) || false;

                      return (
                        <label
                          className={`
                            flex items-center gap-3 cursor-pointer select-none
                            rounded-md transition-all duration-200
                            hover:bg-white/5 active:scale-[0.98]
                            ${isChecked ? 'bg-green-500/10' : ''}
                            ${mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={isChecked}
                            disabled={mutation.isPending}
                            onChange={(e) => {
                              const currentValue = field.value || [];
                              const newValue = e.target.checked
                                ? [...currentValue, category]
                                : currentValue.filter(
                                    (item: string) => item !== category
                                  );
                              field.onChange(newValue);
                              setValue('favoriteGenres', newValue, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }}
                          />
                          <div
                            className={`
                              w-5 h-5 rounded-md border-2 flex items-center justify-center
                              transition-all duration-300 ease-in-out
                              ${
                                isChecked
                                  ? 'bg-green-500 border-green-500 scale-110'
                                  : 'border-gray-400'
                              }
                            `}
                          >
                            <svg
                              className={`
                                w-3 h-3 text-white
                                transition-all duration-300 ease-in-out
                                ${
                                  isChecked
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-50'
                                }
                              `}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span
                            className={`
                              transition-colors duration-200
                              ${isChecked ? 'text-green-400' : 'text-gray-200'}
                            `}
                          >
                            {category}
                          </span>
                        </label>
                      );
                    }}
                  />
                ))}
              </div>
              {errors.favoriteGenres && (
                <span className="text-amber-400 text-sm mt-1">
                  {errors.favoriteGenres.message}
                </span>
              )}
            </label>

            <Messages ref={msgs} />

            <StreamButton
              type="submit"
              disabled={mutation.isPending || !isDirty}
              loading={mutation.isPending}
              className="w-full mt-4"
            >
              {mutation.isPending ? 'Salvando...' : 'Salvar alterações'}
            </StreamButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormUpdate;
