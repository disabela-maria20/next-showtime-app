export type FavoriteGenre =
  | 'acao'
  | 'aventura'
  | 'comedia'
  | 'drama'
  | 'romance'
  | 'suspense'
  | 'terror'
  | 'documentario'
  | 'shows';

export interface SignUpRequest {
  email: string;
  password: string;
  'repeat-password': string;
  name: string;
  phone: string;
  favoriteGenres: FavoriteGenre[];
}

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  favoriteGenre: FavoriteGenre[];
  created_at: string;
};

export type AuthResponse = {
  token: string;
  token_type: 'Bearer';
  user: User;
};

type TokenType = 'Bearer';
export interface SignResponse {
  token: string;
  token_type: TokenType;
  user: User;
}

export interface RecoverPasswordResponse {
  success: boolean;
}

export type NewPasswordResponse = {
  token: string;
  token_type: 'Bearer';
  user: User;
};

export type ChangePasswordResponse = {
  success: boolean;
};
