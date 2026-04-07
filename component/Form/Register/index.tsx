'use client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  interestOptions,
  RegisterSchema,
  RegisterSchemaType,
} from './Register.schema';
import { StreamButton } from '@/component';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Phone } from '@/hooks/useMask';

const FormRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      tel: '',
      interests: [],
      terms: false,
    },
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      console.log('Dados enviados:', data);
    },
    onSuccess: () => console.log('Cadastro realizado com sucesso!'),
    onError: (error) => console.error('Erro no cadastro:', error),
  });

  const nextStep = async () => {
    const stepFields = {
      1: ['name', 'tel'],
      2: ['email', 'interests', 'terms'],
    } as const;

    const fieldsToValidate =
      stepFields[currentStep as keyof typeof stepFields] || [];
    const isValidStep = await trigger(fieldsToValidate);

    if (isValidStep) setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const inputClasses =
    'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent';

  const renderStep = () => {
    const steps = {
      1: () => (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Dados Pessoais</h2>

          {/* Campo Nome */}
          <label htmlFor="name" className="flex flex-col">
            <span className="font-semibold px-1 text-white">Nome</span>
            <InputText
              type="text"
              id="name"
              {...register('name')}
              pt={{ root: () => ({ className: inputClasses }) }}
            />
            {errors.name && (
              <span className="text-amber-400 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </label>

          {/* Campo Telefone com máscara */}
          <label htmlFor="tel" className="flex flex-col">
            <span className="font-semibold px-1 text-white">Telefone</span>
            <Controller
              name="tel"
              control={control}
              render={({ field }) => (
                <InputText
                  type="text"
                  id="tel"
                  value={field.value}
                  onChange={(e) => {
                    const maskedValue = Phone(e.target.value as string);
                    field.onChange(maskedValue);
                    setValue('tel', maskedValue, { shouldValidate: true });
                  }}
                  pt={{ root: () => ({ className: inputClasses }) }}
                />
              )}
            />
            {errors.tel && (
              <span className="text-amber-400 text-sm mt-1">
                {errors.tel.message}
              </span>
            )}
          </label>
        </div>
      ),

      2: () => (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Dados de Acesso</h2>

          <label htmlFor="email" className="flex flex-col">
            <span className="font-semibold px-1 text-white">E-mail</span>
            <InputText
              type="email"
              id="email"
              {...register('email')}
              pt={{ root: () => ({ className: inputClasses }) }}
            />
            {errors.email && (
              <span className="text-amber-400 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="font-semibold px-1 mb-2 text-white">
              Interesses
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {interestOptions.map((category) => (
                <div className="flex flex-col gap-3">
                  <Controller
                    key={category}
                    name="interests"
                    control={control}
                    render={({ field }) => {
                      const isChecked = field.value?.includes(category);

                      return (
                        <label
                          className={`
                    flex items-center gap-3 cursor-pointer select-none
                   rounded-md
                    transition-all duration-200
                    hover:bg-white/5
                    active:scale-[0.98]
                    ${isChecked ? 'bg-green-500/10' : ''}
                  `}
                        >
                          {/* input real */}
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={isChecked}
                            onChange={(e) => {
                              const currentValue = field.value || [];

                              field.onChange(
                                e.target.checked
                                  ? [...currentValue, category]
                                  : currentValue.filter(
                                      (item: string) => item !== category
                                    )
                              );
                            }}
                          />

                          {/* checkbox animado */}
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

                          {/* texto */}
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
                </div>
              ))}
            </div>
            {errors.interests && (
              <span className="text-amber-400 text-sm mt-1">
                {errors.interests.message}
              </span>
            )}
          </label>

          <div className="flex items-center gap-2">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <label className="flex items-start gap-3 cursor-pointer select-none max-w-xl group">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <div
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      field.value ? 'border-blue-600' : 'border-white/30'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-blue-600 transition-all duration-200 ${
                        field.value ? 'scale-100' : 'scale-0'
                      }`}
                    />
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm text-white transition-colors">
                      Aceito os termos e condições
                    </p>
                  </div>
                </label>
              )}
            />
          </div>
          {errors.terms && (
            <span className="text-amber-400 text-sm">
              {errors.terms.message}
            </span>
          )}
        </div>
      ),
    };

    return steps[currentStep as keyof typeof steps]?.() || null;
  };

  return (
    <div className="md:w-120">
      <form
        onSubmit={handleSubmit(() =>
          mutation.mutate(control._formValues as RegisterSchemaType)
        )}
        className="flex flex-col gap-4 p-8 rounded bg-[#bfbfbf1a] opacity-[0.99] drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]"
      >
        {renderStep()}

        <div className="flex items-center gap-2 mt-4">
          {currentStep > 1 && (
            <StreamButton
              type="button"
              variant="blue-inverted"
              fullWidth
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Voltar
            </StreamButton>
          )}

          {currentStep < totalSteps ? (
            <StreamButton
              type="button"
              variant="primary"
              fullWidth
              onClick={nextStep}
            >
              Próximo
            </StreamButton>
          ) : (
            <StreamButton
              type="submit"
              fullWidth
              variant="blue"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </StreamButton>
          )}
        </div>
      </form>

      <ul className="flex flex-col items-center md:flex-row md:justify-center gap-2 mt-4">
        {['recuperar-senha', 'ajuda'].map((page) => (
          <li key={page}>
            <a
              href={`/${page}`}
              className="transition hover:text-blue-600 text-white"
            >
              {page === 'recuperar-senha'
                ? 'Esqueci minha senha'
                : 'Preciso de Ajuda'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormRegister;
