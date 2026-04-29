'use client';
import { useState, useEffect } from 'react';
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
import { Phone } from '@/hooks/useMask';
import { createUser } from './services';
import { Password } from 'primereact/password';

const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      favoriteGenres: [],
      password: '',
      'repeat-password': '',
    },
    mode: 'onChange',
  });

  // Debug: Monitorar mudanças nos dados
  const formData = watch();
  useEffect(() => {
    console.log('Dados atuais do formulário:', formData);
  }, [formData]);

  const mutation = useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      console.log(data);

      await createUser(data);
    },
    onSuccess: () => console.log('Cadastro realizado com sucesso!'),
    onError: (error) => console.error('Erro no cadastro:', error),
  });

  const nextStep = async () => {
    const stepFields = {
      1: ['name', 'phone'],
      2: ['email'],
      3: ['password', 'repeat-password'],
      4: ['favoriteGenres'],
    } as const;

    const fieldsToValidate =
      stepFields[currentStep as keyof typeof stepFields] || [];
    const isValidStep = await trigger(fieldsToValidate);

    if (currentStep === 4 && !termsAccepted) {
      alert('Você precisa aceitar os termos e condições para continuar');
      return;
    }

    if (isValidStep) {
      // Salvar dados atuais antes de avançar
      const currentData = getValues();
      console.log('Salvando dados do step', currentStep, currentData);
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const goBack = () => {
    // Salvar dados atuais antes de voltar
    const currentData = getValues();
    console.log('Salvando dados antes de voltar', currentData);
    setCurrentStep((prev) => prev - 1);
  };

  const inputClasses =
    'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent';

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4" key="step1">
            <h2 className="text-xl font-bold text-white mb-4">
              Dados Pessoais
            </h2>

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
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" key="step2">
            <h2 className="text-xl font-bold text-white mb-4">E-mail</h2>

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
          </div>
        );

      case 3:
        return (
          <div className="space-y-4" key="step3">
            <h2 className="text-xl font-bold text-white mb-4">
              Crie sua Senha
            </h2>

            <label htmlFor="password" className="flex flex-col">
              <span className="font-semibold px-1 text-white">Senha</span>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Password
                    id="password"
                    value={field.value || ''}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setValue('password', e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    feedback={false}
                    pt={{
                      root: { className: 'w-full' },
                      input: { className: inputClasses },
                    }}
                  />
                )}
              />
              {errors.password && (
                <span className="text-amber-400 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </label>

            <label htmlFor="'repeat-password'" className="flex flex-col">
              <span className="font-semibold px-1 text-white">
                Confirmar Senha
              </span>
              <Controller
                name="repeat-password"
                control={control}
                render={({ field }) => (
                  <Password
                    id="'repeat-password'"
                    value={field.value || ''}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setValue('repeat-password', e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    feedback={false}
                    pt={{
                      root: { className: 'w-full' },
                      input: { className: inputClasses },
                    }}
                  />
                )}
              />
              {errors['repeat-password'] && (
                <span className="text-amber-400 text-sm mt-1">
                  {errors['repeat-password'].message}
                </span>
              )}
            </label>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4" key="step4">
            <h2 className="text-xl font-bold text-white mb-4">Interesses</h2>

            <label className="flex flex-col">
              <span className="font-semibold px-1 mb-2 text-white">
                Selecione seus gêneros favoritos
              </span>
              <div className="grid grid-cols-3 gap-2.5">
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
                          `}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={isChecked}
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

            {/* Checkbox de Termos */}
            <div className="flex items-center gap-2 mt-4">
              <label className="flex items-start gap-3 cursor-pointer select-none max-w-xl group">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <div
                  className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    termsAccepted ? 'border-blue-600' : 'border-white/30'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-blue-600 transition-all duration-200 ${
                      termsAccepted ? 'scale-100' : 'scale-0'
                    }`}
                  />
                </div>
                <div className="leading-tight">
                  <p className="text-sm text-white transition-colors">
                    Aceito os{' '}
                    <span className="font-semibold">termos e condições</span>{' '}
                    (obrigatório)
                  </p>
                </div>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const validateTermsBeforeSubmit = (data: RegisterSchemaType) => {
    if (!termsAccepted) {
      alert('Você precisa aceitar os termos e condições para continuar');
      return;
    }
    console.log('Dados finais para submit:', data);
    mutation.mutate(data);
  };

  return (
    <div className="md:w-120">
      <form
        onSubmit={handleSubmit(validateTermsBeforeSubmit)}
        className="flex flex-col gap-4 p-8 rounded bg-[#bfbfbf1a] opacity-[0.99] drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]"
      >
        {renderStep()}

        <div className="flex items-center gap-2 mt-4">
          {currentStep > 1 && (
            <StreamButton
              type="button"
              variant="blue-inverted"
              fullWidth
              onClick={goBack}
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
              disabled={mutation.isPending || !termsAccepted}
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

export default Form;
