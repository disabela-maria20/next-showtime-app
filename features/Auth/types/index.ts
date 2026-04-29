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

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  favoriteGenre: string[];
  created_at: string;
};

export type AuthResponse = {
  token: string;
  token_type: 'Bearer';
  user: AuthUser;
};
