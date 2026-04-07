'use client';
import { CtaButton } from '@/component';
import { Phone } from '@/hooks/useMask';
import { InputText } from 'primereact/inputtext';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NewsletterSchema, NewsletterSchemaType } from './newsletter.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createNewsletterSubscription } from '@/services/api';
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';

const Newsletter = () => {
  const toast = useRef<Toast>(null);
  const inputClasses =
    'w-full px-4 py-2.5! bg-black! border! border-blue-600! rounded-lg! text-white! focus:border-blue-600! focus:outline-none! transition!';
  const [checked, setChecked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<NewsletterSchemaType>({
    resolver: zodResolver(NewsletterSchema),
    defaultValues: {
      name: '',
      email: '',
      telephone: '',
    },
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: async (data: NewsletterSchemaType) => {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.telephone,
        message: '',
      };
      const response = await createNewsletterSubscription(payload);
      return response;
    },
    onSuccess: (data) => {
      if (!toast.current) return;

      toast.current.clear();
      toast.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cadastro realizado com sucesso!',
        sticky: true,
      });
    },
    onError: (error: AxiosError) => {
      if (!toast.current) return;

      toast.current.clear();
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail:
          (error?.response?.data as { message?: string })?.message || error.message,
        sticky: true,
      });
    },
  });

  const onSubmit = (data: NewsletterSchemaType) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block mb-1">
          <span className="text-blue-600 font-medium">Nome:</span>
        </label>
        <input
          id="nome"
          type="text"
          className="w-full px-4 py-2.5 bg-black border border-blue-600 rounded-lg text-white focus:border-blue-600 focus:outline-none transition"
        //   placeholder="Seu nome completo"
          {...register('name')}
        />
        {errors.name && (
          <span className="text-amber-400 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tel" className="block mb-1">
            <span className="text-blue-600 font-medium">Telefone:</span>
          </label>

          <Controller
            name="telephone"
            control={control}
            render={({ field }) => (
              <InputText
                type="text"
                id="tel"
                value={field.value}
                onChange={(e) => {
                  const maskedValue = Phone(e.target.value);
                  field.onChange(maskedValue);
                }}
                pt={{ root: () => ({ className: inputClasses }) }}
              />
            )}
          />
          {errors.telephone && (
            <span className="text-amber-400 text-sm mt-1">
              {errors.telephone.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            <span className="text-blue-600 font-medium">Email:</span>
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            className="w-full px-4 py-2.5 bg-black border border-blue-600 rounded-lg text-white focus:border-blue-600 focus:outline-none transition"
            //   placeholder="seu@email.com"
          />
          {errors.email && (
            <span className="text-amber-400 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-14 md:pb-0">
        <label className="flex items-start gap-3 cursor-pointer select-none max-w-xl group">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <div
            className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${checked ? 'border-blue-600' : 'border-white/30'}`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-blue-600 transition-all duration-200 ${checked ? 'scale-100' : 'scale-0'}`}
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm text-white transition-colors">
              Eu aceito receber newsletters
            </p>
            <p className="text-xs text-white/60">
              Lorem ipsum dolor sit amet, consectetur incididunt ut labore et
              dolore magna.
            </p>
          </div>
        </label>
        <CtaButton type="submit" disabled={!checked}>
          cadastrar
        </CtaButton>
      </div>
    </form>
  );
};

export default Newsletter;
