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

const FormRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    control,
    trigger,
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
          {['name', 'tel'].map((field) => (
            <label key={field} htmlFor={field} className="flex flex-col">
              <span className="font-semibold px-1 text-white">
                {field === 'name' ? 'Nome' : 'Telefone'}
              </span>
              <InputText
                type="text"
                id={field}
                {...register(field as keyof RegisterSchemaType)}
                pt={{ root: () => ({ className: inputClasses }) }}
              />
              {errors[field as keyof RegisterSchemaType] && (
                <span className="text-red-500 text-sm mt-1">
                  {errors[field as keyof RegisterSchemaType]?.message}
                </span>
              )}
            </label>
          ))}
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
              <span className="text-red-500 text-sm mt-1">
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
                <div key={category} className="flex items-center">
                  <Controller
                    name="interests"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        inputId={category}
                        value={category}
                        checked={field.value?.includes(category)}
                        onChange={(e) => {
                          const currentValue = field.value || [];
                          field.onChange(
                            e.checked
                              ? [...currentValue, category]
                              : currentValue.filter(
                                  (item: string) => item !== category
                                )
                          );
                        }}
                      />
                    )}
                  />
                  <label htmlFor={category} className="ml-2 text-white">
                    {category}
                  </label>
                </div>
              ))}
            </div>
            {errors.interests && (
              <span className="text-red-500 text-sm mt-1">
                {errors.interests.message}
              </span>
            )}
          </label>

          <div className="flex items-center gap-2">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.checked)}
                />
              )}
            />
            <label htmlFor="terms" className="text-white">
              Aceito os termos e condições
            </label>
          </div>
          {errors.terms && (
            <span className="text-red-500 text-sm">{errors.terms.message}</span>
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
