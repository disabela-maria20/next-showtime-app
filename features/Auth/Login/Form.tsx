'use client';
import { LoginSchema, LoginSchemaType } from './login.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StreamButton from '@/component/shared/StreamButton';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <div className=" md:w-120">
      <form className=" flex flex-col gap-4 p-8 rounded bg-[#bfbfbf1a] opacity-[0.99] drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]">
        <label htmlFor="email" className="flex flex-col">
          <span className="font-semibold px-1">E-mail</span>
          <InputText
            type="text"
            id="email"
            placeholder="E-mail"
            {...register('email')}
            pt={{
              root: () => ({
                className:
                  'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent',
              }),
            }}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label htmlFor="password" className="flex flex-col">
          <span className="font-semibold px-1">Senha</span>
          <Password
            type="password"
            id="password"
            placeholder="Senha"
            feedback={false}
            tabIndex={1}
            {...register('password')}
            pt={{
              input: () => ({
                className:
                  'w-full bg-transparent! placeholder-white! text-white! border-2! border-white! rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent',
              }),
            }}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
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
