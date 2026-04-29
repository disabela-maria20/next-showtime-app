import { errorMap } from './translate-error';

export function translateError(code?: string, message?: string) {
  if (code && errorMap[code]) {
    return errorMap[code];
  }

  return message || 'Erro inesperado';
}
