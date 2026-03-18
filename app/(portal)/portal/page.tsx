import { StreamButton } from '@/component';
import ReactNode from 'react';

export default function pagePortal() {
  return (
    <div className="w-65">
      <div className="flex flex-col gap-3">
        <StreamButton href="/cadastro" fullWidth variant="blue-inverted">
          Cadastrar
        </StreamButton>
        <StreamButton href="/entrar" fullWidth variant="blue">
          Entrar
        </StreamButton>
      </div>
    </div>
  );
}
