'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { interestOptions, RegisterSchema, RegisterSchemaType } from './Register.schema';
import { StreamButton } from '@/component';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    control,
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
  });

  return (
    <div className=" md:w-120">
      <form className=" flex flex-col gap-4 p-8 rounded bg-[#bfbfbf1a] opacity-[0.99] drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]">
        <label htmlFor="name" className='flex flex-col'>
          <span className='font-semibold px-1'>Nome</span>
          <InputText
            type="text"
            id="name"
            {...register('name')}
            pt={{
                root: () => ({
                    className: 'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent',
                })
            }}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        
        <label htmlFor="tel" className='flex flex-col'>
          <span className='font-semibold px-1'>Telefone</span>
          <InputText
            type="text"
            id="tel"
            {...register('tel')}
            pt={{
                root: () => ({
                    className: 'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent',
                })
            }}
          />
          {errors.tel && <span>{errors.tel.message}</span>}
        </label>
        
        <label htmlFor="email" className='flex flex-col'>
          <span className='font-semibold px-1'>E-mail</span>
          <InputText
            type="text"
            id="email"
            {...register('email')}
            pt={{
                root: () => ({
                    className: 'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent',
                })
            }}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        
        <label htmlFor="interests" className='flex flex-col'>
          <span className='font-semibold px-1'>Interesses</span>
          <div className='grid grid-cols-3 gap-2.5'>
            {interestOptions.map((category) => {
                return (
                    <div key={category} className="flex align-items-center">
                        <Controller
                            name="interests"
                            control={control}
                            render={({ field }) => {
                                const isChecked = field.value?.includes(category);
                                return (
                                    <Checkbox
                                        inputId={category}
                                        name="category"
                                        value={category}
                                        checked={isChecked}
                                        onChange={(e) => {
                                            const currentValue = field.value || [];
                                            if (e.checked) {
                                                field.onChange([...currentValue, category]);
                                            } else {
                                                field.onChange(currentValue.filter((item: string) => item !== category));
                                            }
                                        }}
                                    />
                                );
                            }}
                        />
                        <label htmlFor={category} className="ml-2">
                            {category}
                        </label>
                    </div>
                );
            })}
          </div>
          {errors.interests && <span>{errors.interests.message}</span>}
        </label>

        <div className="flex items-center gap-2">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                inputId="terms"
                checked={field.value}
                onChange={(e) => field.onChange(e.checked)}
              />
            )}
          />
          <label htmlFor="terms">Aceito os termos e condições</label>
        </div>
        {errors.terms && <span>{errors.terms.message}</span>}
        
        <div className="flex items-center gap-2 ">
          <StreamButton href="/entrar" fullWidth variant="blue">
            Entrar
          </StreamButton>
          <StreamButton href="/cadastro" fullWidth variant="blue-inverted">
            Cadastrar
          </StreamButton>
        </div>
      </form>
      
      <ul className="flex flex-col items-center md:flex-row md:justify-center gap-2 mt-4">
        <li>
          <a href="/recuperar-senha" className='transition hover:text-blue-600'>Esqueci minha senha</a>
        </li>
        <li>
          <a href="/ajuda" className='transition hover:text-blue-600'>Preciso de Ajuda</a>
        </li>
      </ul>
    </div>
  )
};

export default FormRegister;